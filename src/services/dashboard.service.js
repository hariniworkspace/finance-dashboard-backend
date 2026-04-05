const Record = require("../models/record.model");
const ROLES = require("../constants/roles");


const getDashboard = async (user) => {
  let matchStage = { isDeleted: false };

  
  if (user.role !== ROLES.ADMIN) {
    matchStage.user = user._id;
  }

  
  const stats = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
  ]);

  const totals = stats[0] || { totalIncome: 0, totalExpense: 0 };
  const netBalance = totals.totalIncome - totals.totalExpense;

  
  const categoryData = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          category: "$category",
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: "$_id.category",
        income: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0],
          },
        },
      },
    },
    { $sort: { expense: -1 } },
  ]);

  
  const monthlyTrend = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        income: 1,
        expense: 1,
      },
    },
  ]);

  
  const recent = await Record.find(matchStage)
    .sort({ createdAt: -1 })
    .limit(5)
    .select("-isDeleted");

  return {
    totals: {
      ...totals,
      netBalance,
    },
    categoryData,
    monthlyTrend,
    recent,
  };
};

module.exports = { getDashboard };