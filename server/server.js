const express = require("express");
const bodyParser = require("body-parser");
var urlEncodeParser = bodyParser.urlencoded({ extended: true });


const { ServerApiVersion, MongoClient, ObjectId } = require("mongodb");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

//ponerlo en .env
const firebaseConfig = {
  apiKey: "AIzaSyByPdmDGUvprnHDqc_mMrS3E3yyY-ysYnE",
  authDomain: "proyectotecemergentes.firebaseapp.com",
  projectId: "proyectotecemergentes",
  storageBucket: "proyectotecemergentes.appspot.com",
  messagingSenderId: "220464706245",
  appId: "1:220464706245:web:2aad4172d90c6a5941f6ac",
};

const cors = require("cors");

const app = express();
app.use(urlEncodeParser);
app.use(cors());
app.options("*", cors());

const firebaseApp = initializeApp(firebaseConfig);

let port = 3001;

//ponerlo en .env
const uri =
  "mongodb+srv://hamjosue33:LTEs63Q8Za5KeOQe@cluster0.ca8ad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
  },
});
async function run() {
  try {
    await client.connect();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Hubo un error al conectarse a la base de datos", error);
  }
}

app.listen(port, () => {
  run();
  console.log("Servidor corriendo en el puerto", port);
});

app.post("/createUser", async (req, res) => {
  const auth = getAuth(firebaseApp);
  const email = req.body.correo;
  const password = req.body.contrasena;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.status(200).send({
      descripcion: "usuario creado con exito en firebase",
      result: userCredential,
    });
  } catch (error) {
    res.status(500).send({
        descripcion: 'No se pudo crear el usuario en firebase',
        result: error.message || error
    });
  }
});

app.post("/logIn", async (req, res) => {
  const auth = getAuth(firebaseApp);
  const email = req.body.correo;
  const password = req.body.contrasena;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    res.status(200).send({
      descripcion: "Sesion iniciada con exito en firebase",
      result: userCredential,
    });
  } catch (error) {
    res.status(500).send({
      descripcion: "No se pudo inicar sesion en firebase",
      result: error,
    });
  }
});

app.post("/logOut", async (req, res) => {
  const auth = getAuth(firebaseApp);
  try {
    await signOut(auth);
    res.status(200).send({
      descripcion: "Sesion cerrada con exito en firebase",
    });
  } catch (error) {
    res.status(500).send({
      descripcion: "No se pudo cerrar sesion en firebase",
      result: error,
    });
  }
});

app.post('/addUserData', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('FitChallenge');
    const collection = database.collection('Usuario');
    
    const resultado = await collection.insertOne({
      objetivo: req.body.objetivo,
      edad: req.body.edad,
      genero: req.body.genero,
      peso: req.body.peso,
      experiencia: req.body.experiencia,
      dias_disponibles: req.body.dias_disponibles,
      ubicacion: req.body.ubicacion,
      condicion_fisica: req.body.condicion_fisica,
      tiempo_disponible: req.body.tiempo_disponible,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      altura: req.body.altura,
    });

    res.status(200).send({
      mensaje: "Documento creado con éxito en MongoDB",
      result: resultado,
    });

    await client.close();
  } catch (error) {
    res.status(500).send({
      mensaje: "No se pudo crear el Documento en MongoDB",
      error: error.message,
    });
  }
});