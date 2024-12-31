import { spawn } from 'child_process';

export async function POST(req) {
  try {
    const body = await req.json();
    const { position } = body;

    return new Promise((resolve, reject) => {
      const python = spawn('python', ['./salary-predictor.py', position]);

      let result = '';
      python.stdout.on('data', (data) => {
        result += data.toString();
      });

      python.stderr.on('data', (data) => {
        reject(new Response(data.toString(), { status: 500 }));
      });

      python.on('close', () => {
        resolve(new Response(result.trim(), { status: 200 }));
      });
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
