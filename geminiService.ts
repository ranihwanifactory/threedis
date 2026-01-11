
import { GoogleGenAI } from "@google/genai";
import { ZodiacSign, SamjaeType } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSamjaeAdvice = async (zodiac: ZodiacSign, type: SamjaeType, birthYear: number) => {
  const prompt = `
    당신은 친절하고 지혜로운 한국의 운세 상담가입니다. 
    사용자는 ${birthYear}년생 ${zodiac}띠이며, 올해는 '${type}' 기간에 해당합니다.
    
    삼재라고 해서 무조건 나쁜 일이 생기는 것이 아니라, '조심하고 스스로를 돌아보는 시기'라는 긍정적인 메시지를 전달해주세요.
    다음 내용을 포함해 3-4문장 내외로 따뜻하게 답해주세요:
    1. ${type}의 의미 (들삼재: 시작, 눌삼재: 머무름, 날삼재: 나감)에 따른 조언.
    2. 조심하면 좋을 부분 (건강, 인간관계 등).
    3. 사용자를 응원하는 따뜻한 마무리.
    
    한국어로 작성하고, 아주 친절하고 포근한 말투(~해요, ~랍니다)를 사용하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "운세를 불러오는 중 잠시 오류가 발생했어요. 마음을 편안히 가지고 다시 시도해 주세요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "별들이 잠시 자리를 비웠나 봐요. 하지만 당신의 하루는 분명 반짝일 거예요!";
  }
};
