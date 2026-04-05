const Record = require("../models/record.model");
const { success } = require("../utils/responseHandler");

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // income and expense
    const totals = await Record.aggregate([
      {
        $match: {
          user: userId,
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    totals.forEach((item) => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpense = item.total;
    });

    const netBalance = totalIncome - totalExpense;

    // categry
    const categoryTotals = await Record.aggregate([
      {
        $match: {
          user: userId,
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    // transaction
    const recentTransactions = await Record.find({
      user: userId,
      isDeleted: false,
    })
      .sort({ date: -1 })
      .limit(5);

    // res
    success(res, "Dashboard fetched successfully", {
      totalIncome,
      totalExpense,
      netBalance,
      categoryTotals,
      recentTransactions,
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };