const express = require("express");
const multer = require("multer");

const router = express.Router();

const { getSocket } = require("../services/whatsappService");

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/send-message",
    upload.single("image"),
    async (req, res) => {

        try {

            const sock = getSocket();

            if (!sock?.user) {
                return res.status(400).json({
                    success: false,
                    error: "WhatsApp belum connected"
                });
            }

            const phone = req.body.phone;
            const message = req.body.message;

            const jid = `${phone}@s.whatsapp.net`;

            // upload file
            if (req.file) {

                await sock.sendMessage(
                    jid,
                    {
                        image: {
                            url: req.file.path
                        },
                        caption: message || ""
                    }
                );

            }
            // url gambar
            else if (req.body.image) {

                await sock.sendMessage(
                    jid,
                    {
                        image: {
                            url: req.body.image
                        },
                        caption: message || ""
                    }
                );

            }
            // text biasa
            else {

                await sock.sendMessage(
                    jid,
                    {
                        text: message
                    }
                );

            }

            return res.json({
                success: true
            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }
);

module.exports = router;