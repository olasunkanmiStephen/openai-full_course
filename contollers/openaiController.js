const openai = require("../config/openaiConfig");

const generateMeta = async (req, res) => {
  const { title } = req.body;

  const description = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        role: "user",
        content: `Come up with a description and related titles for Youtube video called: ${title}`,
      },
    ],
    max_tokens: 100,
  });
  const tags = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        role: "user",
        content: `Come up with 10 keywords for Youtube video called: ${title}`,
      },
    ],
    max_tokens: 100,
  });

  res.status(200).json({
    description: description.choices[0].message,
    tags: tags.choices[0].message,
  });
};

const generateImage = async (req, res) => {
  try {
    const image = await openai.images.generate({
      prompt: req.body.prompt,
      model: "dall-e-3",
      size: "1024x1024",
    });
    console.log(image.data[0].url);
    res.status(200).json({
      url: image.data[0].url,
    });
  } catch (error) {
    console.error("Image generation failed:", error.message);
    if (error.status === 500) {
      console.log("Retrying...");
      return generateImage(description);
    }
  }
};
 
const webSearch = async (req, res) => {
  try {
    const { query } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes search results." },
        { role: "user", content: `Search the web and summarize: ${query}` }
      ],
      max_tokens: 200,
    });

    res.json({
      heading: query,
      content: response.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Web search failed" });
  }
};
module.exports = { generateMeta, generateImage, webSearch };
