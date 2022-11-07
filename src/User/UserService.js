const bcrypt = require("bcryptjs");
const User = require("./User");

const save = async (body) => {
  const { username, email, password } = body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = {
    username,
    email,
    password: hashedPassword,
  };

  await User.create(user);
};

module.exports = { save };
