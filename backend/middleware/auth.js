// to secure our routes or to protect routes that require authentication;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()
// to check whether the request coming into our server is authorized or not;
function isAuth(req, res, next) {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    {
      req.isAuth = false;
      return next();
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    req.isAuth = true;
    next();
  } catch (ex) {
    req.isAuth = false;
    next();
  }
}

export default isAuth;