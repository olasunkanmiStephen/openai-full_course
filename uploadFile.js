const openai = require("./config/openaiConfig");
const fs = require("fs");

const uploadFile = async () => {
  try {
    const file = await openai.vectorStores.files.upload(
      process.env.VECTOR_STORE_ID,  
      fs.createReadStream("b.pdf") 
    );

    console.log("✅ File uploaded:", file);
  } catch (error) {
    console.error("Error uploading file:", error.response?.data || error.message);
  }
};

uploadFile();
