const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const email = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statuscode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure:true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statuscode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  createSendToken(user, 201, res);
  // const token = signToken(user._id);
  // res.status(201).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user,
  //   },
  // });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provid a valid Email or password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }
  createSendToken(user, 200, res);
  //const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user,
  //   },
  // });
});
exports.protect = catchAsync(async (req, res, next) => {
  //1- Getting token and check if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('please log in to get access', 401));
  }
  //2-verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3- check if user exist
  const user = await User.findById(decode.id);
  if (!user) {
    return next(
      new AppError(
        'The User Belong to this Token is No Longer Exist Log in again',
        401
      )
    );
  }
  //4-check if user change password after token was issued
  if (user.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError(
        `User Recenlty changed The Passwprd please log in again`,
        401
      )
    );
  }
  req.user = user;
  next();
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  //1)Find user by the email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There Is User Exist with this email', 404));
  }
  //2) generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //3)Send the email to user
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetpassword/${resetToken}`;
  const message = `Forget Your password? submit A patch request with your new password and confirm password to
    ${resetURL}.\nif you do not forget your password please ignore message`;

  try {
    sendEmail({
      email: req.body.email,
      subject: 'Your password reset token valid for 10 min',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token Send To The Email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined;
    console.log(err);
    return next(
      new AppError(`There Was An Error Sending Email Try Again`, 500)
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) Get the User based on the token
  const token = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpired: { $gt: Date.now() },
  });
  //2)check the resetToken that come from the request with the hashed token IN DB
  if (!user) {
    return next(new AppError(`Invalid Token Or Expired`, 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.PasswordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();
  //4) log the user in , send jwt back
  createSendToken(user, 200, res);
  //2)
});
