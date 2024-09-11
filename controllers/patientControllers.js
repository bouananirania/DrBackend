const Patient = require("../models/patient");
const Consultation= require("../models/consultation");
const Rendezvous= require("../models/rendezvous");

exports.addPatient = async (req, res) => {
    try {
        const { nom, dateNaissance, adresse, telephone, genre, maladies, remarque } = req.body;
        const patient = new Patient({ nom, dateNaissance, adresse, telephone, genre, maladies, remarque });
        const savedPatient = await patient.save();
        
        res.status(201).json({ success: true, patient: savedPatient });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout du patient' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedUser = await Patient.findByIdAndDelete(id);
        
        
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        
        res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.body;
        const { nom, dateNaissance, adresse, telephone, maladies, remarque } = req.body;
        const updatedUser = await Patient.findByIdAndUpdate(
            id,
            { nom, dateNaissance, adresse, telephone, maladies, remarque },
            { new: true }  // This returns the updated document
        );
        
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
      
        res.json({ success: true, user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};

exports.allPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        
        if (!patients || patients.length === 0) {
            return res.status(404).json({ success: false, message: 'Aucun utilisateur trouvé' });
        }

        res.status(200).json({ success: true, patients });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des utilisateurs' });
    }
};
exports.patientData = async (req, res) => {
    try {
        const { id } = req.body;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient non trouvé" });
        }
        const prescriptions = await Consultation.find(
            { patient: id }, 
            'date prescription' 
        );
        const historique = await Consultation.find(
            { patient: id }, 
            'date typeConsultation remarque' 
        );

        res.json({
            success: true,
            patient,
            prescriptions,
            historique
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};
exports.searchPatients = async (req, res) => {
    try {
        const { searchTerm } = req.body; 
        const regex = new RegExp(searchTerm, 'i');
        const patients = await Patient.find({
            $or: [
                { nom: { $regex: regex } },
                { adresse: { $regex: regex } },
                { telephone: { $regex: regex } },
                { genre: { $regex: regex } }, // si nécessaire
                { maladies: { $regex: regex } } // si nécessaire
            ]
        });
        if (patients.length === 0) {
            return res.status(404).json({ success: false, message: 'Aucun patient trouvé' });
        }

        res.json({ success: true, patients });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Erreur lors de la recherche de patients' });
    }
};
