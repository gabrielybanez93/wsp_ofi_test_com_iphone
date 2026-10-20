//Centraliza las variables de entorno (así el resto del código no toca process.env directo):

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  whatsapp: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
    appSecret: process.env.WHATSAPP_APP_SECRET,
  },
};