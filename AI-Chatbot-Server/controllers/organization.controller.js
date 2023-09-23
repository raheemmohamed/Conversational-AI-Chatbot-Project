const crypto = require("crypto");
const bcrypt = require("bcrypt");

const openai = require("../configs/openai.config");

const OrganizationModel = require("../models/organization.model");
const AiTrainedModel = require("../models/aiTrain.model");

const { s3Bucket, BUCKET_NAME } = require("../configs/aws.config");

const min_para_words = 5;
let embeddingStore = {}; // Contains embedded data for future use
const embeds_storage_prefix = "embeds:";

const secretKey = process.env.CRYPTO_SECRET;

exports.uploadKnowledgeBase = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      status: "Failed",
      message: "No file uploaded",
    });
  }

  const file = req.files.file;

  const params = {
    Bucket: BUCKET_NAME,
    Key: "uploads/" + file.name,
    Body: file.data,
    ContentType: file.mimetype,
  };

  s3Bucket.putObject(params, async (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).json({
        status: "Failed",
        message: "File upload failed",
        error: err.message,
      });
    } else {
      // const knwledgeSource = await getFilesByKey(`uploads/${file.name}`);
      // await createEmbeddingBasedOnTxtFile(knwledgeSource);

      // const getData = await getFilesByKey(`embedding/embeded.txt`);

      // console.log("Your Data", getData);

      return res.status(200).json({
        status: "Success",
        message: "File uploaded successfully",
        data: {
          tag: data,
          url: `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/uploads/${file.name}`,
        },
      });
    }
  });
};

exports.trainEmbeddedModel = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      result: 1,
      data: "Successfull added",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

async function createEmbeddingBasedOnTxtFile(knwoledgeSource, fileName) {
  let rawText = knwoledgeSource;
  let embeddingStore = {};

  let paras = [];

  let rawParas = rawText.split(/\n\s*\n/);
  console.log("rawParas", rawParas);

  for (let i = 0; i < rawParas.length; i++) {
    let rawPara = rawParas[i].trim().replaceAll("\n", " ").replace(/\r/g, "");

    // Check of it is a question and has greater length than minimum
    if (rawPara.charAt(rawPara.length - 1) != "?") {
      if (rawPara.split(/\s+/).length >= min_para_words) {
        paras.push(rawPara);
      }
    }
  }
  const countParas = paras.length;
  const startTime = new Date().getTime();

  // Sending data over to embedding model
  try {
    const response = await openai.createEmbedding({
      input: paras,
      model: "text-embedding-ada-002",
    });

    // Check if data recieved correctly
    if (response.data.data.length >= countParas) {
      for (let i = 0; i < countParas; i++) {
        // Adding each embedded para to embeddingStore
        embeddingStore[embeds_storage_prefix + paras[i]] = JSON.stringify({
          embedding: response.data.data[i].embedding,
          created: startTime,
        });
      }
    }

    //fs.writeFileSync(destPath, JSON.stringify(embeddingStore));

    //upload embedding model text file
    const embededFileUploadedURL = await uploadEmbededModelKnowledge(
      fileName,
      embeddingStore
    );

    return embededFileUploadedURL;
  } catch (error) {
    console.log("Some error happened");
    // Error handling code
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.log(error);
    }
  }
}

async function uploadEmbededModelKnowledge(fileName, embeddingStoreData) {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: `embedding/embeded-${fileName}`,
    Body: JSON.stringify(embeddingStoreData),
  };
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const embededFileLocation = `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/embedding/embeded-${fileName}`;
        resolve({ embededFileLocation: embededFileLocation });
      }
    });
  });
}

async function getFilesByKey(sourcePath) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: sourcePath,
  };

  return new Promise((resolve, reject) => {
    s3Bucket.getObject(params, (err, data) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        resolve(data.Body.toString("utf-8"));

        return data.Body.toString("utf-8");
      }
    });
  });
}

exports.addNewOrganization = async (req, res) => {
  try {
    const newOrganizationData = {
      organizationName: req.body.organizationName,
      organizationWebsite: req.body.organizationWebsite,
      organizationEmail: req.body.organizationEmail,
      organizationPhone: req.body.organizationPhone,
      isActive: req.body.isActive,
    };
    const newOrganization = await OrganizationModel.create(newOrganizationData);

    res.status(200).json({
      status: "Success",
      response: {
        data: newOrganization,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({
      status: "Failed",
      response: {},
      error: error,
    });
  }
};

exports.getAllOrganizationList = async (req, res) => {
  try {
    const getAllOrganization = await OrganizationModel.find();

    res.status(200).json({
      status: "Success",
      response: {
        data: getAllOrganization,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      response: {},
      error: error,
    });
  }
};

exports.addNewtrainingModelForOrganization = async (req, res) => {
  try {
    const newAITrainingModel = {
      organizationId: req.body.organization.organizationId,
      organizationName: req.body.organization.organizationName,
      uploadKnowledgeTxt: req.body.url,
      embeddedKnowlegeTxt: "",
      apiKey: "",
      originalAPIKey: "",
    };

    const fileName = newAITrainingModel.uploadKnowledgeTxt.substring(
      newAITrainingModel.uploadKnowledgeTxt.lastIndexOf("/") + 1
    );

    const knwledgeSource = await getFilesByKey(`uploads/${fileName}`);
    const embededFileUploadData = await createEmbeddingBasedOnTxtFile(
      knwledgeSource,
      fileName
    );

    console.log("embededFileUploadData", embededFileUploadData);
    newAITrainingModel.embeddedKnowlegeTxt =
      embededFileUploadData.embededFileLocation;

    const { organizationId, organizationName, embeddedKnowlegeTxt } =
      newAITrainingModel;
    newAITrainingModel.originalAPIKey = generateApiKey({
      organizationId,
      organizationName,
      embeddedKnowlegeTxt,
    });
    newAITrainingModel.apiKey = await hashAndGenerateNewAPI(
      newAITrainingModel.originalAPIKey
    );

    console.log("Check my all payload for train model", newAITrainingModel);

    const newlyCreatedTrainingModel = await AiTrainedModel.create(
      newAITrainingModel
    );

    res.status(200).json({
      status: "Success",
      response: {
        data: newlyCreatedTrainingModel,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      status: "Failed",
      response: {},
      error: error.message,
    });
  }
};

exports.getAllTrainingListData = async (req, res) => {
  try {
    const getAllTrainedModelList = await AiTrainedModel.find();

    res.status(200).json({
      status: "Success",
      response: {
        data: getAllTrainedModelList,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({
      status: "Failed",
      response: {},
      error: error,
    });
  }
};

// Derive a 32-byte key from the passphrase using scrypt
const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(secretKey, salt, 32);

// Generate an API key based on the data object
const generateApiKey = (data) => {
  const dataString = JSON.stringify(data);
  const iv = crypto.randomBytes(16); // generate a random IV
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(dataString, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted;
};

// // Decode an API key and return the customer object
const decodeApiKey = (apiKey) => {
  const iv = Buffer.from(apiKey.slice(0, 32), "hex");
  const encrypted = apiKey.slice(32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};

async function hashAndGenerateNewAPI(originalAPIKey) {
  return await bcrypt.hash(originalAPIKey, 10);
}

exports.generateCompletion = async (req, res) => {
  const data = await AiTrainedModel.findOne({ apiKey: req.query.key });

  if (!data) {
    return res.status(400).json({
      status: "Error",
      message: "API Key is not valid, please contact IT support",
    });
  }

  const isValidData = await bcrypt.compare(data.originalAPIKey, req.query.key);

  if (isValidData && data.isDisabled) {
    return res.status(400).json({
      status: "Error",
      message: "API Key is deactivated, please contact IT support",
    });
  }

  if (isValidData) {
    let embeddedQuestion;

    try {
      // Retrieve embedding store and parse it
      const fileName = extractFileNamewithExt(data.embeddedKnowlegeTxt);
      const embeddingStoreJSON = await getFilesByKey(`embedding/${fileName}`);

      embeddingStore = JSON.parse(embeddingStoreJSON);

      // Embed the prompt using embedding model

      let embeddedQuestionResponse = await openai.createEmbedding({
        input: req.body.queryPrompt,
        model: "text-embedding-ada-002",
      });

      // Some error handling
      if (embeddedQuestionResponse.data.data.length) {
        embeddedQuestion = embeddedQuestionResponse.data.data[0].embedding;
      } else {
        throw Error("Question not embedded properly");
      }

      // Find the closest count(int) paragraphs
      let closestParagraphs = findClosestParagraphs(embeddedQuestion, 5); // Tweak this value for selecting paragraphs number

      console.log("closest para", closestParagraphs);
      let completionData = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            role: "user",
            content: createPrompt(req.body.queryPrompt, closestParagraphs),
          },
        ],
        temperature: 0, // Tweak for more random answers
      });

      if (!completionData.data.choices) {
        throw new Error("No answer gotten");
      }

      console.log(completionData.data.choices[0].message.content.trim());
      completionData.data.choices[0].message.content.trim();

      return res.json({
        status: "success",
        message: completionData.data.choices[0].message.content.trim(),
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }

      return res.status(400).json({
        status: "Failed",
        message: error,
      });
    }
  }
};

const createPrompt = (question, paragraph) => {
  // A sample prompt if you don't want it to use its own knowledge
  // rather answer only from data you've provided
  return (
    "You are AI Assistant, your name is AI Bot. developed by Raheem Mohamed. Answer the following question from the context, if the answer can not be deduced from the context, say 'Sorry Your Question is not clear, please explain indetail' :\n\n" +
    "Context :\n" +
    paragraph.join("\n\n") +
    "\n\nQuestion :\n" +
    question +
    "?" +
    "\n\nAnswer :"
  );
};

// Loop through each context paragraph, calculates the score, sort using score and return top count(int) paragraphs
const findClosestParagraphs = (questionEmbedding, count) => {
  const items = [];

  for (const key in embeddingStore) {
    let paragraph = keyExtractParagraph(key);

    let currentEmbedding = JSON.parse(embeddingStore[key]).embedding;

    items.push({
      paragraph: paragraph,
      score: compareEmbeddings(questionEmbedding, currentEmbedding),
    });
  }

  items.sort(function (a, b) {
    return b.score - a.score;
  });

  return items.slice(0, count).map((item) => item.paragraph);
};
// Removes the prefix from paragraph
const keyExtractParagraph = (key) => {
  return key.substring(embeds_storage_prefix.length);
};

// Calculates the similarity score of question and context paragraphs
const compareEmbeddings = (embedding1, embedding2) => {
  const length = Math.min(embedding1.length, embedding2.length);
  let dotprod = 0;

  for (let i = 0; i < length; i++) {
    dotprod += embedding1[i] * embedding2[i];
  }
  return dotprod;
};

const extractFileNamewithExt = (url) => {
  const fileName = url.substring(url.lastIndexOf("/") + 1);
  return fileName;
};

exports.getAllOrganizationWebsitURL = async () => {
  try {
    const organizationWebsites = await OrganizationModel.find(
      {},
      { organizationWebsite: 1 }
    );

    return organizationWebsites;
  } catch (error) {
    console.log("Error Get All organization website", error);
    throw new Error(error);
  }
};
