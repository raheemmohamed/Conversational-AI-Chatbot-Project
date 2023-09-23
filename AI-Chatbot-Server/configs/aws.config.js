const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_ACCESS_SECRET;

AWS.config.update({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

// The name of the bucket that you have created
exports.BUCKET_NAME = "ai-chatbot-knowledges";

exports.s3Bucket = new AWS.S3();
