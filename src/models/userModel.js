const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fav_books_id: {
    type: [],
  },
});

userSchema.plugin(AutoIncrement, { inc_field: "id" });

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
