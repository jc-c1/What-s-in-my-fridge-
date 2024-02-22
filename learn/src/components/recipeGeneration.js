import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react"


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const GeminiComponent = ({ ing }) => {
    const ingList = ing.map((i) => (
        i.quantity.toString() + " " + i.unit + "(s) of " + i.name
    )).join(", ")

    const prompt = "Can you please make give me a recipe that uses " + ingList + "?"


    // const [prompt, setPrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");

    const handleGenerate = async (prompt) => {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(text)
            // Update the UI with the generated response
            setGeneratedText(text);
        } catch (error) {
            console.error("Error generating text:", error);
            // Handle errors appropriately
            
        }
    };

    return (
        <div>
            <button onClick={() => handleGenerate(prompt)}>Generate</button>
            <p>{generatedText}</p>
        </div>
    );
}
