const Consultation= require("../models/consultation");
const Patient = require("../models/patient");

exports.addConsultation = async (req, res) => {
    try {
        const { id, typeConsultation, prescriptions, remarque } = req.body; 
        const consultation = new Consultation({
            patient: id,
            date: new Date(), 
            typeConsultation , 
            remarque,
            prescription: prescriptions || [] 
        });
        const savedConsultation = await consultation.save();

        res.status(201).json({ success: true, consultation: savedConsultation });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};

