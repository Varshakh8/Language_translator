const axios = require("axios");
const TranslationStrategy = require("./TranslationStrategy");

class LibreTranslateStrategy extends TranslationStrategy {

    async translate(text, source, target) {

        try {
            const response = await axios.post(
                "https://translate.argosopentech.com/translate",
                {
                    q: text,
                    source: source,
                    target: target,
                    format: "text"
                }
            );

            console.log("API RESPONSE:", response.data);

            if(response.data && response.data.translatedText){
                return response.data.translatedText;
            } else {
                return this.fallback(text, target);
            }

        } catch (error) {
            console.log("API ERROR:", error.message);
            return this.fallback(text, target);
        }
    }

    // 🔥 FALLBACK METHOD (IMPORTANT)
    fallback(text, target){

        const dictionary = {
            "hello": { hi: "नमस्ते", es: "hola" },
            "thank you": { hi: "धन्यवाद", es: "gracias" },
            "good morning": { hi: "सुप्रभात", es: "buenos días" }
        };

        const lowerText = text.toLowerCase();

        if(dictionary[lowerText] && dictionary[lowerText][target]){
            return dictionary[lowerText][target];
        }

        return "Translation not available (API failed)";
    }
}

module.exports = LibreTranslateStrategy;