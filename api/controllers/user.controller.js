import prisma from '../lib/prisma.js';

export const getUsers = async(req,res)=>{
 try{
    const users = await prisma.user.findMany();
    res.status(200).json({users:users});
 }
 catch(err)
 {
    console.log(err);
    res.status(500).send({message:"Failed To get users"})
 }

}

export const getUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await prisma.user.findUnique(
         {
            where: {
              id: id,
            },
          }
      );
        res.status(200).json({user:user});
   
    }
    catch(err)
    {
       console.log(err);
       res.status(500).send({message:"Failed To get user"})
    }
   
   }


   export const updateUsre = async(req,res)=>{

      // take user id from url
      const id = req.params.id;

      //check with cookies token which we have passed in req.token 
      const cookieId = req.userId;
      
      if(cookieId !== id)
      {
         return res.status(403).send({message:"Not Authorized"}); 
      }
   try{
      const data = req.body;
      const updatedUser = await prisma.user.update({
         where : {id : id},
         data:data,
      })
      console.log(updatedUser)      
   }
    catch(err)
    {
       console.log(err);
       res.status(500).send({message:"Failed To update users"})
    }
   
   }

   export const deleteUser = async(req,res)=>{
    try{
   
    }
    catch(err)
    {
       console.log(err);
       res.status(500).send({message:"Failed To Delete user"})
    }
   
   }