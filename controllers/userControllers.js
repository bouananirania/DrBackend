const User = require("../models/user");  // Modèle User

exports.inscrire = async (req, res) => {
    try {
        const { userName, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Les mots de passe ne correspondent pas" });
        }
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Le nom d'utilisateur existe déjà" });
        }
        const user = new User({ userName, password });
        const savedUser = await user.save();

        res.status(201).json({ success: true, user: savedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};
exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Mot de passe incorrect" });
        }
        res.status(200).json({ success: true, message: "Connexion réussie", user: user._id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};
exports.changePassword = async (req, res) => {
    try {
        const { userName, oldPassword, newPassword, confirmNewPassword } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        if (user.password !== oldPassword) {
            return res.status(400).json({ success: false, message: "Ancien mot de passe incorrect" });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "Les nouveaux mots de passe ne correspondent pas" });
        }
        user.password = newPassword;
        const updatedUser = await user.save();

        res.status(200).json({ success: true, message: "Mot de passe mis à jour avec succès", user: updatedUser._id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};
