import express from 'express';
import dotenv from 'dotenv';
import { candidatesData } from '../data/candidatesData';
import { curriculumData } from '../data/curriculumData';
import { getSession } from './sessionStore';
import { handleInterviewLogic } from './interviewHandler';

dotenv.config();

const app = express();

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
  const result = await handleInterviewLogic(req.body);
  res.status(result.status || 200).json(result.data);
});

export default app;
