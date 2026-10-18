const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const apiKey = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const demoAnswers = {
  queen: 'Queen Moremi Ajasoro is remembered in Yoruba tradition for courage, sacrifice, and leadership in the defense of Ile-Ife. Her story is a powerful example of how oral tradition preserves memory when written records are incomplete.',
  default: 'MIKEANIMATE is designed to explore African history through verified scholarship, oral traditions, and cinematic storytelling. For the most accurate answers, compare the account with sources, museum collections, and scholarly articles.',
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mode: apiKey ? 'live' : 'demo' });
});

app.post('/api/ai', async (req, res) => {
  const message = String(req.body?.message || '').trim();
  const context = String(req.body?.context || '').trim();

  if (!message) {
    return res.status(400).json({ error: 'Please enter a question about African history.' });
  }

  if (!apiKey) {
    const lower = message.toLowerCase();
    let answer = demoAnswers.default;

    if (lower.includes('moremi') || lower.includes('queen moremi')) {
      answer = demoAnswers.queen;
    } else if (lower.includes('mansa') || lower.includes('mansa musa')) {
      answer = 'Mansa Musa of Mali is famous for his immense wealth, pilgrimage to Mecca, and the cultural and economic power of the Mali Empire. His reign remains one of the most iconic in West African history.';
    } else if (lower.includes('shaka') || lower.includes('zulu')) {
      answer = 'Shaka Zulu transformed the Zulu kingdom through military reform and political strategy, leaving a lasting legacy in southern African history. His story is often discussed alongside the complex realities of state-building and warfare.';
    } else if (lower.includes('difference') && lower.includes('oral')) {
      answer = 'Oral traditions preserve community memory and identity, while documented history relies on written records, archaeology, and scholarly interpretation. Both are valuable, but they can differ in emphasis, detail, and chronology.';
    }

    return res.json({
      demo: true,
      answer,
      summary: 'Demo mode is active because no OpenAI API key is configured.',
      related: ['Queen Moremi Ajasoro', 'Mansa Musa', 'Shaka Zulu'],
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are Mike History AI, a careful assistant for African history. Distinguish between documented facts, oral tradition, legends, disputed claims, and unknown information. Do not invent citations. Be clear when details are uncertain. Use concise but informative responses.',
          },
          {
            role: 'user',
            content: `${context ? `Context: ${context}\n` : ''}Question: ${message}`,
          },
        ],
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(400).json({ error: 'The AI service could not answer the prompt.', details: errorText });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'No answer returned.';

    return res.json({
      demo: false,
      answer,
      summary: 'Live AI response generated via configured API settings.',
      related: ['Queen Moremi Ajasoro', 'Mansa Musa', 'Queen Amina of Zazzau'],
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Unexpected AI service error.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.listen(port, () => {
  console.log(`MIKEANIMATE server listening on http://localhost:${port}`);
});
