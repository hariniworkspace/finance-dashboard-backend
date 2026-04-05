const Record = require("../models/record.model");
const ROLES = require("../constants/roles");


const createRecord = async (user, data) => {
  if (user.role === ROLES.VIEWER) {
    throw new Error("Viewers cannot create records");
  }

  const record = await Record.create({
    ...data,
    user: user._id,
  });

  return record;
};


const getRecords = async (user, query) => {
  let filter = { isDeleted: false };

  
  if (user.role !== ROLES.ADMIN) {
    filter.user = user._id;
  }

  
  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  const records = await Record.find(filter).sort({ date: -1 });

  return records;
};


const updateRecord = async (user, recordId, data) => {
  const record = await Record.findById(recordId);

  if (!record || record.isDeleted) {
    throw new Error("Record not found");
  }

  
  if (
    user.role !== ROLES.ADMIN &&
    record.user.toString() !== user._id.toString()
  ) {
    throw new Error("Not authorized to update this record");
  }

  Object.assign(record, data);
  await record.save();

  return record;
};


const deleteRecord = async (user, recordId) => {
  const record = await Record.findById(recordId);

  if (!record || record.isDeleted) {
    throw new Error("Record not found");
  }

  if (
    user.role !== ROLES.ADMIN &&
    record.user.toString() !== user._id.toString()
  ) {
    throw new Error("Not authorized to delete");
  }

  record.isDeleted = true;
  await record.save();

  return { message: "Record deleted successfully" };
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
};