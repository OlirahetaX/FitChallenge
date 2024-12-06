const express = require("express");
const bodyParser = require("body-parser");
var urlEncodeParser = bodyParser.urlencoded({ extended: true });

const { ServerApiVersion, MongoClient } = require("mongodb");
const { initializeApp } = require("firebase/app");

// ENCRIPTACION DE DATOS
/*
Firebase Authentication usa los datos para habilitar la autenticación del usuario final y facilitar 
la administración de su cuenta. También usa strings usuario-agente y direcciones IP para ofrecer 
seguridad adicional y prevenir el abuso durante el registro y la autenticación.

Los servicios de Firebase encriptan datos en tránsito con HTTPS y datos de clientes aislados de manera lógica.
*/
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const firebaseAdmin = require("firebase-admin"); // Import Firebase Admin SDK

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(), // Use service account credentials
});

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
      descripcion: "No se pudo crear el usuario en firebase",
      result: error.message || error,
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
      descripcion: "No se pudo iniciar sesión en firebase",
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
      descripcion: "No se pudo cerrar sesión en firebase",
      result: error,
    });
  }
});

app.post("/addUserData", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("FitChallenge");
    const collection = database.collection("Usuario");

    // Verifica que se envíe un id en la solicitud
    if (!req.body.id) {
      return res.status(400).send({
        mensaje: "El campo 'id' es obligatorio.",
      });
    }

    // Intentamos insertar el documento con el id proporcionado
    const documento = {
      _id: req.body.id, // Asigna el id recibido en el body como _id
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
      email: req.body.email
    };

    const resultado = await collection.insertOne(documento);

    res.status(200).send({
      mensaje: "Documento creado con éxito en MongoDB",
      id: resultado.insertedId, // Este debería coincidir con req.body.id
    });

    await client.close();
  } catch (error) {
    if (error.code === 11000) {
      // Código de error 11000 significa duplicado de clave
      return res.status(409).send({
        mensaje: "El ID proporcionado ya existe en la base de datos.",
        error: error.message,
      });
    }

    res.status(500).send({
      mensaje: "No se pudo crear el Documento en MongoDB",
      error: error.message,
    });
  }
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Conectarte a la base de datos y acceder a la colección
    const database = client.db("FitChallenge"); // Usar la conexión creada con MongoClient
    const collection = database.collection("Usuario");

    // Buscar el usuario por ID
    const user = await collection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Responder con el usuario encontrado
  } catch (err) {
    console.error("Error retrieving user:", err);
    res
      .status(500)
      .json({ message: "Error retrieving user", error: err.message });
  }
});

app.get("/checkUser/:uid", async (req, res) => {
  const userUid = req.params.uid;

  try {
    // Conectarte a la base de datos y acceder a la colección
    const database = client.db("FitChallenge"); // Usar la conexión creada con MongoClient
    const collection = database.collection("Usuario");

    // Buscar el usuario por uid (o cualquier campo que corresponda al identificador)
    const user = await collection.findOne({ _id: userUid });

    if (user) {
      return res.status(200).json({ message: "User exists" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error retrieving user:", err);
    res
      .status(500)
      .json({ message: "Error retrieving user", error: err.message });
  }
});


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAIrkKxvTlLwU_XykSMmU5Rdabt7_m1I54");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generateRoutine", async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      objetivo,
      edad,
      genero,
      peso,
      experiencia,
      dias_disponibles,
      ubicacion,
      condicion_fisica,
      tiempo_disponible,
      altura,
    } = req.body;

    const prompt = `
      Genera una rutina personalizada basada en los siguientes datos del usuario:
      - Nombre: ${nombre} ${apellido}
      - Objetivo: ${objetivo}
      - Edad: ${edad}
      - Género: ${genero}
      - Peso: ${peso} kg
      - Altura: ${altura} cm
      - Experiencia: ${experiencia}
      - Días disponibles: ${dias_disponibles}
      - Ubicación: ${ubicacion}
      - Condición física: ${condicion_fisica}
      - Tiempo disponible por sesión: ${tiempo_disponible} minutos

      La respuesta debe ser exclusivamente un JSON válido con esta estructura:
      {
        "rutina_id": int,
        "nombre_rutina": string,
        "descripcion": text,
        "duracion": int,
        "nivel": string,
        "objetivo": string,
        "sesiones": [
          {
            "dia": string,
            "ejercicios": [
              { "nombre": string, "series": int, "repeticiones": int (debe ser un número o un rango de números), "descanso": int }
            ]
          }
        ]
      }

      No incluyas texto adicional fuera del JSON. Usa únicamente valores numéricos para "repeticiones", como un rango de repeticiones (por ejemplo, "8-12").
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(`No se encontró un JSON válido en la respuesta de la IA: ${responseText}`);
    }

    
    let routineData;
    try {
      routineData = JSON.parse(jsonMatch[0]);

      routineData.sesiones.forEach(session => {
        session.ejercicios.forEach(exercise => {
          if (typeof exercise.repeticiones === 'string' && exercise.repeticiones === 'Máximo') {
            exercise.repeticiones = 15;
          }
        });
      });
    } catch (error) {
      throw new Error(`Error al analizar el JSON extraído: ${jsonMatch[0]}. Error: ${error.message}`);
    }

    const database = client.db("FitChallenge");
    const routinesCollection = database.collection("Rutinas");

    const response = await routinesCollection.insertOne(routineData);

    res.status(200).send({
      message: "Rutina generada y almacenada con éxito",
      rutina: routineData,
      id: response.insertedId,
    });
  } catch (error) {
    console.error("Error generando rutina:", error);
    res.status(500).send({
      message: "Error al generar la rutina",
      error: error.message || error,
    });
  }
});