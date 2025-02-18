# Utiliser une image Node.js stable
FROM node:20

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port du backend
EXPOSE 3000

# Démarrer l'application
CMD ["node", "server.js"]
