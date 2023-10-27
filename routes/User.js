import express from 'express';
import {
  checkUser,
  createUser,
  deleteUserById,
  fetchAllUsers,
  fetchUserByEmail,
  fetchUserById,
  updateUserById,
} from '../controllers/User.js';
import userImgUpload from '../middleware/userImage.js';
import passport from 'passport';
import { isAuth } from '../services/commonFunc.js';
const router = express.Router();

router.get('/', isAuth(), fetchAllUsers);
router.post('/login', passport.authenticate('local'), fetchUserByEmail);
router.get('/check', passport.authenticate('jwt'), checkUser); // checks if jwt token is authenticated for the user first
router.get('/own',isAuth(), fetchUserById);
router.post('/', userImgUpload, createUser);
router.patch('/:id', isAuth(), updateUserById);
router.delete('/:id', isAuth(), deleteUserById);

export default router;
