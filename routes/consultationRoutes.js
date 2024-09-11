const express= require ("express");
const router = express.Router();
const consultationControllers = require("../controllers/consultationControllers");

router.post("/creat",consultationControllers.addConsultation);

module.exports=router;