import express from 'express'
import {getUsers,getUser,updateUsre,deleteUser} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyjwt.js';
const router=express.Router();

router.get('/',getUsers);
router.get('/:id',verifyToken,getUser);
router.put('/:id',verifyToken,updateUsre);
router.delete('/:id',verifyToken,deleteUser);


export default router;