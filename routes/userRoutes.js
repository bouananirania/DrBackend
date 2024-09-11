const express= require ("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/inscrire",userControllers.inscrire);
router.post("/login",userControllers.login);
router.post("/changepswd",userControllers.changePassword);

module.exports = router;
