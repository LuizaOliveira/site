import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;
const EXTRA_CORS_ORIGINS = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://192.168.10.192:3000'
];

const ALLOWED_ORIGINS = [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...EXTRA_CORS_ORIGINS])];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    const isAllowed =
      ALLOWED_ORIGINS.includes(origin) ||
      /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:3000$/.test(origin) ||
      /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:3000$/.test(origin);

    if (isAllowed) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin nao permitido pelo CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Rotas da API
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function main() {
  // Teste de conexão com o banco
  await prisma.$connect();
  console.log('Conectado ao banco de dados MySQL!');

  app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   await prisma.$disconnect();
//   process.exit(0);
// });

// process.on('SIGTERM', async () => {
//   await prisma.$disconnect();
//   process.exit(0);
// });
