const jwt = require('jsonwebtoken');
exports.varifyToken = (request,response,next)=>{
  try{
      if(!request.headers.authorization)
      return response.status(401).send('authorization failed');
       if(request.headers.authorization===null)
       return response.status(401).send('authorization failed');
     // let token = request.headers.authorization.split(" ")[1];
           let token = request.headers.authorization;
 
     let payload=jwt.verify(token,'jkfhsdjfskfdsjfsddv');

      console.log(payload);
      next();
  }
  catch(err){
    return response.status(401).send('authorization failed');

  }
}