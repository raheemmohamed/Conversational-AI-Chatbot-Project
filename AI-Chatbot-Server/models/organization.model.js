const mongoose = require("mongoose");

/**
 * Schema is where define the definition of the structures such as type, validation, default value etc.
 */
const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: [true, "Organization name is required"],
  },
  organizationWebsite: {
    type: Array,
    required: [true, "Organization name is required"],
  },
  organizationEmail: {
    type: String,
    required: [true],
  },
  organizationPhone: {
    type: String,
    required: [true],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Model is the place where define schema and now this model includes with the model methods (ex: find, insertOne || save)
const OrganizationModel = mongoose.model("Organization", organizationSchema);

module.exports = OrganizationModel;
