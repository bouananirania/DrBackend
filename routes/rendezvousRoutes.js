const express= require ("express");
const router = express.Router();
const rendezvousControllers = require("../controllers/rendezvousControllers");

router.post("/create",rendezvousControllers.createOne);
router.get("/getAll",rendezvousControllers.getAll);
router.delete("/deletOne",rendezvousControllers.delet);
router.get("/search",rendezvousControllers.searchRendezvous);

module.exports = router;
