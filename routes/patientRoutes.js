const express= require ("express");
const router = express.Router();
const patientControllers = require("../controllers/patientControllers");

router.post("/add",patientControllers.addPatient);
router.post("/update",patientControllers.updatePatient);
router.delete("/delete",patientControllers.deletePatient);
router.get("/all",patientControllers.allPatients);
router.get("/patientData",patientControllers.patientData);
router.get("/search",patientControllers.searchPatients);

module.exports=router;