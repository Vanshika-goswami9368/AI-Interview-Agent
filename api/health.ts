export default function handler(req: any, res: any) {
  try {
    if (res && typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
    }
    const data = { status: 'ok', timestamp: new Date().toISOString() };
    if (res && typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json(data);
    }
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      return res.end(JSON.stringify(data));
    }
    if (typeof Response !== 'undefined') {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  } catch (err: any) {
    if (res && typeof res.end === 'function') {
      res.statusCode = 200;
      return res.end(JSON.stringify({ status: 'ok' }));
    }
  }
}
