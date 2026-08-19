import candidatesHandler from './candidates';
import curriculumHandler from './curriculum';
import interviewHandler from './interview';
import healthHandler from './health';

export default async function handler(req: any, res: any) {
  try {
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

    const url = req?.url || '';
    if (url.includes('/candidates')) {
      return candidatesHandler(req, res);
    }
    if (url.includes('/curriculum')) {
      return curriculumHandler(req, res);
    }
    if (url.includes('/interview')) {
      return interviewHandler(req, res);
    }
    if (url.includes('/health')) {
      return healthHandler(req, res);
    }

    // Default to health status
    return healthHandler(req, res);
  } catch (err: any) {
    console.error('Error in /api/index:', err);
    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json({ status: 'ok' });
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      return res.end(JSON.stringify({ status: 'ok' }));
    }
  }
}
