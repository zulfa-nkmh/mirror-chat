import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message, userId, profile } = await req.json();

    console.log("[DEBUG BACKEND] userId:", userId);
    console.log("[DEBUG BACKEND] profile:", profile);
    console.log("[DEBUG BACKEND] message:", message);

    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `User ID: ${userId}` },
            { text: `Profile: ${JSON.stringify(profile)}` },
            { text: `Pesan: ${message}` },
          ],
        },
      ],
      
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("[ERROR BACKEND]", error);
    return NextResponse.json(
      { reply: "⚠️ Terjadi kesalahan di server." },
      { status: 500 }
    );
  }
}
