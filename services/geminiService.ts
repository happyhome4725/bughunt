
import { GoogleGenAI } from "@google/genai";
import { BugType } from "../types";
import { BUG_ECOLOGY_FACTS } from "./ecologyData";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBugFact(bugType: BugType): Promise<string> {
  try {
    const ecologyFacts = BUG_ECOLOGY_FACTS[bugType] || [];
    let extraPrompt = "";
    
    if (ecologyFacts.length > 0) {
      extraPrompt = `\n특히 다음의 실제 생태 정보(나무위키/사전 팩트) 중 일부를 적극적으로 활용하거나 자연스럽게 녹여내어 어린이 눈높이에 맞춰 풀어서 설명해 줘:
- ${ecologyFacts.join('\n- ')}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `곤충 '${bugType}'에 대한 짧고 흥미로운 사실을 딱 한 문장으로 알려줘. 
      이미 알려진 뻔한 사실 말고, 매번 다른 독특한 특징이나 생태적 신비함을 알려줘야 해. 
      아이들이 '와, 몰랐던 사실이야!'라고 느낄 수 있게 친근한 말투(해요체, 존댓말 등 친근하고 따뜻한 어조)로 작성해줘.${extraPrompt}`,
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
