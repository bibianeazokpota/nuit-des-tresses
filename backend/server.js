// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configurer Multer pour enregistrer les fichiers dans /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware statique
app.use(express.static(__dirname));

// Route d'API pour recevoir les données + fichiers
app.post("/api/candidature", upload.array("photos", 5), (req, res) => {
  const data = req.body;
  const fichiers = req.files;

  console.log("📥 Nouvelle candidature reçue !");
  console.log("📝 Données :", data);
  console.log("📎 Fichiers :", fichiers.map((f) => f.filename));

  return res.status(200).json({
    message: "✅ Candidature reçue avec succès",
    data,
    fichiers: fichiers.map((f) => f.filename),
  });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
