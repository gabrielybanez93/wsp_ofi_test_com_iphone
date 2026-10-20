// ─────────────────────────────────────────────────────────────
// routes/webhook.routes.js → Define los endpoints del webhook
// Solo mapea URL + método HTTP a una función del controller.
// ─────────────────────────────────────────────────────────────

const express = require('express');

const { receiveMessage, verifyWebhook } = require('../controllers/wsp_controller');
const router= express.Router();


// GET /webhook → Meta lo llama UNA VEZ para verificar que sos vos
router.get('/', verifyWebhook);

// POST /webhook → Meta lo llama CADA VEZ que llega un mensaje
router.post('/', receiveMessage);

module.exports=router;
