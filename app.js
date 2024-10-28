// app.js

const express = require("express");
const db = require("./db"); 
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Departamentos y Municipios de Colombia");
});

app.get("/departamentos", (req, res) => {
  db.query("SELECT * FROM departamentos", (error, results) => {
    if (error) {
      res.status(500).send("Error al obtener los departamentos");
    } else {
      res.json(results);
    }
  });
});

app.get("/departamentos/:id/municipios", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM municipios WHERE departamento_id = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error al obtener los municipios");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/municipios/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT m.*, d.nombre AS departamento_nombre FROM municipios m JOIN departamentos d ON m.departamento_id = d.id WHERE m.id = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error al obtener la información del municipio");
      } else {
        res.json(results[0]);
      }
    }
  );
});

app.get("/departamentos/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM departamentos WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        res.status(500).send("Error al obtener la información del departamento");
      } else {
        res.json(results[0]);
      }
    }
  );
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


//Utiliza herramientas como Postman o cURL para probar las rutas:
//GET /api/departamentos: Obtiene la lista de departamentos.
//GET /api/departamentos/:id/municipios: Obtiene los municipios de un departamento.
//GET /api/municipios/:id: Obtiene la información de un municipio y su departamento.
