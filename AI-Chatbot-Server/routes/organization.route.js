const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

// enable files upload
router.use(
  fileUpload({
    createParentPath: true,
  })
);

// controller
const organizationController = require("../controllers/organization.controller");

router
  .route("/uploadKnwoledge")
  .post(organizationController.uploadKnowledgeBase);

router
  .route("/addNewOrganization")
  .post(organizationController.addNewOrganization);

router
  .route("/getAllOrganizations")
  .get(organizationController.getAllOrganizationList);

router
  .route("/addNewTrainingModel")
  .post(organizationController.addNewtrainingModelForOrganization);
router
  .route("/getAllTrainedList")
  .get(organizationController.getAllTrainingListData);

router
  .route("/generateCompletion")
  .post(organizationController.generateCompletion);
module.exports = router;
