const Record = require("../models/record.model");
const { success } = require("../utils/responseHandler");

// ✅ CREATE RECORD (Admin only ideally)
const createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, note, date } = req.body;

    if (!amount || !type || !category) {
      const err = new Error("Amount, type, and category are required");
      err.statusCode = 400;
      return next(err);
    }

    const record = await Record.create({
      amount,
      type,
      category,
      note,
      date,
      user: req.user._id,
    });

    success(res, "Record created successfully", record, 201);
  } catch (err) {
    next(err);
  }
};

// ✅ GET RECORDS (with filtering 🔥)
const getRecords = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate, page, limit } = req.query;

    let filter = {
      user: req.user._id,
      isDeleted: false,
    };

    // 🔍 Filtering
    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // pagination
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 5;
    const skip = (pageNumber - 1) * limitNumber;

    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Record.countDocuments(filter);

    success(res, "Records fetched successfully", {
      total,
      page: pageNumber,
      limit: limitNumber,
      records,
    });

  } catch (err) {
    next(err);
  }
};
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Record.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      message: "Record updated successfully",
      data: updated,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// del of rec
const deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!record) {
      const err = new Error("Record not found");
      err.statusCode = 404;
      return next(err);
    }

    record.isDeleted = true;
    await record.save();

    success(res, "Record deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,   
  deleteRecord,
};