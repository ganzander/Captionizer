const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  videos: {
    type: Array,
    default: [],
  },
});

const User = models?.User || model("User", userSchema);
export default User;
