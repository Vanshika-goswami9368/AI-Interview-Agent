import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { getOrCreateSession, getSession } from './src/server/sessionStore';
import {
  processInterviewStep,
  generateFinalFeedback,
  processLocalInterviewStep,
  analyzeCandidateAnswersLocal,
} from './src/server/aiService';

dotenv.config();

// Read JSON data files cleanly without Node import assertion errors
const candidatesDataPath = path.join(process.cwd(), 'src/data/candidates.json');
const curriculumDataPath = path.join(process.cwd(), 'src/data/curriculum.json');

const candidatesData = JSON.parse(fs.readFileSync(candidatesDataPath, 'utf-8'));
const curriculumData = JSON.parse(fs.readFileSync(curriculumDataPath, 'utf-8'));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get Candidates List endpoint
  app.get('/api/candidates', (req, res) => {
    res.json(candidatesData);
  });

  // Get Curriculum data endpoint
  app.get('/api/curriculum', (req, res) => {
    res.json(curriculumData);
  });

  // Get Session status endpoint
  app.get('/api/session/:sessionId', (req, res) => {
    const session = getSession(req.params.sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }
    res.json({
      sessionId: session.sessionId,
      candidateName: session.candidate?.member?.name || 'Candidate',
      questionsAsked: session.questionsAsked,
      daysCovered: session.daysCovered,
      topicsCovered: session.topicsCovered,
      done: session.done,
      feedback: session.feedback,
      historyCount: session.conversationHistory.length,
    });
  });

  // Primary Technical Specification Endpoint: POST /api/interview
  app.post('/api/interview', async (req, res) => {
    try {
      const { sessionId, candidate, message, chatHistory, forceEvaluate } = req.body;

      if (!sessionId) {
        res.status(400).json({ error: 'sessionId parameter is required' });
        return;
      }

      // Get or create the interview session
      let session;
      try {
        session = getOrCreateSession(sessionId, candidate);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
        return;
      }

      // If client supplied chatHistory, sync it into session.conversationHistory
      if (Array.isArray(chatHistory) && chatHistory.length > 0) {
        const validMsgs = chatHistory.filter((m: any) => m.sender !== 'system' && m.text);
        session.conversationHistory = validMsgs.map((m: any) => ({
          role: m.sender === 'ai' ? 'interviewer' : 'candidate',
          text: m.text,
          dayCovered: m.curriculumDay,
          topic: m.topic,
        }));

        // Recalculate covered days and topics if needed
        validMsgs.forEach((m: any) => {
          if (m.curriculumDay && !session.daysCovered.includes(m.curriculumDay)) {
            session.daysCovered.push(m.curriculumDay);
          }
          if (m.topic && !session.topicsCovered.includes(m.topic)) {
            session.topicsCovered.push(m.topic);
          }
        });
      }

      // If forceEvaluate is true or message explicitly requests to conclude interview:
      const msgTrim = typeof message === 'string' ? message.trim().toLowerCase() : '';
      const isConcludeRequest =
        forceEvaluate ||
        msgTrim === 'conclude interview' ||
        msgTrim === 'generate report' ||
        msgTrim === 'finish interview';

      if (isConcludeRequest) {
        const feedback = await generateFinalFeedback(session);
        session.done = true;
        session.feedback = feedback;
        res.json({
          reply: `Thank you, ${session.candidate?.member?.name || 'Candidate'}. That concludes our technical interview evaluation.`,
          done: true,
          feedback: session.feedback,
          questionNumber: session.questionsAsked,
          daysCoveredCount: session.daysCovered.length,
        });
        return;
      }

      // If session is already completed, return existing feedback
      if (session.done && session.feedback) {
        res.json({
          reply: 'Interview completed.',
          done: true,
          feedback: session.feedback,
          questionNumber: session.questionsAsked,
          daysCoveredCount: session.daysCovered.length,
        });
        return;
      }

      // Process step with AI service
      const result = await processInterviewStep(session, message);

      res.json({
        reply: result.reply,
        done: result.done,
        feedback: result.feedback,
        questionNumber: result.questionNumber ?? session.questionsAsked,
        daysCoveredCount: result.daysCoveredCount ?? session.daysCovered.length,
        topic: result.topic,
        curriculumDay: result.curriculumDay,
        isFollowUp: result.isFollowUp,
        isClarificationRequest: result.isClarificationRequest,
        isOffTopic: result.isOffTopic,
        currentDifficulty: result.currentDifficulty ?? session.currentDifficulty,
      });
    } catch {
      try {
        const { sessionId, candidate, message, forceEvaluate } = req.body;
        const session = getOrCreateSession(sessionId, candidate);
        if (forceEvaluate) {
          const feedback = analyzeCandidateAnswersLocal(session.candidate, session.conversationHistory);
          session.done = true;
          session.feedback = feedback;
          res.json({
            reply: `Thank you, ${session.candidate?.member?.name || 'Candidate'}. That concludes our technical interview evaluation.`,
            done: true,
            feedback,
            questionNumber: session.questionsAsked,
            daysCoveredCount: session.daysCovered.length,
          });
          return;
        }

        const result = processLocalInterviewStep(session, message);
        res.json({
          reply: result.reply,
          done: result.done,
          feedback: result.feedback,
          questionNumber: result.questionNumber ?? session.questionsAsked,
          daysCoveredCount: result.daysCoveredCount ?? session.daysCovered.length,
          topic: result.topic,
          curriculumDay: result.curriculumDay,
          isFollowUp: result.isFollowUp,
          isClarificationRequest: result.isClarificationRequest,
          isOffTopic: result.isOffTopic,
          currentDifficulty: result.currentDifficulty ?? session.currentDifficulty,
        });
        return;
      } catch (fallbackErr: any) {
        console.error('Fallback execution error:', fallbackErr);
        res.status(500).json({
          error: 'An internal error occurred during interview processing.',
        });
      }
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Interview Agent Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
