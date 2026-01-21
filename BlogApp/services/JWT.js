import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET;
export const createToken = (data, expireIn = '1h') => {
  return jwt.sign(
    {
      id: data._id,
      name: data.name,
      email: data.email,
      username: data.username,
      image: data.profile_image,
      createdAt: data.createdAt,
    },
    SECRET,
    { expiresIn: expireIn }
  );
};

export const getTokenData = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null; // Return null if token is invalid or expired
  }
};
