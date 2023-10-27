import passport from 'passport';

// isAuth
export const isAuth = (req, res, done) => {
  // console.log('auth');
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
  // var token = null;
  // if (req && req.cookies) {
  //     // console.log("reqcokies",req,"reqcokies");
  //     token = req.cookies['jwt'].token;
  //     // console.log(token,"reqtokencokkie");
  // }
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2FhOTI4OGM5ZDRjYjQ0ZDM5ZjRlYiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4MzQzMjA4fQ.xlzWGmKzAWVAGFBSbu2XtOuIqPEp8ptTxMmuWKnt5W0'; // everythign depend on this which user to fetch depend on this token hence it should be fetched from cookies
  // return token;
};
