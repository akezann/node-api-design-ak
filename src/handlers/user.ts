import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.uSER.create({
    data: {
      name: req.body.name,
      password: hashPassword(req.body.password),
    },
  });
  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.uSER.findUnique({
    where: {
      name: req.body.name,
    },
  });

  const isValid = await comparePassword(req.body.password, user?.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "password not valid or wrong username" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
