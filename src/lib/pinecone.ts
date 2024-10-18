// // // import {
// // //   PineconeClient,
// // //   Vector,
// // //   utils as PineconeUtils,
// // // } from "@pinecone-database/pinecone";
// // // import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// // // import { downloadFromS3 } from "./s3-server";
// // // import fs from "fs/promises";
// // // import path from "path";
// // // import { metadata } from '../app/layout';
// // // import {
// // //   Document,
// // //   RecursiveCharacterTextSplitter,
// // // } from "@pinecone-database/doc-splitter";
// // // import { pages } from "next/dist/build/templates/app-page";
// // // import { getEmbeddings } from "./embeddings";
// // // import md5 from "md5";
// // // // import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
// // // import { convertToAscii } from "./utils";

// // // let pinecone: PineconeClient | null = null;

// // // export const getPineconeClient = async () => {
// // //   if (!pinecone) {
// // //     console.log("pinecone 1");
// // //     pinecone = new PineconeClient();
// // //     await pinecone.init({
// // //       environment: process.env.PINECONE_ENVIRONMENT!,
// // //       apiKey: process.env.PINECONE_API_KEY!,
// // //     });
// // //     console.log("pinecone 2");
// // //   }
// // //   return pinecone;
// // // };

// // // // export async function loadS3IntoPinecone(fileKey: string) {
// // // //   // 1. obtain pdf file -> download the pdf and process it
// // // //   console.log("Downloading pdf to our file system");
// // // //   const file_name = await downloadFromS3(fileKey);
// // // //   if (!file_name) {
// // // //     throw new Error("could not download from s3");
// // // //   }
// // // //   const loader = new PDFLoader(file_name);
// // // //   const pages = await loader.load();
// // // //   return pages;
// // // // }

// // // type PDFPage = {
// // //   pageContent: string;
// // //   metadata: {
// // //     loc: { pageNumber: number };
// // //   };
// // // };

// // // export async function loadS3IntoPinecone(fileKey: string) {
// // //   console.log("Downloading pdf to our file system");
// // //   const file_data = await downloadFromS3(fileKey);

// // //   if (!file_data) {
// // //     throw new Error("could not download from s3");
// // //   }

// // //   const file_name = path.join("/tmp", `pdf-${Date.now()}.pdf`);

// // //   // Write the file data to the local file system
// // //   await fs.writeFile(file_name, file_data);

// // //   const loader = new PDFLoader(file_name);
// // //   const pages = (await loader.load()) as PDFPage[];

// // //   // 2. split and segment the pdf
// // //   console.log("spliting document");
// // //   const documents = await Promise.all(pages.map(prepareDocument));
// // //   console.log("document splitted");
// // //   // 3. vectorise and embed indivisual document
// // //   console.log("vectorising pdf");
// // //   const vectors = await Promise.all(documents.flat().map(embedDocument));
// // //   console.log("vectors", { vectors });
// // //   //4. Upload to pinecone
// // //   console.log("above pinecone");
// // //   const client = await getPineconeClient();
// // //   const pineconeIndex = client.Index("quizdoc");

// // //   console.log("inserting vector into pinecone");
// // //   const namespace = convertToAscii(fileKey);
// // //   console.log("after ascii");
// // //   PineconeUtils.chunkedUpsert(pineconeIndex, vectors, namespace, 10);
// // //   return documents[0];
// // // }

// // // async function embedDocument(doc: Document) {
// // //   try {
// // //     const embeddings = await getEmbeddings(doc.pageContent);
// // //     const hash = md5(doc.pageContent);

// // //     return {
// // //       id: hash,
// // //       values: embeddings,
// // //       metadata: {
// // //         text: doc.metadata.text,
// // //         pageNumber: doc.metadata.pageNumber,
// // //       },
// // //     } as Vector;
// // //   } catch (error) {
// // //     console.log("error embedding the document", error);
// // //     throw error;
// // //   }
// // // }

// // // export const truncateStringByBytes = (str: string, bytes: number) => {
// // //   const enc = new TextEncoder();
// // //   return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
// // // };

// // // async function prepareDocument(page: PDFPage) {
// // //   let { pageContent, metadata } = page;
// // //   pageContent = pageContent.replace(/\n/g, "");
// // //   // spliting the doc
// // //   const splitter = new RecursiveCharacterTextSplitter();
// // //   const docs = await splitter.splitDocuments([
// // //     new Document({
// // //       pageContent,
// // //       metadata: {
// // //         pageNumber: metadata.loc.pageNumber,
// // //         text: truncateStringByBytes(pageContent, 36000),
// // //       },
// // //     }),
// // //   ]);

// // //   return docs;
// // // }

// // import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
// // import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// // import { downloadFromS3 } from "./s3-server";
// // import fs from "fs/promises";
// // import path from "path";
// // import {
// //   Document,
// //   RecursiveCharacterTextSplitter,
// // } from "@pinecone-database/doc-splitter";
// // import md5 from "md5";
// // import { convertToAscii } from "./utils";
// // import { getEmbeddings } from "./embeddings";

// // let pinecone: Pinecone | null = null;

// // export const getPineconeClient = async () => {
// //   if (!pinecone) {
// //     console.log("Initializing Pinecone client...");
// //     pinecone = new Pinecone({
// //       apiKey: process.env.PINECONE_API_KEY!,
// //     });
// //     console.log("Pinecone client initialized.");
// //   }
// //   return pinecone;
// // };

// // type PDFPage = {
// //   pageContent: string;
// //   metadata: {
// //     loc: { pageNumber: number };
// //   };
// // };

// // export async function loadS3IntoPinecone(fileKey: string) {
// //   console.log("Downloading PDF from S3...");
// //   const file_data = await downloadFromS3(fileKey);

// //   if (!file_data) {
// //     throw new Error("Could not download from S3.");
// //   }

// //   const file_name = path.join("/tmp", `pdf-${Date.now()}.pdf`);

// //   // Write the file data to the local file system
// //   await fs.writeFile(file_name, file_data);
// //   console.log("PDF saved to local file system.");

// //   const loader = new PDFLoader(file_name);
// //   const pages = (await loader.load()) as PDFPage[];

// //   console.log("Splitting the document...");
// //   const documents = await Promise.all(pages.map(prepareDocument));
// //   console.log("Document split into multiple chunks.");

// //   console.log("Vectorizing PDF content...");
// //   const vectors = await Promise.all(documents.flat().map(embedDocument));
// //   console.log("Vectorization complete. Total vectors:", vectors.length);

// //   console.log("Uploading vectors to Pinecone...");
// //   const client = await getPineconeClient();
// //   const index = client.index("quizdoc");

// //   const namespace = convertToAscii(fileKey);
// //   console.log("Inserting vectors into Pinecone...");

// //   try {
// //     await index.namespace(namespace).upsert(vectors);
// //     console.log("Vectors successfully upserted to Pinecone.");
// //   } catch (error) {
// //     console.error("Error upserting vectors to Pinecone:", error);
// //     throw new Error("Upsert failed");
// //   }

// //   return documents[0];
// // }

// // async function embedDocument(doc: Document) {
// //   try {
// //     const embeddings = await getEmbeddings(doc.pageContent);
// //     const hash = md5(doc.pageContent);

// //     return {
// //       id: hash,
// //       values: embeddings,
// //       metadata: {
// //         text: doc.metadata.text,
// //         pageNumber: doc.metadata.pageNumber,
// //       },
// //     } as PineconeRecord;
// //   } catch (error) {
// //     console.error("Error embedding the document:", error);
// //     throw error;
// //   }
// // }

// // export const truncateStringByBytes = (str: string, bytes: number) => {
// //   const enc = new TextEncoder();
// //   return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
// // };

// // async function prepareDocument(page: PDFPage) {
// //   const { metadata } = page;
// //   let { pageContent } = page;
// //   pageContent = pageContent.replace(/\n/g, "");

// //   // Split the document into smaller chunks for embedding
// //   const splitter = new RecursiveCharacterTextSplitter();
// //   const docs = await splitter.splitDocuments([
// //     new Document({
// //       pageContent,
// //       metadata: {
// //         pageNumber: metadata.loc.pageNumber,
// //         text: truncateStringByBytes(pageContent, 36000),
// //       },
// //     }),
// //   ]);

// //   return docs;
// // }

// import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { downloadFromS3 } from "./s3-server";
// import fs from "fs/promises";
// import path from "path";
// import {
//   Document,
//   RecursiveCharacterTextSplitter,
// } from "@pinecone-database/doc-splitter";
// import md5 from "md5";
// import { convertToAscii } from "./utils";
// import { getEmbeddings } from "./embeddings";

// let pinecone: Pinecone | null = null;

// export const getPineconeClient = async () => {
//   if (!pinecone) {
//     console.log("Initializing Pinecone client...");
//     pinecone = new Pinecone({
//       apiKey: process.env.PINECONE_API_KEY!,
//     });
//     console.log("Pinecone client initialized.");
//   }
//   return pinecone;
// };

// type PDFPage = {
//   pageContent: string;
//   metadata: {
//     loc: { pageNumber: number };
//   };
// };

// export async function loadS3IntoPinecone(fileKey: string) {
//   console.log("Downloading PDF from S3...");
//   const file_data = await downloadFromS3(fileKey);

//   if (!file_data) {
//     throw new Error("Could not download from S3.");
//   }

//   const file_name = path.join("/tmp", `pdf-${Date.now()}.pdf`);

//   // Convert Blob to Buffer
//   const buffer = Buffer.from(await file_data.arrayBuffer());

//   // Write the file data to the local file system
//   await fs.writeFile(file_name, buffer);
//   console.log("PDF saved to local file system.");

//   const loader = new PDFLoader(file_name);
//   const pages = (await loader.load()) as PDFPage[];

//   console.log("Splitting the document...");
//   const documents = await Promise.all(pages.map(prepareDocument));
//   console.log("Document split into multiple chunks.");

//   console.log("Vectorizing PDF content...");
//   const vectors = await Promise.all(documents.flat().map(embedDocument));
//   console.log("Vectorization complete. Total vectors:", vectors.length);

//   console.log("Uploading vectors to Pinecone...");
//   const client = await getPineconeClient();
//   const index = client.index("quizdoc");

//   const namespace = convertToAscii(fileKey);
//   console.log("Inserting vectors into Pinecone...");

//   try {
//     await index.namespace(namespace).upsert(vectors);
//     console.log("Vectors successfully upserted to Pinecone.");
//   } catch (error) {
//     console.error("Error upserting vectors to Pinecone:", error);
//     throw new Error("Upsert failed");
//   }

//   return documents[0];
// }

// async function embedDocument(doc: Document) {
//   try {
//     const embeddings = await getEmbeddings(doc.pageContent);
//     const hash = md5(doc.pageContent);

//     return {
//       id: hash,
//       values: embeddings,
//       metadata: {
//         text: doc.metadata.text,
//         pageNumber: doc.metadata.pageNumber,
//       },
//     } as PineconeRecord;
//   } catch (error) {
//     console.error("Error embedding the document:", error);
//     throw error;
//   }
// }

// export const truncateStringByBytes = (str: string, bytes: number) => {
//   const enc = new TextEncoder();
//   return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
// };

// async function prepareDocument(page: PDFPage) {
//   const { metadata } = page;
//   let { pageContent } = page;
//   pageContent = pageContent.replace(/\n/g, "");

//   // Split the document into smaller chunks for embedding
//   const splitter = new RecursiveCharacterTextSplitter();
//   const docs = await splitter.splitDocuments([
//     new Document({
//       pageContent,
//       metadata: {
//         pageNumber: metadata.loc.pageNumber,
//         text: truncateStringByBytes(pageContent, 36000),
//       },
//     }),
//   ]);

//   return docs;
// }

import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { downloadFromS3 } from "./s3-server";
import fs from "fs/promises";
import path from "path";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import md5 from "md5";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    console.log("Initializing Pinecone client...");
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    console.log("Pinecone client initialized.");
  }
  return pinecone;
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  console.log("Downloading PDF from S3...");
  const file_data = await downloadFromS3(fileKey);

  if (!file_data) {
    throw new Error("Could not download from S3.");
  }

  const file_name = path.join("/tmp", `pdf-${Date.now()}.pdf`);

  // Write the file data to the local file system
  if (file_data instanceof Buffer) {
    await fs.writeFile(file_name, file_data);
  } else if (typeof file_data === "string") {
    await fs.writeFile(file_name, file_data, "utf8");
  } else if (file_data instanceof Uint8Array) {
    await fs.writeFile(file_name, file_data);
  } else {
    throw new Error("Unsupported file_data type");
  }

  console.log("PDF saved to local file system.");

  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  console.log("Splitting the document...");
  const documents = await Promise.all(pages.map(prepareDocument));
  console.log("Document split into multiple chunks.");

  console.log("Vectorizing PDF content...");
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  console.log("Vectorization complete. Total vectors:", vectors.length);

  console.log("Uploading vectors to Pinecone...");
  const client = await getPineconeClient();
  const index = client.index("quizdoc");

  const namespace = convertToAscii(fileKey);
  console.log("Inserting vectors into Pinecone...");

  try {
    await index.namespace(namespace).upsert(vectors);
    console.log("Vectors successfully upserted to Pinecone.");
  } catch (error) {
    console.error("Error upserting vectors to Pinecone:", error);
    throw new Error("Upsert failed");
  }

  return documents[0];
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.error("Error embedding the document:", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  const { metadata } = page;
  let { pageContent } = page;
  pageContent = pageContent.replace(/\n/g, "");

  // Split the document into smaller chunks for embedding
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs;
}
