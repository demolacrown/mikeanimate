const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const apiKey = process.env.OPENAI_API_KEY;
const defaultModel = process.env.MODEL || 'gpt-4o-mini';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const demoAnswers = {
  moremi: {
    answer:
      'Queen Moremi Ajasoro is remembered in Yoruba tradition for her courage, strategic leadership, and willingness to sacrifice for the defense of Ile-Ife. Her story is often told as evidence of how women shaped political and military life in premodern African societies. Historians often treat such stories as important cultural memory, while also distinguishing them from more fully documented evidence when available.',
    related: ['Yoruba oral tradition', 'Ile-Ife', 'Women in African political history'],
  },
  mansa: {
    answer:
      'Mansa Musa of Mali became famous for the power and wealth of the Mali Empire, his pilgrimage to Mecca, and the diplomatic and economic influence he projected across the Islamic world. His reign is a central example of West African kingship, trade, and scholarship. Modern historians often combine written records, accounts of pilgrimage, and archaeological evidence to understand his reign.',
    related: ['Mali Empire', 'Trans-Saharan trade', 'Islamic scholarship in West Africa'],
  },
  shaka: {
    answer:
      'Shaka Zulu is remembered for reshaping military tactics and political power in southeastern Africa. His leadership transformed the Zulu kingdom and left a major legacy in regional history. Like many famous rulers, his story is both historically significant and remembered through narratives that can emphasize heroism, conflict, and mythmaking.',
    related: ['Zulu Kingdom', 'Military reform in southern Africa', 'Anglo-Zulu War'],
  },
  oral: {
    answer:
      'Oral tradition and written history are different but complementary forms of knowledge. Oral tradition preserves memory, community identity, and sometimes earlier events that written texts may not record. Written records can offer detail and chronology, but they may also reflect bias, political agendas, or limited access. The strongest historical understanding often combines both.',
    related: ['Historical methodology', 'African oral traditions', 'Archival research'],
  },
  amina: {
    answer:
      'Queen Amina of Zazzau is widely remembered in Hausa tradition as a powerful military leader whose campaigns expanded her kingdom. Whether or not every detail of her life is fully documented, her legacy reflects the importance of military leadership, political ambition, and oral tradition in shaping public memory.',
    related: ['Hausa history', 'Zazzau', 'Women rulers in African history'],
  },
  default: {
    answer:
      'MIKEANIMATE is designed to explore African history through scholarly inquiry, oral tradition, cultural memory, and cinematic storytelling. The best historical answers combine careful evidence, context, and humility about what remains uncertain or contested. If you want, ask about a specific ruler, kingdom, event, or historical question and I can narrow the response.',
    related: ['Historical sources', 'African kingdoms', 'Oral tradition and evidence'],
  },
};

function normalizeMessage(message) {
  return String(message || '').toLowerCase().trim();
}

function buildDemoAnswer(message) {
  const lower = normalizeMessage(message);

  if (lower.includes('moremi') || lower.includes('queen moremi')) return demoAnswers.moremi;
  if (lower.includes('mansa musa') || lower.includes('mansa') || lower.includes('mali empire')) return demoAnswers.mansa;
  if (lower.includes('shaka') || lower.includes('zulu')) return demoAnswers.shaka;
  if (lower.includes('oral') && lower.includes('tradition')) return demoAnswers.oral;
  if (lower.includes('amina') || lower.includes('queen amina')) return demoAnswers.amina;
  if (lower.includes('queen') || lower.includes('king') || lower.includes('kingdom') || lower.includes('empire')) {
    return {
      answer:
        'African political history is rich with powerful rulers and political systems that were shaped by trade, warfare, diplomacy, and cultural identity. A strong answer depends on distinguishing between widely accepted historical evidence and traditions that may be remembered differently across communities.',
      related: ['African kingdoms', 'Political leadership', 'Trade and empire'],
    };
  }

  return demoAnswers.default;
}

function buildSystemPrompt() {
  return [
    'You are Mike History AI, a careful and respectful assistant focused on African history.',
    'Distinguish clearly between documented historical evidence, oral tradition, legends, contested claims, and uncertainty.',
    'When a question is ambiguous, say what is known, what is debated, and what remains uncertain.',
    'Use respectful language and avoid overgeneralizing the histories of African societies.',
    'Prefer accuracy, context, and nuance over certainty when evidence is limited.',
  ].join(' ');
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mode: apiKey ? 'live' : 'demo', model: defaultModel });
});

app.post('/api/ai', async (req, res) => {
  const message = String(req.body?.message || '').trim();
  const context = String(req.body?.context || '').trim();

  if (!message) {
    return res.status(400).json({ error: 'Please enter a question about African history.' });
  }

  if (!apiKey) {
    const demo = buildDemoAnswer(message);
    return res.json({
      demo: true,
      mode: 'demo',
      answer: demo.answer,
      summary: 'Demo mode is active because no OpenAI API key is configured.',
      related: demo.related,
      sourceNote: 'This response uses a curated historical demo layer rather than a live model response.',
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
        model: defaultModel,
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(),
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
      return res.status(400).json({
        error: 'The AI service could not answer the prompt.',
        details: errorText,
      });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'No answer returned.';

    return res.json({
      demo: false,
      mode: 'live',
      answer,
      summary: 'Live AI response generated via configured API settings.',
      related: ['Queen Moremi Ajasoro', 'Mansa Musa', 'Queen Amina of Zazzau'],
      sourceNote: 'Live responses are generated with the configured OpenAI-compatible model.',
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
