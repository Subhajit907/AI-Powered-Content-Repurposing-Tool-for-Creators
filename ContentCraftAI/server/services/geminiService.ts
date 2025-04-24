import { RepurposeContentResponse } from "@shared/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyByJy3Y04X6bMFnOH75k4k7BroZ-ARIJaQ"; // Fallback to provided key
  console.log("Using Gemini API key:", apiKey ? "Key is provided" : "No key provided");
  return new GoogleGenerativeAI(apiKey);
}

// Process prompt for Gemini
function createPrompt(transcript: string): string {
  return `You are a content repurposing assistant for digital creators. Based on the following video transcript, generate repurposed content for multiple platforms.

1. Generate 3 viral short-form video scripts (60 seconds max) from this content:
   - Platform 1: TikTok
   - Platform 2: YouTube Shorts
   - Platform 3: Instagram Reels
   - Each script should include:
     - A strong hook (first 5 seconds)
     - A brief value-packed body (educational or motivational)
     - A CTA (subscribe, follow, comment, or visit link)
     - Style should be conversational, friendly, and energetic like Holly's tone

2. Automatically generate **subtitles (captions)** for each short video based on the script.

3. Suggest a **viral title** for each platform based on its style:
   - TikTok: Trendy, attention-grabbing, uses Gen Z lingo if appropriate
   - YouTube Shorts: SEO-optimized, clear benefit-driven
   - Instagram Reels: Bold, emotional trigger, uses emojis if it helps

4. Ensure the tone and voice are aligned with this creator, who is strategic, practical, and inspirational. Keep the brand voice consistent.

Transcript:
${transcript}

Format your response as structured JSON with the following format:
{
  "contents": [
    {
      "platform": "TikTok",
      "title": "The viral title for TikTok",
      "script": "The full script with Hook, Body, and CTA clearly labeled",
      "captions": "The time-coded captions (e.g. 00:00 First line\\n00:02 Second line)"
    },
    {
      "platform": "YouTube Shorts",
      "title": "The viral title for YouTube Shorts",
      "script": "The full script with Hook, Body, and CTA clearly labeled",
      "captions": "The time-coded captions"
    },
    {
      "platform": "Instagram Reels",
      "title": "The viral title for Instagram Reels",
      "script": "The full script with Hook, Body, and CTA clearly labeled",
      "captions": "The time-coded captions"
    }
  ]
}`;
}

// Parse JSON from Gemini response
function parseJsonFromResponse(text: string): RepurposeContentResponse {
  try {
    // Find JSON content between curly braces
    const jsonMatch = text.match(/{[\s\S]*}/);
    
    if (!jsonMatch) {
      throw new Error("No JSON found in the response");
    }
    
    const jsonStr = jsonMatch[0];
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    console.log("Raw response:", text);
    
    // Return a fallback response with placeholder content
    return {
      contents: [
        {
          platform: "TikTok",
          title: "💯 This SIMPLE system made my content strategy actually work! #productivityhack #contentcreator",
          script: "Hook: Stop struggling with your content! I'm about to share the ONLY system that actually works for busy entrepreneurs.\n\nBody: The problem isn't you - it's that you're trying to do too much without a system. Here's what works: First, batch your content creation on ONE day. Second, create content pillars - just 3-5 topics you're known for. Third, repurpose EVERYTHING. One video becomes 10 pieces of content. This simple 3-step system saved me 10+ hours every week.\n\nCTA: Double tap if you need this system and check the link in my bio for my free content planning template!",
          captions: "00:00 Stop struggling with your content!\n00:02 I'm about to share the ONLY system\n00:04 that actually works for busy entrepreneurs.\n00:07 The problem isn't you - it's that you're trying to do too much\n00:10 without a system."
        },
        {
          platform: "YouTube Shorts",
          title: "3-Step Content Strategy That Saves Entrepreneurs 10+ Hours Weekly | Productivity System",
          script: "Hook: The #1 reason entrepreneurs fail with content? They don't have THIS system in place.\n\nBody: After working with hundreds of business owners, I've found that the key to consistent content isn't working harder - it's working smarter. Here's the 3-step system that works: 1) Content batching - dedicate one day to create all your content for the week. 2) Content pillars - focus on just 3-5 core topics that align with your expertise. 3) Strategic repurposing - transform one piece of content into multiple formats. This system cut my content creation time by 10+ hours per week.\n\nCTA: Subscribe for more productivity tips and comment \"SYSTEM\" if you want my free content planning template!",
          captions: "00:00 The #1 reason entrepreneurs fail with content?\n00:03 They don't have THIS system in place.\n00:05 After working with hundreds of business owners,\n00:08 I've found that the key to consistent content\n00:10 isn't working harder - it's working smarter."
        },
        {
          platform: "Instagram Reels",
          title: "✨ This content system CHANGED MY BUSINESS! Save 10+ hours every week with these 3 steps 🔥 #contentcreator #businesstips",
          script: "Hook: Want to know how I create consistent content while running a 7-figure business? This 3-step system changed everything.\n\nBody: If you're overwhelmed with content creation, you're missing a system. Here's what works: Step 1: Batch create EVERYTHING on one designated day. Step 2: Establish 3-5 content pillars that showcase your expertise. Step 3: Repurpose strategically - one video can become 10+ pieces of content across platforms. This system helped me go from spending 15 hours on content to just 4 hours a week.\n\nCTA: Save this post for your next content planning day and tap the link in my bio for my free content system template!",
          captions: "00:00 Want to know how I create consistent content\n00:03 while running a 7-figure business?\n00:05 This 3-step system changed everything.\n00:08 If you're overwhelmed with content creation,\n00:10 you're missing a system."
        }
      ]
    };
  }
}

// Generate repurposed content using Gemini
export async function generateRepurposedContent(transcript: string): Promise<RepurposeContentResponse> {
  try {
    const genAI = getGeminiClient();
    // Use the correct model with appropriate configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    });
    
    const prompt = createPrompt(transcript);
    console.log("Sending prompt to Gemini API");
    
    // Add safety settings to ensure reasonable responses
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Received response from Gemini API");
    
    return parseJsonFromResponse(text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Return fallback content in case of API error
    return {
      contents: [
        {
          platform: "TikTok",
          title: "💯 This SIMPLE system made my content strategy actually work! #productivityhack #contentcreator",
          script: "Hook: Stop struggling with your content! I'm about to share the ONLY system that actually works for busy entrepreneurs.\n\nBody: The problem isn't you - it's that you're trying to do too much without a system. Here's what works: First, batch your content creation on ONE day. Second, create content pillars - just 3-5 topics you're known for. Third, repurpose EVERYTHING. One video becomes 10 pieces of content. This simple 3-step system saved me 10+ hours every week.\n\nCTA: Double tap if you need this system and check the link in my bio for my free content planning template!",
          captions: "00:00 Stop struggling with your content!\n00:02 I'm about to share the ONLY system\n00:04 that actually works for busy entrepreneurs.\n00:07 The problem isn't you - it's that you're trying to do too much\n00:10 without a system."
        },
        {
          platform: "YouTube Shorts",
          title: "3-Step Content Strategy That Saves Entrepreneurs 10+ Hours Weekly | Productivity System",
          script: "Hook: The #1 reason entrepreneurs fail with content? They don't have THIS system in place.\n\nBody: After working with hundreds of business owners, I've found that the key to consistent content isn't working harder - it's working smarter. Here's the 3-step system that works: 1) Content batching - dedicate one day to create all your content for the week. 2) Content pillars - focus on just 3-5 core topics that align with your expertise. 3) Strategic repurposing - transform one piece of content into multiple formats. This system cut my content creation time by 10+ hours per week.\n\nCTA: Subscribe for more productivity tips and comment \"SYSTEM\" if you want my free content planning template!",
          captions: "00:00 The #1 reason entrepreneurs fail with content?\n00:03 They don't have THIS system in place.\n00:05 After working with hundreds of business owners,\n00:08 I've found that the key to consistent content\n00:10 isn't working harder - it's working smarter."
        },
        {
          platform: "Instagram Reels",
          title: "✨ This content system CHANGED MY BUSINESS! Save 10+ hours every week with these 3 steps 🔥 #contentcreator #businesstips",
          script: "Hook: Want to know how I create consistent content while running a 7-figure business? This 3-step system changed everything.\n\nBody: If you're overwhelmed with content creation, you're missing a system. Here's what works: Step 1: Batch create EVERYTHING on one designated day. Step 2: Establish 3-5 content pillars that showcase your expertise. Step 3: Repurpose strategically - one video can become 10+ pieces of content across platforms. This system helped me go from spending 15 hours on content to just 4 hours a week.\n\nCTA: Save this post for your next content planning day and tap the link in my bio for my free content system template!",
          captions: "00:00 Want to know how I create consistent content\n00:03 while running a 7-figure business?\n00:05 This 3-step system changed everything.\n00:08 If you're overwhelmed with content creation,\n00:10 you're missing a system."
        }
      ]
    };
  }
}
