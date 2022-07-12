
const axios = require('axios');

const getTranslatePrompt = (code, newLanguageType, oldLanguageType) => {
    return `##### Translate this function from ${oldLanguageType} into ${newLanguageType} \n ${code} \n ###${newLanguageType} \n output:`;
}

const fetchCodeTranslationFromGpt3 = async (code, newLanguageType, oldLanguageType) => {
    try {
        const prompt = getTranslatePrompt(code, newLanguageType, oldLanguageType);
        const response = await axios.request('https://api.openai.com/v1/completions', {
            method: 'POST',
            timeout: 20000,
            data: {
                    prompt: prompt,
                    temperature: 0.3,
                    max_tokens: 250,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    model: 'text-davinci-002',
                    stop: ["###"]
            },
            headers: {
                Authorization: `Bearer ${process.env.OPEN_API_KEY}`
            }
        })
        
        return response.data.choices[0].text;
    } catch(error) {
        console.error('error', error.response.data)
        throw error.response.data;
    }

}


const getTranslatedCode = async (code, newLanguageType, oldLanguageType) => {
    const translation = await fetchCodeTranslationFromGpt3(code, newLanguageType, oldLanguageType);
    return translation; 
}

module.exports = {
    getTranslatedCode
}
