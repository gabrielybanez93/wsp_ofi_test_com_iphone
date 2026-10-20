// ─────────────────────────────────────────────────────────────
// index.js → Punto de entrada del servidor
// Solo configura Express y monta las rutas. Nada de lógica aquí.
// ─────────────────────────────────────────────────────────────

// Carga las variables del archivo .env en process.env
const express = require('express');
require('dotenv').config()
const cors = require("cors");
const wsp_config = require('./config/wsp_config');
//const { dbConeccion } = require('./dataBase/db_config');
const app = express();
//import webhookRoutes from '/routes/webhook.routes..js'; // ⚠️ .js obligatorio en ESM



// ── Middlewares globales ──
app.use(cors());              // Permite peticiones desde otros dominios
app.use(express.json());      // Parsea el body JSON que envía Meta
//directorio publico
app.use(express.static('public'));
// ── Rutas ──
// Todo lo relacionado a WhatsApp vive bajo /webhook

// ── Ruta raíz (útil para verificar que el server está vivo) ──
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'ComunidadiPhone WhatsApp API' });
});
// ── Arranque ──

app.listen(process.env.PORT, () => {
    console.log(`server corriendo en ${process.env.PORT}`)
})

//ruta para el serrvicio de wsp
app.use("/webhook", require('./rutes/wsp'));


