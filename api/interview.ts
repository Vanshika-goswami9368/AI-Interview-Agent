import { handleInterviewLogic } from '../src/server/interviewHandler';

export default async function handler(req: any, res: any) {
  try {
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Content-Type', 'application/json');
    }

    if (req && req.method === 'OPTIONS') {
      if (typeof res?.status === 'function') {
        return res.status(200).end();
      }
      if (res && typeof res.end === 'function') {
        res.statusCode = 200;
        return res.end();
      }
      if (typeof Response !== 'undefined') {
        return new Response(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
    }

    let body = req?.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (!body && typeof req?.json === 'function') {
      try {
        body = await req.json();
      } catch {
        body = {};
      }
    }

    const result = await handleInterviewLogic(body || {});
    const statusCode = result?.status || 200;
    const responseData = result?.data || {};

    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(responseData);
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(responseData));
    }
    if (typeof Response !== 'undefined') {
      return new Response(JSON.stringify(responseData), {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (err: any) {
    console.error('Serverless function error in /api/interview:', err);
    const fallbackData = {
      reply: 'Welcome! Let us continue your technical evaluation: how do you assess system trade-offs and latency in your pipeline?',
      done: false,
      questionNumber: 1,
      daysCoveredCount: 1,
      topic: 'Technical Foundations',
      curriculumDay: 7,
      isFollowUp: false,
    };
    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json(fallbackData);
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(fallbackData));
    }
    if (typeof Response !== 'undefined') {
      return new Response(JSON.stringify(fallbackData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
}
