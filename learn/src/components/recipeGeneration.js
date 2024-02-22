import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react"
import parse from 'html-react-parser';


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const GeminiComponent = ({ ing }) => {
    const ingList = ing.map((i) => (
        i.quantity.toString() + " " + i.unit + "(s) of " + i.name
    )).join(", ")

    const prompt = "Can you please make give me a beginner-friendly recipe that must use some of the following ingredients: " + ingList + "? Please only include only the name of the dish, the ingredients, and the instructions. Can you also format the response with html tags starting from the <p> tag?"

    // const [prompt, setPrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");

    const handleGenerate = async (prompt) => {
        try {
            console.log(prompt)
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <div style={{ textAlign: "left" }}>{parse(generatedText)}</div>
            </div>
        </div>
    );
}
