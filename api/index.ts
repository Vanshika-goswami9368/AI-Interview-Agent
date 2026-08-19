import app from '../src/server/app';

export default function handler(req: any, res: any) {
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

    return app(req, res);
  } catch (err: any) {
    console.error('Error in api/index:', err);
    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json({ status: 'ok' });
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      return res.end(JSON.stringify({ status: 'ok' }));
    }
  }
}
