// const express=require('express')
import cors from 'cors';
import express from 'express';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import PORT from './constants.js';
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
// import JwtStrategy from ('passport-jwt').Strategy;
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// db connection
dbConnect();
// server connection
const server = express();

// creating jwt keys
const SECRET_KEY = 'SECRET_KEY';

// jwt secret keys
const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // this extract details from the bearer token
opts.jwtFromRequest = cookieExtractor; // this extract details from the bearer token from cookies
opts.secretOrKey = SECRET_KEY;

// clodinary
cloudinary.v2.config({
  cloud_name: 'dap8lkkgr',
  api_key: '186324916488615',
  api_secret: 'd-JYnEvZwzHZF-0aQ2lVeAnTtn0',
});

// middleware

// cookie parser middleware so that req se cookie prd ske dhng se
server.use(cookieParser());

// put build of frontend in the server so that cors error na aae
server.use(express.static('build'));

//session
server.use(
  session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
server.use(passport.initialize());
server.use(passport.session());
// server.use(passport.authenticate('session'));

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

// server.get('/', (req, res) => {
//   res.json({ status: 'success' });
// });

// Passport stategies
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
      if (!existingUser) {
        console.log(existingUser);
        return done(null, false, { message: 'invalid credentials' }); // null means no error, false means no matchnig user found
    //     const error = new Error('Invalid credentials');
    // return done(error);
      }
      const passComp = await bcrypt.compare(password, existingUser.password);
      if (!passComp) {
        return done(null, false, { message: 'invalid credentials' });
      } else {
        const token = jwt.sign(sanitizeUser(existingUser), SECRET_KEY);
        console.log(token, 'tpkem');
        return done(null, { token });
      } // this existingUser passed to serializeUser then
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload, jwt_payload.id, 'jwtpayload');
    try {
      const user = await User.findOne({ _id: jwt_payload.id });
      // console.log(user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log(error);
      return done(err, false);
    }
  })
);

// serializer -> receives the authenticated data from localStratefy and set attach it with req.session, also used to define what user information should be stored in the session, typically called once during the login process to determine what data from the user object should be stored in the session
passport.serializeUser(function (token, cb) {
  process.nextTick(function () {
    console.log('ser', token);
    return cb(null, sanitizeUser(token));
  });
});
// deserializer -> used to retrieve the user object from the session. It is called on every request made by the client
passport.deserializeUser(function (token, cb) {
  process.nextTick(function () {
    console.log('des', token);
    return cb(null, token);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
