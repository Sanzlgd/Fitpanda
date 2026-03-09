/**
 * aiScanner.js
 * Utility to send a base64 image to GitHub Models using pure fetch API.
 * Parses the response into a JSON object: { name, calories, protein_g, carbs_g, fat_g }
 */

export async function analyzeFoodImage(base64Image) {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (!token) {
        throw new Error("Missing VITE_GITHUB_TOKEN in environment variables.");
    }

    const endpoint = "https://models.inference.ai.azure.com/chat/completions";
    const promptText = `Analyze this image. Identify the food and estimate the nutritional value for the visible portion. Return strictly a JSON object with keys: name (string), calories (number), protein_g (number), carbs_g (number), fat_g (number). No markdown formatting or extra text.`;

    // Ensure we have a proper data URI format
    const imageUri = base64Image.startsWith('data:')
        ? base64Image
        : `data:image/jpeg;base64,${base64Image}`;

    const payload = {
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "You are a specialized nutrition API that strictly outputs JSON objects and never natural language."
            },
            {
                role: "user",
                content: [
                    { type: "text", text: promptText },
                    { type: "image_url", image_url: { url: imageUri } }
                ]
            }
        ],
        temperature: 0.1,
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            console.error("API Error details:", errData);
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        let textResult = data.choices?.[0]?.message?.content;

        if (!textResult) {
            throw new Error("Invalid or empty response from gpt-4o.");
        }

        // Clean up markdown code blocks if the model accidentally includes them
        textResult = textResult.replace(/```json/gi, '').replace(/```/g, '').trim();

        // Parse JSON
        const parsed = JSON.parse(textResult);

        // Ensure expected types and defaults
        return {
            name: parsed.name || "Unknown Food",
            calories: typeof parsed.calories === 'number' ? parsed.calories : 0,
            protein_g: typeof parsed.protein_g === 'number' ? parsed.protein_g : 0,
            carbs_g: typeof parsed.carbs_g === 'number' ? parsed.carbs_g : 0,
            fat_g: typeof parsed.fat_g === 'number' ? parsed.fat_g : 0,
        };

    } catch (err) {
        console.error("AI Analysis (GitHub Models Native Fetch) failed:", err);
        throw err;
    }
}
