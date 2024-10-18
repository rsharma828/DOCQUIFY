import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
  console.log("Initializing Pinecone index");
  const index = pc.index("quizdoc");

  try {
    const namespace = convertToAscii(fileKey);
    const queryResult = await index.namespace(namespace).query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    console.log(queryResult);
    return queryResult.matches || [];
  } catch (error) {
    console.error("Error getting embeddings:", error);
    return []; // Return an empty array instead of throwing
  }
}

export async function getContext(
  query: string,
  fileKey: string
): Promise<string> {
  try {
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

    const qualifyingDocs = matches.filter(
      (match) => match.score && match.score > 0.7
    );

    type Metadata = {
      text: string;
      pageNumber: number;
    };

    const docs = qualifyingDocs.map(
      (match) => (match.metadata as Metadata).text
    );
    return docs.join("\n").substring(0, 3000);
  } catch (error) {
    console.error("Error getting context:", error);
    return ""; // Return an empty string if there's an error
  }
}
