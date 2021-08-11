const crypto = require("crypto");
const salt = "secret";

module.exports = passHash = (password) => {
  const hashedPassword = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return hashedPassword;
};
