import { handleInterviewLogic } from '../src/server/interviewHandler';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    const result = await handleInterviewLogic(body || {});
    res.status(result.status || 200).json(result.data);
  } catch (err: any) {
    console.error('Serverless function error in /api/interview:', err);
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
}
