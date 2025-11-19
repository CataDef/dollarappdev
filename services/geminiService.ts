import { GoogleGenAI } from "@google/genai";
import { ShopifyAppIdea } from "../types";

export const fetchExpensiveAppIdeas = async (): Promise<ShopifyAppIdea[]> => {
  try {
    // Initialize client lazily to prevent top-level crashes if process.env is undefined
    // or if the API key is missing during module load.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY is not defined");
    }
    
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      I need a list of 6 popular, expensive Shopify apps (apps that charge significant monthly subscriptions, ideally $50+/month) that have over 1000 reviews or are widely recognized as market leaders.
      
      Use Google Search to find current real-world examples.
      
      Return the result STRICTLY as a JSON array inside a markdown code block (\`\`\`json ... \`\`\`). 
      Do not include any other text outside the code block.
      
      The JSON object for each app must have these keys:
      - "name": string (Name of the app)
      - "estimatedPrice": string (e.g., "$99/mo" or "From $299/mo")
      - "description": string (Short description of what it does)
      - "category": string (e.g., Marketing, ERP, Returns, etc.)
      - "reasonForSuccess": string (Why is it worth the high price?)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    
    if (!text) {
        throw new Error("No content generated from Gemini.");
    }

    // Extract JSON from Markdown code block
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
    
    let jsonStr = "";
    if (jsonMatch && jsonMatch[1]) {
      jsonStr = jsonMatch[1];
    } else {
      // Fallback: try to find array start/end if code blocks are missing
      const startIndex = text.indexOf('[');
      const endIndex = text.lastIndexOf(']');
      if (startIndex !== -1 && endIndex !== -1) {
        jsonStr = text.substring(startIndex, endIndex + 1);
      } else {
        throw new Error("Could not parse JSON from response");
      }
    }

    const data: ShopifyAppIdea[] = JSON.parse(jsonStr);
    return data;

  } catch (error) {
    console.error("Error fetching app ideas or initializing Gemini:", error);
    // Return a fallback list so the UI doesn't break
    return [
      {
        name: "Order Printer Pro",
        estimatedPrice: "$10 - $40/mo",
        description: "Automatically generate and email PDF invoices, receipts, packing slips, and return forms.",
        category: "Operations & Finance",
        reasonForSuccess: "Essential utility for compliance and professional branding that native Shopify lacks."
      },
      {
        name: "Recharge Subscriptions",
        estimatedPrice: "$499/mo (Enterprise)",
        description: "The leading subscription management solution for Shopify stores.",
        category: "Subscriptions",
        reasonForSuccess: "Handles complex recurring billing logic that Shopify doesn't do natively."
      },
      {
        name: "Gorgias - Help Desk",
        estimatedPrice: "$60 - $360/mo",
        description: "Customer service helpdesk built specifically for Ecommerce.",
        category: "Customer Support",
        reasonForSuccess: "Deep integration with Shopify data allowing instant order modification."
      },
      {
        name: "Yotpo",
        estimatedPrice: "Custom Pricing (High Tier)",
        description: "Reviews, loyalty, and referrals platform.",
        category: "Marketing",
        reasonForSuccess: "Creates a complete ecosystem for social proof and retention."
      },
      {
        name: "Klaviyo",
        estimatedPrice: "$45 - $2000+/mo",
        description: "Email and SMS marketing automation heavily integrated with Shopify data.",
        category: "Marketing Automation",
        reasonForSuccess: "Proven ROI tracking and extremely granular segmentation capabilities."
      },
      {
        name: "Triple Whale",
        estimatedPrice: "$129 - $279+/mo",
        description: "All-in-one analytics and attribution dashboard for modern brands.",
        category: "Analytics",
        reasonForSuccess: "Solves the data accuracy problem caused by iOS privacy updates."
      }
    ];
  }
};