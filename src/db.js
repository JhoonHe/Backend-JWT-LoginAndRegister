import mysql from 'mysql2';

export let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'prueba_db'
});

export let conexionDB = () => {
    conexion.connect((error) => {
        if (error) {
            console.error("Error al conectar con la db", error);
        }

        console.log("Conexión establecida con la base de datos");
    });
}