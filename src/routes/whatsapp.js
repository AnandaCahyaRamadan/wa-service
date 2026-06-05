const express = require("express");

const router = express.Router();

const { getSocket } = require("../services/whatsappService");

router.post("/send-message", async (req, res) => {

    try {

        const { phone, message } = req.body;

        const sock = getSocket();

        await sock.sendMessage(
            `${phone}@s.whatsapp.net`,
            {
                text: message
            }
        );

        return res.json({
            success: true
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

module.exports = router;