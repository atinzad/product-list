const { Schema, model } = require("mongoose");

const isEmailValid = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, validate: isEmailValid },
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
