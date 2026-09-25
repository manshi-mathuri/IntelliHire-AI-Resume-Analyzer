const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


async function registerUser(req, res) {

  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  const newUser = await UserModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    otp: otp,
    otpExpires: otpExpires
  });
  try {
    const info = await transporter.sendMail({
      from: `"IntelliHire" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your IntelliHire email",
      text: `Your IntelliHire verification OTP is ${otp}. It is valid for 5 minutes.`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #ddd; border-radius: 10px;">
        
        <h2 style="color: #2563eb; text-align: center;">
          IntelliHire
        </h2>

        <p>Hello ${name},</p>

        <p>
          Thank you for creating your IntelliHire account.
        </p>

        <p>
          Your email verification OTP is:
        </p>

        <h1 style="text-align: center; letter-spacing: 8px; color: #2563eb;">
          ${otp}
        </h1>

        <p>
          This OTP is valid for <strong>5 minutes</strong>.
        </p>

        <p>
          If you did not create this account, you can safely ignore this email.
        </p>

        <p>
          Regards,<br>
          IntelliHire Team
        </p>

      </div>
    `
    });

    console.log("Email sent:", info.response);
  }
  catch (error) {
    console.log("Email sending failed:", error);
  }
  return res.status(201).json({
    message: "User registered successfully"
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  if (!user.isVerified) {
    return res.status(400).json({
      message: "Please verify your email first"
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }

  const token = jwt.sign(
    {
      userId: user._id
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    message: "Login successful",
    token: token
  });
}
async function verifyOTP(req, res) {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  if (user.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP"
    });
  }

  if (user.otpExpires < new Date()) {
    return res.status(400).json({
      message: "OTP expired"
    });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return res.status(200).json({
    message: "Email verified successfully"
  });
}
async function resendOTP(req, res) {
  const { email } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  await user.save();

   await transporter.sendMail({
    from: `"IntelliHire" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your new IntelliHire verification OTP",
    text: `Your new IntelliHire verification OTP is ${otp}. It is valid for 5 minutes.`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #ddd; border-radius: 10px;">

      <h2 style="color: #2563eb; text-align: center;">
        IntelliHire
      </h2>

      <p>Hello ${user.name},</p>

      <p>
        Here is your new email verification OTP:
      </p>

      <h1 style="text-align: center; letter-spacing: 8px; color: #2563eb;">
        ${otp}
      </h1>

      <p>
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <p>
        If you did not request this OTP, you can safely ignore this email.
      </p>

      <p>
        Regards,<br>
        IntelliHire Team
      </p>

    </div>
  `
  });

  return res.status(200).json({
    message: "New OTP sent successfully"
  });
}

async function getProfile(req, res) {
  const user = await UserModel.findById(req.userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.status(200).json({
    name: user.name,
    email: user.email
  });
}
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  verifyOTP,
  resendOTP
};