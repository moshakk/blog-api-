const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['Tell Us Your Name', true],
  },
  email: {
    type: String,
    required: ['Email Is required', true],
    unique: true,
    lowercase: true,
    Validate: [validator.isEmail, 'Please Provide a Valid Email'],
  },
  photo: String,
  password: {
    type: String,
    required: ['Password Is required', true],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: ['Password Is required', true],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords Are Not The same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePasswprd,
  userPassword
) {
  return await bcrypt.compare(candidatePasswprd, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimeTamp) {
  if (this.passwordChangedAt) {
    const changeTimeTamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeTamp < changeTimeTamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpired = Date.now() + 10 * 60 * 100;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
