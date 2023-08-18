import {
  SECRET_PASS,
} from '../configs/constantes.js';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Acceso no autorizado' })
  }
  try {
    // obtenemos el prefijo y el token.
    let [type, token] = authorization.split(" ");
    // validamos que el prefijo sea Bearer o Tolen
    if (type === 'Bearer' || type === "Token") {
      // validamos con el SECRET que el token sea valido
      jwt.verify(token, SECRET_PASS, (err, dedcode) => {
        if (err) {
          // Si el token no es válido.
          return res.status(401).json({ message: 'Acceso no autorizado' })
        }
      });
      next();
    } else {
      return res.status(401).json({ message: 'Acceso no autorizado' })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ocurrió un error' })
  }

}