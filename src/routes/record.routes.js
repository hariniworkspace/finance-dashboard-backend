const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/record.controller");

const {
  createRecordSchema,
  updateRecordSchema,
} = require("../validations/record.validation");

router.get("/", protect, authorizeRoles("analyst", "admin"), getRecords);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validate(createRecordSchema),
  createRecord
);


router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validate(updateRecordSchema),
  updateRecord
);


router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteRecord
);

module.exports = router;