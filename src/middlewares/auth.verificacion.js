import express from 'express';
import jwt from 'jsonwebtoken';
import clavesecreta from '../config.js';

export const verificacion = express.Router();

verificacion.use((req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      error: "Es nesesario el token de autentificacion",
    });
    return;
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
    console.log(token);
  }

  if (token) {
    jwt.verify(token, clavesecreta, (error, decoded) => {
      if (error) {
        return res.json({
          mensaje: "El token no es valido",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});