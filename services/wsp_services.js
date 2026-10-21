// ─────────────────────────────────────────────────────────────
// services/whatsapp.service.js → Comunicación con la API de Meta
// Aquí vive TODO lo relacionado a llamadas HTTP a WhatsApp.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// services/whatsapp.service.js
// Encapsula las llamadas a la API oficial de WhatsApp Cloud API.
// ─────────────────────────────────────────────────────────────
const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://graph.facebook.com/v21.0';

/**
 * Envía un mensaje de texto a un número de WhatsApp.
 * @param {string} to   - Número destino en formato internacional sin "+"
 * @param {string} text - Texto a enviar
 * @returns {Promise<Object>} Respuesta de Meta
 */
async function sendTextMessage(to, text) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    throw new Error('Faltan WHATSAPP_PHONE_NUMBER_ID o WHATSAPP_ACCESS_TOKEN en el entorno');
  }

  const url = `${BASE_URL}/${phoneNumberId}/messages`;

  // Dentro de sendTextMessage, antes de construir el payload:
let numeroDestino = to;

// Ajuste específico para Argentina en modo de prueba:
// Meta recibe "549..." pero la lista de permitidos espera "54..." (sin el 9)
if (numeroDestino.startsWith('549')) {
  numeroDestino = '54' + numeroDestino.slice(3);
}

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: numeroDestino,
    type: 'text',
    text: { body: text },
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ Mensaje enviado a', to);
    return response.data;
  } catch (error) {
    const detail = error.response?.data || error.message;
    console.error('❌ Error enviando mensaje:', JSON.stringify(detail, null, 2));
    throw error;
  }
}

/**
 * Marca un mensaje como leído (opcional, útil más adelante).
 */
async function markAsRead(messageId) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const url = `${BASE_URL}/${phoneNumberId}/messages`;

  await axios.post(
    url,
    { messaging_product: 'whatsapp', status: 'read', message_id: messageId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

module.exports = { sendTextMessage, markAsRead };