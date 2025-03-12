const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.json({ message: "Lista de utilizadores" });
});


router.post("/", (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `Utilizador ${name} com email ${email} criado!` });
});

module.exports = router;
