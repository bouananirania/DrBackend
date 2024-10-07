const express = require ("express");
const http = require("http");
const patientRoutes = require("./routes/patientRoutes");
const rendezvousR = require("./routes/rendezvousRoutes");
const consultationR = require("./routes/consultationRoutes");
const userR = require("./routes/userRoutes");
const cors = require('cors');


const app= express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: '*', // Autorise toutes les origines, ou spécifie l'origine de ton app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
app.use("/patient",patientRoutes);
app.use("/rendezvous",rendezvousR);
app.use("/consultation",consultationR);
app.use("/user",userR);

app.listen(port , ()=>{
    console.log(`Serveur démarré sur le port ${port}`);
})