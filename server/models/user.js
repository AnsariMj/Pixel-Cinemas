const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, " UserName must be provided"],
    },
    userPassword: {
      type: String,
      required: [true, "Please provide username "],
      minLength: 8,
    },
    userEmail: {
      type: String,
      required: [true, " UserEmail must be provided"],
      unique: true,
      lowercase: true,
    },
    userPhoneNumber: {
      type: String,
      required: [true, "PhoneNumber must be provided"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: {
      type: String,
    },
    selectedGenres: {
      type: [String],

    },
    details: [
      {
        type: Object,
      },
    ],
    otp: {
      type: Number,
      select: true,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
      select: true,
    },


  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
