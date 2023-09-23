const mongoose = require("mongoose");

/**
 * Schema is where define the definition of the structures such as type, validation, default value etc.
 */
const aiTrainedModelSchema = new mongoose.Schema({
  organizationId: {
    type: String,
    required: [true],
  },
  organizationName: {
    type: String,
    required: [true, "Organization name is required"],
  },
  uploadKnowledgeTxt: {
    type: String,
    required: [true],
  },
  embeddedKnowlegeTxt: {
    type: String,
    required: [true],
  },
  apiKey: {
    type: String,
    required: [true],
  },
  originalAPIKey: {
    type: String,
    required: [true],
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Model is the place where define schema and now this model includes with the model methods (ex: find, insertOne || save)
const AiTrainedModel = mongoose.model(
  "OrganizationAITrainedKnwoledge",
  aiTrainedModelSchema
);

module.exports = AiTrainedModel;
