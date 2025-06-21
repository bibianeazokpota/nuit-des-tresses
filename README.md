# Formulaire Nuit des Tresses Africaines 3

Ce projet est un formulaire web destiné à la collecte des candidatures pour l’événement **La Nuit des Tresses Africaines 3** (22 novembre 2025, Parakou).

---

## Fonctionnalités

- Collecte des données personnelles et professionnelles des candidats
- Upload de photos (formats JPG, JPEG, PNG) avec une limite de taille de 5 Mo par fichier
- Envoi des données vers une feuille Google Sheets via Google Apps Script
- Réception automatique des candidatures par email
- Hébergement des photos via Cloudinary (optionnel, recommandé pour gérer les images)
- Validation des champs (motivation limitée à 150 mots, formats et tailles des photos, etc.)

---

## Structure des fichiers

- `index.html` : Formulaire HTML complet, avec validation et envoi via fetch vers Google Apps Script
- `style.css` : (Optionnel) fichier CSS pour le design du formulaire
- `script.js` : (Optionnel) gestion du formulaire et upload vers Cloudinary si utilisé
- `Code.gs` : Script Google Apps Script, fonction `doPost(e)` pour traiter les données reçues, les enregistrer dans Google Sheets et envoyer un email
- `README.md` : Ce fichier de documentation

---

## Configuration nécessaire

### 1. Google Sheets

- Crée une feuille Google Sheets.
- Renomme la feuille (onglet) en `Candidatures Tresses Africaines 3`.
- Copie l’ID du document Google Sheets (depuis l’URL).

### 2. Google Apps Script

- Dans [Google Apps Script](https://script.google.com/), crée un nouveau projet.
- Colle le contenu du fichier `Code.gs` (fonction `doPost`) dans l’éditeur.
- Dans le script, adapte si besoin le nom de la feuille.
- Publie le script en tant que **Web app** :
  - Exécuter l’application en tant que : **Moi**
  - Accès : **Tout le monde, même anonymes**
- Récupère l’URL de la Web app, et remplace dans le formulaire HTML l’attribut `action` par cette URL.

### 3. Cloudinary (optionnel pour les photos)

- Crée un compte sur [Cloudinary](https://cloudinary.com/).
- Depuis ton tableau de bord Cloudinary, note ton **Cloud Name**.
- Dans **Settings > Upload**, crée un **Upload Preset** en mode **Unsigned**, et configure les types d’images acceptés (`jpg`, `jpeg`, `png`).
- Dans ton script frontend (ex: `script.js`), ajoute ou modifie les variables :

```js
const CLOUD_NAME = "ton_cloud_name";
const UPLOAD_PRESET = "ton_upload_preset";
