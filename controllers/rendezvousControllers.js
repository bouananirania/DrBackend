const Rendezvous = require("../models/rendezvous");
const Patient = require("../models/patient");


exports.createOne = async (req,res)=>{
    try{
       const {id,date, heure, type }= req.body;
       const rendezvous = new Rendezvous({patient : id,date,heure,type : type || [] });
       const savedRendezvous = await rendezvous.save();
       res.status(201).json({ success: true, rendervous: savedRendezvous });
    }catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};
exports.getAll = async (req, res) => {
    try {
        const all = await Rendezvous.find().populate('patient', 'nom telephone'); 
        
        if (!all || all.length === 0) {
            return res.status(404).json({ success: false, message: 'Aucun rendez-vous trouvé' });
        }

        res.status(201).json({ success: true, rendezvous: all });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};

exports.delet = async (req,res)=>{
    
    try 
    {const { id } = req.body;
        const deletedR = await Rendezvous.findByIdAndDelete(id);
        
        if (!deletedR) {
            return res.status(404).json({ success: false, message: 'rendez vous non trouvé' });
        }
        
        res.json({ success: true, message: 'rendez vous supprimé avec succès' });}
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Erreur lors de la suppression du rendez vous' });
        }

};
exports.searchRendezvous = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const regex = new RegExp(searchTerm, 'i');

        // Trouver les patients correspondants à la recherche
        const matchingPatients = await Patient.find({
            $or: [
                { nom: { $regex: regex } },
                { telephone: { $regex: regex } }
            ]
        });

        // Récupérer leurs IDs pour rechercher les rendez-vous associés
        const patientIds = matchingPatients.map(patient => patient._id);

        // Rechercher les rendez-vous basés sur le type ou les patients correspondants
        const rendezvous = await Rendezvous.find({
            $or: [
                { type: { $regex: regex } },
                { patient: { $in: patientIds } }  // Rechercher par ID de patient
            ]
        }).populate('patient', 'nom telephone');  // Inclure le nom et téléphone du patient

        if (rendezvous.length === 0) {
            return res.status(404).json({ success: false, message: "Aucun rendez-vous trouvé" });
        }

        res.json({ success: true, rendezvous });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur lors de la recherche des rendez-vous" });
    }
};
