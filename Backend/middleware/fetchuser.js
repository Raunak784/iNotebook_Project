const jwt = require('jsonwebtoken');
const JWT_SECRET = "Raunakdetailssavefromscammmers"
const fetchuser =(req, res, next)=>{
    // Get the user from Jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authenticate a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({error: "please authenticate a valid token"})
    }
    //Token me se data wapis retrieve (lena) ho to
   
}


module.exports = fetchuser;