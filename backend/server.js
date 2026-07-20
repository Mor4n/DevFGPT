import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await client.chat.send({
            chatRequest: {
                model: "openai/gpt-oss-20b:free",
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
            },
        });

        res.json({
            response: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al llamar OpenRouter",
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});
