require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    startWhatsApp
} = require("./services/whatsappService");

const whatsappRoutes =
    require("./routes/whatsapp");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", whatsappRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {

    console.log(`Server running on ${PORT}`);

    await startWhatsApp();

});