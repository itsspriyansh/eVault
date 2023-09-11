import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { name, password, email } = req.body;

    const existingUser = await prismadb.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
        emailVerified: new Date(),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
