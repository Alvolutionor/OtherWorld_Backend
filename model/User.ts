import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address'],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
