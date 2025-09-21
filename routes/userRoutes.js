import * as userController from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.post('/register',userController.register);
router.get("/signin",userController.signin);
router.patch("/forgetPassword",userController.forgetPassword);

export default router;