//This works as a router to accomdate and execution of  every fncn 
// through routing them where they are needed

import express from 'express';
import { getAllUser, login, signup} from '../controllers/user-controller';

const router = express.Router();

router.get("/",getAllUser)
router.post("/signup",signup)
router.post("/login",login)

export default router;