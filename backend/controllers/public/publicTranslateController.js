const axios = require('axios');

const translateText = async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({
      message: 'Text and targetLang are required.',
    });
  }

  try {
    const response = await axios.post(
      'https://translate.googleapis.com/translate_a/single',
      null,
      {
        params: {
          client: 'gtx',
          sl: 'auto', // Deteksi bahasa otomatis
          tl: targetLang, // Bahasa tujuan
          dt: 't', // Detail terjemahan
          q: text,
        },
      }
    );

    const translatedText = response.data[0][0][0]; // Ambil hasil terjemahan
    res.json({
      translatedText,
    });
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({
      message: 'Failed to translate text.',
    });
  }
};

module.exports = {
  translateText,
};


