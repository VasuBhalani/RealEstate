import jwt from 'jsonwebtoken';
export const shouldBeLoggedIn = (req, res) => {
     
   console.log('reqid ->',req.userId)
    
    res.status(200).json({message:"You are authenticated"});
}

export const shouldBeAdmin = (req, res) => {
     
    // verify token lay ne karvanu
    const token = req.cookies.token;
    console.log(token); 
    
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    jwt.verify(token,process.env.JWT_SECRET,async (err,payload) => {
        if(err) return res.status(403).json({message:'Token is invalid'});
    })
    
}
