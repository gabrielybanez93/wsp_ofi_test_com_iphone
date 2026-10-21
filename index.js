// ─────────────────────────────────────────────────────────────
// index.js → Punto de entrada del servidor
// Solo configura Express y monta las rutas. Nada de lógica aquí.
// ─────────────────────────────────────────────────────────────

//la URL: https://wsp-ofi-test-com-iphone.onrender.com

// ─────────────────────────────────────────────────────────────
// index.js → Punto de entrada del servidor
// ─────────────────────────────────────────────────────────────
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

// ── Middlewares globales ──
app.use(cors());
app.use(express.json());       // ⚠️ CRÍTICO: parsea el body JSON de Meta
app.use(express.static('public'));

// ── Rutas ──
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'ComunidadiPhone WhatsApp API' });
});

// Rutas de WhatsApp — ANTES de listen
app.use('/webhook', require('./rutes/wsp'));

// ── Arranque — SIEMPRE al final ──
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en puerto ${PORT}`);
});


