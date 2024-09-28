import express from 'express';
const router=express.Router();

router.get('/',(req,res)=>{
    console.log('hello this is my post');
    res.send('leloaded')
})

export default router;