import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check if header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {
    console.log("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};