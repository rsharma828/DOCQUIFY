// import AWS from "aws-sdk";

// export async function downloadFromS3(file_key: string) {
//   try {
//     AWS.config.update({
//       accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
//       secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
//     });

//     const s3 = new AWS.S3({
//       params: {
//         Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
//       },
//       region: "eu-north-1",
//     });

//     const params = {
//       Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
//       Key: file_key,
//     };

//     const obj = await s3.getObject(params).promise();
//     const file_name = `/tmp/pdf-${Date.now()}.pdf`;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

import AWS from "aws-sdk";

export async function downloadFromS3(file_key: string) {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: "eu-north-1",
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const obj = await s3.getObject(params).promise();

    // Check if object was retrieved
    if (!obj || !obj.Body) {
      throw new Error("No content found in S3 object");
    }

    const file_name = `/tmp/pdf-${Date.now()}.pdf`;
    console.log(file_name);

    return obj.Body; // Return or write file content to the filesystem as needed
  } catch (error) {
    console.log("S3 download error:", error);
    return null;
  }
}
