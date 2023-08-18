import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = (req, res, next) => {
  let { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized access' })
  }
  try {
    // obtenemos el prefijo y el token.
    let [type, token] = authorization.split(" ");
    // validamos que el prefijo sea Bearer o Tolen
    if (type === 'Bearer' || type === "Token") {
      // validamos con el SECRET que el token sea valido
      jwt.verify(token, process.env.SECRET,(err,dedcode)=>{
        if (err) {
          
        }
        console.log(dedcode);
      });

      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized access' })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'we have an error' })
  }

}