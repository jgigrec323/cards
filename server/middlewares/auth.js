const JWT = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const user = await JWT.verify(token, process.env.JWT_SECRET);
    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateUser };
