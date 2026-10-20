// ─────────────────────────────────────────────────────────────
// services/whatsapp.service.js → Comunicación con la API de Meta
// Aquí vive TODO lo relacionado a llamadas HTTP a WhatsApp.
// ─────────────────────────────────────────────────────────────

const axios = require('axios');

// ── Enviar mensaje de texto simple ──
async function sendTextMessage(to, text) {
  // Endpoint oficial de Meta
  const url = `${process.env.WA_API_BASE_URL}/${process.env.WA_PHONE_NUMBER_ID}/messages`;

  // Payload con el formato EXACTO que espera Meta
  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { body: text }
  };

  try {
    const { data } = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Mensaje enviado a ${to}:`, data.messages?.[0]?.id);
    return data;

  } catch (error) {
    const metaError = error.response?.data?.error;
    console.error('❌ Error al enviar mensaje:');
    console.error('   Código:', metaError?.code);
    console.error('   Mensaje:', metaError?.message);
    throw error;
  }
}

module.exports = { sendTextMessage };