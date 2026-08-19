import { curriculumData } from '../src/data/curriculumData';

export default function handler(req: any, res: any) {
  try {
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
    }

    const payload = curriculumData || { cohort: '', modules: [], days: [] };

    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json(payload);
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(payload));
    }
    if (typeof Response !== 'undefined') {
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (err: any) {
    console.error('Error in /api/curriculum:', err);
    const fallback = curriculumData || { cohort: '', modules: [], days: [] };
    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json(fallback);
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      return res.end(JSON.stringify(fallback));
    }
    if (typeof Response !== 'undefined') {
      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  }
}
