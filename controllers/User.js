import User from '../model/User.js';
import getDataUri from '../utils/fileuri.js';
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sanitizeUser } from '../services/commonFunc.js';
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'SECRET_KEY';

export const fetchAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.send({ status: 200, data: data });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    // image upload to cloudinary
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    userData.img = myCloud.secure_url;
    // console.log(userData.img);

    // password hasing
    // const salt = crypto.randomBytes(128).toString('base64');
    // const hashedPassword = crypto.pbkdf2Sync(userData.password, salt, 10000, 512, 'sha512');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    // console.log(hashedPassword);

    // create req
    const newUser = new User({ ...userData, password: hashedPassword });
    const savedUser = await newUser.save();
    delete savedUser['password']; // cuz i dont wanna pass it to frontend

    // create session after signup -> this calls serializeUser and creates a session by passing this sanitizeUser
    req.login(savedUser, (err) => {
      if (err) res.status(400).json(err);
      else {
        console.log(savedUser);
        const token = jwt.sign(sanitizeUser(savedUser), SECRET_KEY);
        // console.log(token);
        res
          .cookie('jwt', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          })
          .status(201)
          .json({ token });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateUserById = async (req, res) => {
  try {
    const userUpdatedData = req.body;
    const { id } = req.params;
    console.log(userUpdatedData, id);
    const updatedUser = await User.findByIdAndUpdate(id, userUpdatedData, {
      new: true,
    });
    res.send({ status: 200, data: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.send({ status: 200, data: deletedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const fetchUserByEmail = async (req, res) => {
  // console.log(req);
  // console.log(req,"hi");
  try {
    res
      .cookie('jwt', req.user, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(200)
      .json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:error.msg})
  }
};
export const checkUser = async (req, res) => {
  console.log(req.user);
  // res.status(200).json(req.user);
  try {
    // console.log(req);
    res.status(200).json({ data: req.user });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ msg: error.message });
  }
};
export const fetchUserById = async (req, res) => {
  // fetch user by userId
  try {
    console.log(req.user,"fetuserbyid");
    const { id } = req.user;
    const existingUser = await User.findById(id);
    if (!existingUser) res.status(404).json({ msg: 'User not Exists' });
    else {
      delete existingUser.password;
      res.status(200).json({ data: existingUser });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const res = await User.deleteMany({});
    res.send({ status: 200, data: res });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
