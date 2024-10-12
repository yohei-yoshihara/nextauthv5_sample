"use server";

import db from "@/app/lib/db";
import bcrypt from "bcryptjs";

async function generateHashedPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

export async function getUser(username: string) {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

export async function createUser(
  username: string,
  password: string,
  role: string
) {
  await db.user.create({
    data: {
      username: username,
      password: await generateHashedPassword(password),
      role: role,
    },
  });
}
