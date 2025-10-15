const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

const main = async (DATA) => {
  try {
    const prompt = `
You are an expert web developer AI.

Create a complete, modern, responsive personal portfolio website using this data:

👤 Name: ${DATA.name}
📧 Email: ${DATA.email}
📞 Phone: ${DATA.phone || 'N/A'}
📝 Summary: ${DATA.summary || 'N/A'}
💼 Skills: ${DATA.skills.join(', ')}
🎓 Education: ${JSON.stringify(DATA.education, null, 2)}
🧠 Experience: ${JSON.stringify(DATA.experience, null, 2)}
🚀 Projects: ${JSON.stringify(DATA.projects, null, 2)}
🖼️ Profile Image: ${DATA.profileImageUrl || 'N/A'}

---

Return three separate code sections exactly in this format:

HTML:
\`\`\`html
<!-- HTML code -->
\`\`\`

CSS:
\`\`\`css
/* CSS code */
\`\`\`

JS:
\`\`\`javascript
// JavaScript code
\`\`\`

⚠️ Important:
- Only return the three code blocks.
- Do not explain anything.
- Each code block must start and end properly with its respective markdown fence.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text?.trim() || '';

    // Extract each block using regex
    const html = text.match(/```html([\s\S]*?)```/)?.[1]?.trim() || '';
    const css = text.match(/```css([\s\S]*?)```/)?.[1]?.trim() || '';
    const js = text.match(/```javascript([\s\S]*?)```/)?.[1]?.trim() || '';

    // Return as structured object
    return { html, css, js };
  } catch (error) {
    console.error('❌ Gemini Error:', error);
    return { html: '', css: '', js: '', error: 'Error generating code.' };
  }
};

module.exports = { main };