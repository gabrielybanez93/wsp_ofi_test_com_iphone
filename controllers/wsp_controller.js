// ─────────────────────────────────────────────────────────────
// controllers/webhook.controller.js → Lógica del webhook
// Recibe lo que Meta envía y decide qué hacer.
// NO hace llamadas HTTP directas a Meta: eso es del service.
// ─────────────────────────────────────────────────────────────

//const { sendTextMessage } = require('../services/wsp_services');

// ── GET /webhook → Verificación con Meta ──
// Meta envía 3 query params: hub.mode, hub.verify_token, hub.challenge
// Si el token coincide, devolvemos el challenge.
function verifyWebhook(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('✅ Webhook verificado por Meta');
    return res.status(200).send(challenge); // ⚠️ Obligatorio devolver el challenge
  }

  console.warn('❌ Intento de verificación fallido');
  return res.sendStatus(403);
}

// ── POST /webhook → Recepción de mensajes ──
async function receiveMessage(req, res) {
  // ⚠️ Responder 200 rápido para que Meta no reintente
  res.sendStatus(200);

  try {
    const body = req.body

    // Estructura que envía Meta: entry[0].changes[0].value.messages[0]
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    // Si no hay mensaje, es un status (delivered, read, etc.). Salimos.
    if (!message) {
      console.log('ℹ️  Evento sin mensaje (status, etc.)');
      return;
    }

    const from = message.from;                 // Número del cliente
    const text = message.text?.body || '';     // Texto recibido

    console.log(`📩 Mensaje recibido de ${from}: "${text}"`);

    // 🎯 Hito 2: le respondemos al cliente
    //await sendTextMessage(from, 'Hola, este mensaje fue enviado desde mi aplicación Node.js 🚀');

  } catch (error) {
    console.error('❌ Error procesando webhook:', error.message);
  }
}

module.exports = { verifyWebhook, receiveMessage };