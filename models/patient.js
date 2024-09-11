const {drSoftware}= require("../config/db");
const mongoose = require("mongoose");

const patient = new mongoose.Schema({
    nom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    adresse: { type: String, required: true },
    telephone: { type: String, required: true },
    genre: {type : String , required: true },
    maladies: {type : [String] , required: true },
    remarque: {type : String , required: false }
});
const Patient = drSoftware.model('Patient', patient);
module.exports = Patient;
