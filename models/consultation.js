const mongoose = require ("mongoose");
const {drSoftware} = require("../config/db");
const {Patient}= require("./patient");

const consultation = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    typeConsultation: { type: String, required: true },
    remarque: { type: String, required: false },
    prescription: { type: [String], required: false }

});
const Consultation = drSoftware.model('Consultation',consultation);
module.exports = Consultation;