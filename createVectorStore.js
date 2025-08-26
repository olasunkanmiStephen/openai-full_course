const openai = require("../config/openaiConfig");


const createVectorStore = async() => {
    try {
        const response = await openai.vectorStores.create({
            name: "my_vector_store",
        });

        console.log("Vector Store created:", response);
        console.log("Vector Store ID:", response.id);
    } catch (error) {
        console.error("Error creating vector store")
    }
}

createVectorStore();