import jwt, { Secret } from "jsonwebtoken";
import bcrypt from 'bcrypt'


export const comparePassword = (password: any, hash: any) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password: any) => {
    return bcrypt.hash(password, 5)
}
export const createJWT = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET || "ak_berkane93"
  );
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "not valid token o" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "ak_berkane93");
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
