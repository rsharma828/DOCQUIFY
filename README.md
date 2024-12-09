# DocQuify

DocQuify is a powerful platform designed to help users query and get answers from research papers and technical documentation. It allows users to upload PDF documents and ask context-based questions, making it easier to extract relevant information without reading the entire document. Additionally, DocQuify serves as a valuable tool for staying updated with the latest technology trends by providing context-based answers from uploaded documents.

## Features

- **PDF Upload**: Users can upload PDFs (e.g., research papers, technical documentation) for querying.
- **Question Answering**: Ask context-based questions from the uploaded documents and get precise answers.
- **Up-to-date Information**: Upload any document related to new technology to get accurate context-based answers, even from the latest trends.
- **Google Login Integration**: Secure login via Google using Clerk for seamless authentication and user management.

## Technologies Used

- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js, Express.js, PostgreSQL
- **Authentication**: Clerk (Google Login)
- **Document Storage**: AWS S3
- **Question Answering**: OpenAI API, Pinecone vector database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/docquify.git

2. Install dependencies
  cd docquify
  npm install

3. Set up your environment variables:

  JWT_SECRET: Secret key for JWT authentication.
  AWS_S3_BUCKET_NAME: Your AWS S3 bucket name.
  AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY: Your AWS credentials.
  OPENAI_API_KEY: Your OpenAI API key.
  PINECONE_API_KEY: Your Pinecone API key.
  
4. Run the development server:
   npm run dev

Contributing
Feel free to fork the repository, create a pull request, or open an issue if you encounter any bugs or have suggestions for improvements.   
 


  
