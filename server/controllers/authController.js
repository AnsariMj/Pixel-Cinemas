const User = require("./../models/user");
const asyncHandler = require("express-async-handler");
const { default: axios } = require("axios");
const sendEmail = require("../services/sendEmail")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User Registration Route
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, phoneNumber, username, selectedGenres } = req.body;
  if (!email || !password || !phoneNumber || !username || !selectedGenres) {
    return res.status(400).json({
      message: "Please provide correct credentials",
    });
  }

  // check if that email user already exist or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "user with this email already exist",
    });
  }
  // const token = GenerateToken(userFound._id)
  //Else create a new user and add it to the list of users
  await User.create({
    userName: username,
    userPhoneNumber: phoneNumber,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
    selectedGenres: selectedGenres,
  });
  res.status(200).json({
    message: "User Registration Successfully",
    // token: token
  });
});

// User Login Route
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: " Please provide correct Email and Password",
    });
  }

  //check if email is already exits or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User with this email is not Registered",
    });
  }

  // Password check
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
  if (isMatched) {
    //generate  token
    const token = GenerateToken(userFound[0]._id);

    userFound[0].token = token;
    await userFound[0].save();

    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } else {
    res.status(404).json({
      message: "Invalid password",
    });
  }
});

//Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Invalid email"
    })
  }

  const userExists = await User.find({ userEmail: email })
  if (userExists.length == 0) {
    return res.status(404).json({
      message: "User does not exist with provided email"
    })
  }

  //Generating random otp
  const otp = Math.floor(1000 + Math.random() * 9000)

  const expirationTimeSeconds = 300;
  const expirationTimestamp = Date.now() + expirationTimeSeconds * 1000;

  userExists[0].otp = otp;
  userExists[0].otpExpiration = expirationTimestamp;
  await userExists[0].save();
  await sendEmail({
    email: email,
    subject: 'Your OTP for Pixel Cinemas forgot password\n\n',
    message: `Your OTP is ${otp}.\n It will expire in ${expirationTimeSeconds / 60} minutes.\n Don't share this OTP with others.`
  })

  res.status(200).json({
    message: "OTP Send Successfully",
    otp: `${otp}`
  })
})



//Verifying OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: 'Please enter your email address and otp'
    })
  }
  const userExists = await User.find({ userEmail: email })
  if (!userExists || userExists.length === 0) {
    return res.status(404).json({
      message: 'Email Address is not Registered'
    })
  }

  if (userExists[0].otp != otp) {
    res.status(404).json({
      message: 'Please enter valid OTP'
    })
  } else {
    // dispose the otp so cannot be used next time the same otp
    userExists[0].otp = undefined
    userExists[0].isOtpVerified = true //true
    await userExists[0].save()
    res.status(200).json({
      message: "OTP is correct"
    })
  }

})



//  Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(401).json({
      message: "Please provide email,newPassword,confirmPassword"
    })
  }

  if (newPassword !== confirmPassword) {
    return res.status(401).json({
      message: " newPassword and confirmPassword must be the same"
    })
  }

  const userExists = await User.find({ userEmail: email })
  if (userExists.length == 0) {
    return res.status(404).json({
      message: "User Email is not registered"
    })

  }
  if (userExists[0].isOtpVerified !== true) {  //true
    return res.status(403).json({
      message: "You cannot perform this action"
    })
  }
  userExists[0].userPassword = bcrypt.hashSync(newPassword, 10)
  userExists[0].isOtpVerified = false //false
  await userExists[0].save();

  res.status(200).json({
    message: "Password changed successfully "
  })



})




// To Check Whether the user have token or not
const authRole = asyncHandler(async (req, res) => {
  res.status(200).json({
    role: req.user.role,
  });
});

// Get the user details
const user = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get the user details
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete User Route
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(200).json({
      message: "User deleted successfully",
    });
  }
});

//get user details by id

const getUserId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (error) { }
});

//khalti payment
const khaltiPayment = asyncHandler(async (req, res) => {
  const { seatId, amount } = req.body;
  if (!seatId || !amount) {
    return res.status(400).json({
      message: " Please Provide amount and movie id",
    });
  }

  const payload = {
    return_url: "http://localhost:5173/#/success",
    website_url: "http://localhost:5173",
    amount: amount * 100,
    purchase_order_id: seatId,
    purchase_order_name: "Movie Name",
  };

  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: "key eb0e734c13ce40e69ff06dfd7fc188da",
        "Content-Type": "application/json",
      },
    }
  );
  res.send(response.data);
});

const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
};
module.exports = {
  registerUser,
  userLogin,
  forgotPassword,
  verifyOtp,
  resetPassword,
  authRole,
  user,
  getUser,
  deleteUser,
  getUserId,
  khaltiPayment,
};
