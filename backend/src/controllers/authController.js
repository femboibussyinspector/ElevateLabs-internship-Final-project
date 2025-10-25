const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;
    user.verificationTokenExpires = Date.now() + 3600000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });


    const verificationLink = `http://localhost:3000/api/auth/verify/${token}`;
    const mailOptions = {
      from: '"OnlyPipe" <no-reply@onlypipe.com>',
      to: user.email,
      subject: 'Verify Your Email Address for OnlyPipe',
      html: `
        <p>Hi ${firstName},</p>
        
        <p>Thanks for signing up for OnlyPipe. To complete your registration, please verify your email address by clicking the link below.</p>
        
        <p>
          <a href="${verificationLink}" target="_blank">Verify Email Address</a>
        </p>
        
        <p>This verification link will expire in 1 hour.</p>
        
        <p>If the link above does not work, please copy and paste the following URL into your browser:</p>
        <p>${verificationLink}</p>
        
        <br>
        
        <p>If you did not create this account, you can safely ignore this email.</p>
        
        <p>
          Thank you,<br>
          The OnlyPipe Team
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", user.email);
    
    res.status(201).json({
      msg: 'User registered. Please check your email to verify your account.',
    });

  } catch (err) {
    console.error(err.message); 
    res.status(500).send('Server error');
  }
};