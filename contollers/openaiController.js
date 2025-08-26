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

    const response = await openai.responses.create({
      model: "gpt-4.1",
      tools: [{ type: "web_search" }],
      input: query || "What movie won best piscture in 2025",
    });

    res.json({
      response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Web search failed", details: error.message, });
  }
};

const fileSeacrh = async (req, res) => {
    try {
        const response = await openai.responses.create({
            model="gpt-4.1",
            input = "What is deep research by OpenAi?",
            tools=[{
                type: "file_search",
                vector_store_ids: ["<vector_store_id"],
                max_num_results: 2,
            }],
            include: ["file_search_call.results"],
    })

    console.log(response)
    } catch (error) {
        console.log(error)
    }
}
module.exports = { generateMeta, generateImage, webSearch };
