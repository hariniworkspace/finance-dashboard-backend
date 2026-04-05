const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/user.model");

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await User.deleteMany();
    console.log("Old users removed");

    const users = [
      {
        name: "Admin User",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Analyst User",
        email: "analyst@gmail.com",
        password: "123456",
        role: "analyst",
      },
      {
        name: "Viewer User",
        email: "viewer@gmail.com",
        password: "123456",
        role: "viewer",
      },
    ];

    for (const user of users) {
      await User.create(user); 
    }

    console.log("Users seeded successfully ✅");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedUsers();