import express from 'express';
import cors from 'cors';
import { PrismaClient, ResponseChoice, Importance } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/questionnaire', async (_req, res) => {
  try {
    const [parties, statements, positions] = await Promise.all([
      prisma.party.findMany({ orderBy: { abbreviation: 'asc' } }),
      prisma.statement.findMany({ orderBy: { order_index: 'asc' } }),
      prisma.partyPosition.findMany(),
    ]);

    res.json({ parties, statements, positions });
  } catch (error) {
    console.error('Failed to load questionnaire:', error);
    res.status(500).json({ error: 'Failed to load questionnaire' });
  }
});

app.get('/responses/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const responses = await prisma.userResponse.findMany({
      where: { session_id: sessionId },
    });

    res.json({ responses });
  } catch (error) {
    console.error('Failed to load responses:', error);
    res.status(500).json({ error: 'Failed to load responses' });
  }
});

app.delete('/responses/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    await prisma.userResponse.deleteMany({ where: { session_id: sessionId } });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete responses:', error);
    res.status(500).json({ error: 'Failed to delete responses' });
  }
});

app.post('/responses', async (req, res) => {
  const { sessionId, statementId, response, importance } = req.body;

  if (!sessionId || !statementId || !response || !importance) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!Object.values(ResponseChoice).includes(response)) {
    return res.status(400).json({ error: 'Invalid response value' });
  }

  if (!Object.values(Importance).includes(importance)) {
    return res.status(400).json({ error: 'Invalid importance value' });
  }

  try {
    const saved = await prisma.userResponse.upsert({
      where: {
        session_id_statement_id: {
          session_id: sessionId,
          statement_id: statementId,
        },
      },
      update: {
        response,
        importance,
      },
      create: {
        session_id: sessionId,
        statement_id: statementId,
        response,
        importance,
      },
    });

    res.status(201).json({ response: saved });
  } catch (error) {
    console.error('Failed to save response:', error);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
