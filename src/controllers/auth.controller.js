import { conexion } from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import clavesecreta from "../config.js";

console.log("Clave secreta", clavesecreta);

export const register = async (req, res) => {
    let { correo, nombre, clave } = req.body;

    let claveHash = await bcrypt.hash(clave, 10);

    
    conexion.query("INSERT INTO usuario (correo, nombre, clave) VALUES (?,?,?)", [correo, nombre, claveHash], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ "Status": "Error al registrar" });
        }
        
        return res.status(200).json({ "Status": "Registrado con éxito" });
    });
};

export const login = (req, res) => {
    let { correo, clave } = req.body;

    conexion.query("SELECT * FROM usuario WHERE correo = ?", [correo], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ "Status": "Error al iniciar sesión" });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ "Status": "Credenciales incorrectas" });
        }

        let claveAlmacenada = results[0].clave;

        if (bcrypt.compareSync(clave, claveAlmacenada)){
            const payload = {
                id: results[0].id,
                check: true
              };
  
              const token = jwt.sign(
                  payload,
                  clavesecreta,
                  {
                      expiresIn: "7d",
                  },
                  (error, token) => {
  
                  if (error){
                      console.log(error);
                  }
                      
                  console.log(token);
  
                  res.cookie("token", token, {
                      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  });
                  
                  console.log("a");
  
                  res.json({
                    mensaje: "Autentificacion existosa",
                    token: token,
                });
            }
              );
            }else{
                res.status(401).json({ "Status": "Credenciales incorrectas" });
        }
    });
};

export const info = (req, res) => {
    conexion.query("SELECT * FROM usuario", (error, resultado) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el servidor" });
      }
  
      return res.status(200).json({ usuarios: resultado });
    });
  }
  