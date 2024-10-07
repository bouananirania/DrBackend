# Utiliser une image Node.js officielle
FROM node:16

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port que l'application utilise
EXPOSE 3000

# Démarrer l'application backend
CMD ["npm", "start"]
