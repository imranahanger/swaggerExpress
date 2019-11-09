import express from 'express';
import userController from './user.controller';

export const userRouter = express.Router();
userRouter.post('/signUp', userController.signup)
userRouter.post('/login', userController.login)