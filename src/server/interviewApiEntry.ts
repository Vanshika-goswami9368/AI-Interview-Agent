import { handleInterviewLogic } from './interviewHandler';

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
      return;
    }

    let body = req?.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use raw body
      }
    }

    const result = await handleInterviewLogic(body || {});
    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(result.status || 200).json(result.data);
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = result.status || 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(result.data));
    }
    if (typeof Response !== 'undefined') {
      return new Response(JSON.stringify(result.data), {
        status: result.status || 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (err: any) {
    console.error('Error in /api/interview:', err);
    const fallbackResponse = {
      reply: 'Thank you. Let us proceed with the next technical question.',
      done: false,
      questionNumber: 1,
      daysCoveredCount: 1,
    };
    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json(fallbackResponse);
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      return res.end(JSON.stringify(fallbackResponse));
    }
    if (typeof Response !== 'undefined') {
      return new Response(JSON.stringify(fallbackResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
}
