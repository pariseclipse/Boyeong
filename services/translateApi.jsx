import translate from '@vitalets/google-translate-api';

export async function translateText(text) {
  try {
    const res = await translate(text, { to: 'en' }); 
    return res.text;
  } catch (error) {
    console.error("Translation error:", error);
  }
}
