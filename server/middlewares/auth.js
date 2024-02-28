const JWT = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decodedToken = await JWT.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user.id;
    req.userId = userId;

    next();
  } catch (error) {
    return res.status(400).json({ message: error, status: "invalidToken" });
  }
};

module.exports = { authenticateUser };
