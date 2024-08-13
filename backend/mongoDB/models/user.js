import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: false,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
