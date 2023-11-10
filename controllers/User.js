import User from '../model/User.js';
import getDataUri from '../utils/fileuri.js';
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import { sanitizeUser } from '../services/commonFunc.js';
import bcrypt from 'bcrypt';
// import { sanitizeUser } from '../services/commonFunc.js';
import jwt from 'jsonwebtoken';

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

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser)
      return res.status(409).json({ msg: 'User already Exists!' });

    // image upload to cloudinary
    const file = req.file;
    const fileUri = getDataUri(file);
    // console.log(fileUri);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    userData.img = myCloud.secure_url;
    // console.log(userData.img);

    // password hasing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    // console.log(hashedPassword);

    // create req
    const newUser = new User({ ...userData, password: hashedPassword });
    const savedUser = await newUser.save();

    // create session after signup -> this calls serializeUser and creates a session by passing this sanitizeUser
    // yha pe req.login session manually bnana pdega signup k vqt because loginUser krte vqt to vo passport strategy use krrha h but yha nhi.
    req.login(savedUser, (err) => {
      if (err) res.status(400).json(err);
      else {
        // console.log(savedUser);
        const token = jwt.sign(sanitizeUser(savedUser), process.env.SECRET_KEY);
        // console.log(token);
        res
          .cookie('jwt', token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          })
          .status(201)
          .json(sanitizeUser(savedUser));
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
export const loginUser = async (req, res) => {
  const user = req.user;
  console.log(req.user, 'in login user');
  res.cookie('login',req.user.token)
  res.cookie('jwt', req.user.token, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true
  });
  res.status(200).json(user); // req.user is created by passport automatically when user is authenticated
  // try {
  //   const existingUser = await User.findOne({ email: req.body.email });
  //   if (!existingUser) return res.status(404).json({ msg: 'User not found' });
  //   const passComp = await bcrypt.compare(
  //     req.body.password,
  //     existingUser.password
  //   );
  //   if (!passComp) {
  //     return res.status(401).json({ msg: 'invalid credentails' });
  //   }
  //   const user = { id: existingUser._id };
  //   const token = createJwt(user);
  //   // console.log(token);
  //   res.cookie('token', token, { httpOnly: true });
  //   return res.status(200).json({ msg: 'Logged in Successfull' });
  // } catch (error) {
  //   // console.log(error);
  //   res.status(500).json({ msg: error.msg });
  // }
};

export const logoutUser = async (req, res) => {
  // console.log('logout', req);
  req.cookies = null;
  // console.log('logout', req);
  res
    .cookie('jwt', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};
export const checkUser = async (req, res) => {
  // console.log(req);
  // res.status(200).json(req.user);
  try {
    // console.log(req);
    res.status(200).json(req.user);
  } catch (error) {
    // console.log(error);
    res.status(401).json({ msg: error.message });
  }
};
export const fetchUserById = async (req, res) => {
  // fetch user by userId
  try {
    console.log(req.user, 'fetuserbyid');
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
