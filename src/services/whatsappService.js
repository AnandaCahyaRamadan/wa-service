const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const qrcode = require("qrcode-terminal");

let sock = null;

async function startWhatsApp() {

    const { state, saveCreds } =
        await useMultiFileAuthState("./sessions");

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, qr }) => {

        if (qr) {
            qrcode.generate(qr, {
                small: true
            });
        }

        if (connection === "open") {
            console.log("✅ WhatsApp Connected");
        }

        if (connection === "close") {
            console.log("❌ WhatsApp Disconnected");

            startWhatsApp();
        }
    });

    return sock;
}

function getSocket() {
    return sock;
}

module.exports = {
    startWhatsApp,
    getSocket
};