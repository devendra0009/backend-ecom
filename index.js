// const express=require('express')
import cors from 'cors';
import express from 'express';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import { dbConnect } from './dbConnect.js';
// import { createProduct } from './controllers/Product.js';
import productRouter from './routes/Product.js';
import userRouter from './routes/User.js';
import categoriesRouter from './routes/Category.js';
import brandsRouter from './routes/Brand.js';
import cartsRouter from './routes/Cart.js';
import ordersRouter from './routes/Order.js';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './model/User.js';
import {
  cookieExtractor,
  isAuth,
  sanitizeUser,
} from './services/commonFunc.js';
// import {JwtStrategy} from ('passport-jwt').Strategy;
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
import { loginUser } from './controllers/User.js';

// dotconfig
dotenv.config();
// console.log(process.env.SECRET_KEY);

// db connection
dbConnect();

// server connection
const server = express();

// creating jwt keys
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // this extract details from the bearer token
opts.jwtFromRequest = cookieExtractor; // this extract details from the bearer token from cookies
opts.secretOrKey = process.env.SECRET_KEY;

// clodinary
// console.log(process.env.CLOUD_CONFIG, 'hi');
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// cloudinary.v2.config({cloud_name: 'dap8lkkgr',api_key: '186324916488615',api_secret: 'd-JYnEvZwzHZF-0aQ2lVeAnTtn0'});

// middlewares **********

// cookie parser middleware so that req se cookie prd ske dhng se
server.use(cookieParser());

// put build of frontend in the server so that cors error na aae
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
server.use(express.static(path.join(__dirname, 'build')));

// session
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(passport.session()); // server.use(passport.authenticate('session')); -> both are same, actually this is authenticating the session made by express

//cors
let corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
server.use(
  cors({
    corsOptions,
    exposedHeaders: ['X-Total-Count'],
  })
);
server.use(express.json()); // to parse req body
server.use('/products', isAuth(), productRouter);
server.use('/users', userRouter);
server.use('/categories', isAuth(), categoriesRouter);
server.use('/brands', isAuth(), brandsRouter);
server.use('/carts', isAuth(), cartsRouter);
server.use('/orders', isAuth(), ordersRouter);

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // to enable react routing
});

// // Passport stategies
passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async function (
    // specify how to check the login auth
    username,
    password,
    done
  ) {
    try {
      console.log(username, password);
      const existingUser = await User.findOne({ email: username });
      console.log(existingUser, 'euse');
      if (!existingUser) {
        // console.log(existingUser);
        return done(null, false, { message: 'invalid credentials' }); // null means no error, false means no matchnig user found
        //     const error = new Error('Invalid credentials');
        // return done(error);
      }
      const passComp = await bcrypt.compare(password, existingUser.password);
      console.log(passComp);
      if (!passComp) {
        return done(null, false, { message: 'invalid credentials' });
      } else {
        const token = jwt.sign(
          sanitizeUser(existingUser),
          process.env.SECRET_KEY
        );
        // console.log(token, 'tpkem');
        return done(null, { ...sanitizeUser(existingUser), token });
      } // this existingUser passed to serializeUser then
    } catch (error) {
      // console.log(error);
      return done(error, false);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log(jwt_payload, 'jwtpayload');
    // opts is receiving the token and the secret key so it'll extract data from token and store it in jwt_payload
    try {
      const user = await User.findOne({ _id: jwt_payload.id });
      console.log(user);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      // console.log(error);
      return done(error, false);
    }
  })
);

// serializer -> receives the authenticated data from localStratefy and set attach it with req.session, also used to define what user information should be stored in the session, typically called once during the login process to determine what data from the user object should be stored in the session
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log('ser', user);
    return cb(null, user);
  });
});
// deserializer -> used to retrieve the user object from the session. It is called on every request made by the client
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log('des', user);
    return cb(null, user);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
