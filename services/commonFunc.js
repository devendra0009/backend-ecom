import passport from 'passport';
// import jwt from 'jsonwebtoken';

// isAuth
export const isAuth = (req, res, done) => {
  return passport.authenticate('jwt'); // authenticate the jwt strategy means check the bearer token if it is valid or not
  //   console.log(req.user);
  //   if (req.user) {
  //     done();
  //   } else {
  //     res.status(401).json({ msg: 'Unauthorized' });
  //   }
};

// sanitize user to only return specific reqd field
export const sanitizeUser = (user) => {
  // console.log(user);
  return { id: user._id, role: user.role };
};

export const cookieExtractor = function (req) {
  var token = null;
  console.log("reqstart",req.cookies,req.cookie,"reqover");
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
  // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2FhOTI4OGM5ZDRjYjQ0ZDM5ZjRlYiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4MzQzMjA4fQ.xlzWGmKzAWVAGFBSbu2XtOuIqPEp8ptTxMmuWKnt5W0'; // everythign depend on this which user to fetch depend on this token hence it should be fetched from cookies
  // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2Q1NjAxNmE4OWNiMGNmZGVhNWMzZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODU2Nzc2OX0.iMRCs_-w3q2Cuu4E2_x9QcsEXLo9iLz7w0YxPjUN2hM'; 
};

// export const createJwt = (user) => {
//   console.log(user);
//   return jwt.sign(user, 'secret_key', { expiresIn: '1h' });
// };

// export const verifyToken = (req, res, next) => {
//   // console.log(req);
//   const token = req.cookies.token;
//   console.log(token,"tkn");
//   if (!token) return res.status(401).send('Access Denied');
//   try {
//     const verified = jwt.verify(token, 'secret_key');
//     console.log(verified, 'verified');
//     // req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid Token');
//   }
// };
