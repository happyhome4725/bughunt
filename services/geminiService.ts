
import { GoogleGenAI } from "@google/genai";
import { BugType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBugFact(bugType: BugType): Promise<string> {
  try {
    let extraContext = "";
    if (bugType === BugType.GRASSHOPPER) {
      extraContext = "특히 메뚜기 종류 중에는 배가 아니라 앞다리 무릎 근처에 귀가 있는 친구들이 있다는 점을 참고해.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `곤충 '${bugType}'에 대한 짧고 흥미로운 사실을 딱 한 문장으로 알려줘. 
      이미 알려진 뻔한 사실 말고, 매번 다른 독특한 특징이나 생태적 신비함을 알려줘야 해. 
      아이들이 '와, 몰랐던 사실이야!'라고 느낄 수 있게 친근한 말투로 작성해줘.`,
      config: {
        temperature: 0.9, // 다양성을 위해 온도를 높임
      }
    });
    
    return response.text?.trim() || "숲속의 신비로운 친구예요!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "관찰할수록 더 궁금해지는 곤충이에요!";
  }
}
