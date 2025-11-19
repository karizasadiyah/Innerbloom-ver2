import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { AnalysisResult, SessionState, Question } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnalysis = async (
  sessionData: SessionState
): Promise<AnalysisResult> => {
  
  const questionsAndAnswers = sessionData.selectedQuestions.map(q => {
    return `Question (${q.category}): ${q.text} ${q.scenario ? `[Scenario: ${q.scenario}]` : ''}
User Answer: ${sessionData.answers[q.id] || "Skipped"}`;
  }).join('\n---\n');

  const vibeSummary = sessionData.vibes.map(v => `Stage: ${v.stage}, Vibe: ${v.vibe}`).join('; ');

  const prompt = `
    You are "InnerBloom", an AI companion for inner child healing. 
    Your vibe is: Soft, chill, friendly, bestie energy. Short sentences. Safe-space energy. Light emojis (✨🧸🌱).
    
    Analyze the following user session data to generate a healing report.
    
    User Vibes: ${vibeSummary}
    
    Session Q&A:
    ${questionsAndAnswers}
    
    Create a JSON response.
    
    Requirements for output fields:
    1. summary: Short, reflective, Gen Z vibe, to the point.
    2. deepInsight: Identify inner-child patterns and emotional themes based on their answers.
    3. healingEraRoadmap: Array of 3-5 small, actionable steps.
    4. realityCheck: A gentle, soft nudge about something they might be avoiding or need to look at.
    5. interactiveLifePath: Object with strings for feelings, triggers, coping, and steps.
    6. chartData: Numbers from 0 to 4 for: sadness, anxiety, selfLove, awareness, innerChildHealing.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            deepInsight: { type: Type.STRING },
            healingEraRoadmap: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            realityCheck: { type: Type.STRING },
            interactiveLifePath: {
              type: Type.OBJECT,
              properties: {
                feelings: { type: Type.STRING },
                triggers: { type: Type.STRING },
                coping: { type: Type.STRING },
                steps: { type: Type.STRING }
              },
              required: ["feelings", "triggers", "coping", "steps"]
            },
            chartData: {
              type: Type.OBJECT,
              properties: {
                sadness: { type: Type.NUMBER },
                anxiety: { type: Type.NUMBER },
                selfLove: { type: Type.NUMBER },
                awareness: { type: Type.NUMBER },
                innerChildHealing: { type: Type.NUMBER }
              },
              required: ["sadness", "anxiety", "selfLove", "awareness", "innerChildHealing"]
            }
          },
          required: ["summary", "deepInsight", "healingEraRoadmap", "realityCheck", "interactiveLifePath", "chartData"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data in case of error to prevent app crash
    return {
      summary: "Hey bestie, looks like our connection got a little fuzzy, but I'm proud of you for showing up! ✨",
      deepInsight: "You're doing the heavy lifting just by being here.",
      healingEraRoadmap: ["Take a deep breath", "Drink some water", "Rest today"],
      realityCheck: "Sometimes technology needs a nap too.",
      interactiveLifePath: {
        feelings: "Valid",
        triggers: "Unknown",
        coping: "Breathing",
        steps: "Moving forward"
      },
      chartData: { sadness: 2, anxiety: 2, selfLove: 3, awareness: 3, innerChildHealing: 3 }
    };
  }
};