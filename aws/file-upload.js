const Aws = require("aws-sdk");
require("dotenv").config();
const { v4: uuid } = require("uuid");

const keys = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

async function uploadFileToS3(data, fileName) {
  const s3 = new Aws.S3(keys);
  try {
    const params = {
      Bucket: "echo-mate",
      Key: `${uuid()}_${fileName}`, // Use a unique filename
      Body: data,
      ACL: "public-read",
    };

    const uploadResult = await s3.upload(params).promise();
    const url = uploadResult.Location;

    return url;
  } catch (err) {
    console.error("Error uploading file:", err.message);
    throw err; // Re-throw the error for proper handling by callers
  }
}

module.exports = {
    uploadFileToS3
}