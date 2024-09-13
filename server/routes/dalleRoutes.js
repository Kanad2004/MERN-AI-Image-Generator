import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";
const openai = new OpenAI();

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from DALL-E");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({
      photo: image,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

export default router;
