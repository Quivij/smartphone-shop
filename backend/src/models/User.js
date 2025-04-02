// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   // name: { type: String, required: true },
//   // email: { type: String, required: true, unique: true },
//   // password: { type: String, required: true },
//   // //   isAdmin:{type:Boolean, default:false, require:true},
//   // //   access_token:{type:String, require:true},
//   // //   refresh_token:(type:String, require:true),
//   // role: { type: String, enum: ["user", "admin"], default: "user" },
//   // createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
