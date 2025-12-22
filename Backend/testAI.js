import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAI() {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello! Can you hear me?" }],
    });
    console.log("✅ AI Reply:", res.choices[0].message.content);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

testAI();
