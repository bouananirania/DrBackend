const mongoose = require("mongoose");
const {drSoftware}=require("../config/db");
const {Patient}= require("./patient");

const rendezvous = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    heure: { type: String, required: false },
    type: { type: [String], required: true }
});
const Rendezvous= drSoftware.model("Rendezvous",rendezvous);
module.exports= Rendezvous;