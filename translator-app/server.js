const express = require("express");
const cors = require("cors");
const path = require("path");

const TranslatorContext = require("./context/TranslatorContext");
const LibreTranslateStrategy = require("./strategies/LibreTranslateStrategy");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const translator = new TranslatorContext(new LibreTranslateStrategy());

// ✅ ROUTE TO LOAD FRONTEND
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ TRANSLATION API
app.post("/translate", async (req, res) => {

    const { text, source, target } = req.body;

    console.log("Request:", text, source, target);

    try {
        const result = await translator.translate(text, source, target);

        console.log("Result:", result);

        res.json({ translation: result });
    } catch (error) {
        console.log(error);
        res.json({ translation: "Error in translation" });
    }
});

// ✅ START SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});