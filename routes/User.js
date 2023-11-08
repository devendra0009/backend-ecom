import express from 'express';
import {
  checkUser,
  createUser,
  deleteUserById,
  fetchAllUsers,
  fetchUserById,
  loginUser,
  logoutUser,
  updateUserById,
} from '../controllers/User.js';
import userImgUpload from '../middleware/userImage.js';
import passport from 'passport';
import { isAuth } from '../services/commonFunc.js';
const router = express.Router();

// router.get('/', verifyToken, fetchAllUsers);
router.get('/', isAuth(), fetchAllUsers);
router.post('/login', passport.authenticate('local'), loginUser);
router.post('/logout', logoutUser);
// router.post('/login', loginUser);
router.post('/', userImgUpload, createUser);
router.get('/check', passport.authenticate('jwt'), checkUser); // checks if jwt token is authenticated for the user first
// router.get('/check',verifyToken, checkUser); 
// router.get('/own', verifyToken, fetchUserById);
router.get('/own',isAuth(), fetchUserById);
// router.patch('/:id', verifyToken, updateUserById);
router.patch('/:id', isAuth(), updateUserById);
// router.delete('/:id', verifyToken, deleteUserById);
router.delete('/:id', isAuth(), deleteUserById);

export default router;
