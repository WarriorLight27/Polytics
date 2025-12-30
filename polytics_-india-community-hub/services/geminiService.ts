
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

export const analyzeProblems = async (problems: string[], areaName: string): Promise<AnalysisResult[] | null> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    // Return mock data if API key is not available
    return [
        { issue: "Poor Road Conditions", summary: "Multiple reports of potholes and damaged roads are causing inconvenience to commuters.", count: 3 },
        { issue: "Waste Management", summary: "Residents are concerned about irregular garbage collection schedules.", count: 2 },
        { issue: "Streetlight Outages", summary: "Lack of functional streetlights in several areas is raising safety concerns at night.", count: 1 }
    ];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are an expert urban planning analyst for the city of ${areaName}, India. Your task is to analyze a list of public complaints and identify the top 3-5 most pressing issues.
  For each distinct issue, provide a concise title, a one-sentence summary, and the total count of related complaints.
  Your entire response must be a valid JSON array of objects, strictly following the provided schema.

  List of complaints:
  ${JSON.stringify(problems)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              issue: {
                type: Type.STRING,
                description: "A short, descriptive title for the problem category (e.g., 'Poor Road Conditions')."
              },
              summary: {
                type: Type.STRING,
                description: "A one-sentence summary of the collective complaints in this category."
              },
              count: {
                type: Type.INTEGER,
                description: "The total number of complaints that fall into this category."
              }
            },
            required: ["issue", "summary", "count"]
          }
        }
      }
    });

    const jsonString = response.text;
    const result: AnalysisResult[] = JSON.parse(jsonString);
    return result;
  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    return null;
  }
};
