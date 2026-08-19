import express from 'express';
import dotenv from 'dotenv';
import { candidatesData } from '../data/candidatesData';
import { curriculumData } from '../data/curriculumData';
import { getSession } from './sessionStore';
import { handleInterviewLogic } from './interviewHandler';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  try {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch {
    res.status(200).json({ status: 'ok' });
  }
});

// Get Candidates List endpoint
app.get('/api/candidates', (req, res) => {
  try {
    res.json(candidatesData || { candidates: [] });
  } catch {
    res.status(200).json({ candidates: [] });
  }
});

// Get Curriculum data endpoint
app.get('/api/curriculum', (req, res) => {
  try {
    res.json(curriculumData || { cohort: '', modules: [], days: [] });
  } catch {
    res.status(200).json({ cohort: '', modules: [], days: [] });
  }
});

// Get Session status endpoint
app.get('/api/session/:sessionId', (req, res) => {
  try {
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
  } catch {
    res.status(404).json({ error: 'Session not found' });
  }
});

// Primary Technical Specification Endpoint: POST /api/interview
app.post('/api/interview', async (req, res) => {
  try {
    const result = await handleInterviewLogic(req.body);
    res.status(result.status || 200).json(result.data);
  } catch (err: any) {
    console.error('Error handling /api/interview:', err);
    res.status(200).json({
      reply: 'Welcome! Let us continue your technical evaluation: how do you assess system trade-offs and latency in your pipeline?',
      done: false,
      questionNumber: 1,
      daysCoveredCount: 1,
      topic: 'Technical Foundations',
      curriculumDay: 7,
      isFollowUp: false,
    });
  }
});

export default app;
