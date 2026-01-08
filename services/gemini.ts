
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function parseItineraryFromText(userInput: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `身為資深日本旅遊產品經理，請將以下用戶的行程草稿轉化為精確的結構化行程數據。
      
      用戶輸入內容：
      "${userInput}"

      規則：
      1. 如果日期不詳，請從 Day 1 開始編號。
      2. 請自動推算合理的交通時間與建議。
      3. 每個項目必須包含：startTime, endTime, location, activity, type, reason, planB。
      4. 語言請一律使用繁體中文。
      5. 必須根據地點生成合適的 weather 模擬數據。
      6. 必須根據地點選擇一張適合的 Unsplash 圖片網址作為 coverImage。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              date: { type: Type.STRING },
              locationName: { type: Type.STRING },
              coverImage: { type: Type.STRING },
              summary: { type: Type.STRING },
              weather: {
                type: Type.OBJECT,
                properties: {
                  temp: { type: Type.STRING },
                  condition: { type: Type.STRING },
                  icon: { type: Type.STRING },
                  forecast24h: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        temp: { type: Type.STRING },
                        icon: { type: Type.STRING }
                      }
                    }
                  }
                }
              },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    startTime: { type: Type.STRING },
                    endTime: { type: Type.STRING },
                    location: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    type: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    planB: { type: Type.STRING },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            },
            required: ["day", "date", "locationName", "items"]
          }
        }
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Parse Itinerary Error:", error);
    throw error;
  }
}

export async function getLocalTrivia(location: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `身為日本旅遊專家，請針對「${location}」提供一段精簡有趣的冷知識或地名由來（約 50 字）。請以繁體中文回答。`,
    });
    return response.text;
  } catch (error) {
    console.error("Trivia Error:", error);
    return null;
  }
}

export async function searchNearbyRestaurants(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `請搜尋關鍵字「${query}」來推薦日本優質餐廳。
      1. 推薦 3 家評價極高的選擇。
      2. 說明必點菜色與推薦原因。
      3. 以繁體中文回答。`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const links = groundingChunks
      .map((chunk: any) => {
        if (chunk.web) return { title: chunk.web.title, uri: chunk.web.uri };
        if (chunk.maps) return { title: chunk.maps.title, uri: chunk.maps.uri };
        return null;
      })
      .filter((link: any) => link !== null);

    return { text, links };
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
}
