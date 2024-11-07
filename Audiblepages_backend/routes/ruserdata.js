import express, { Router } from 'express';
const router=express.Router()
import {usersignup,userloginpage,verifyotp} from '../controllers/cusers.js';


router.post('/usersignup',usersignup );
router.post('/verifyotp',verifyotp);
router.post('/userloginpage',userloginpage);


export default router;