import app from './app.js'
import { conexionDB } from './db.js'

const puerto = 3000;

conexionDB();

app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto", puerto);
})
