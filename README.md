# 🔐 Auth API - Node.js, Express, Prisma & SQLite

Une API d’authentification simple (register / login) avec hash des mots de passe, validation via Zod, gestion des utilisateurs via Prisma, et stockage en base SQLite.

---

## ⚙️ Stack utilisée

- Node.js  
- Express  
- Prisma ORM  
- SQLite  
- JWT  
- Zod  
- bcrypt

---

## 🧪 Installation & Lancement

```bash
# 1. Cloner le repo
git clone https://github.com/MNolhan/API-Authentification.git
cd mon-api-auth

# 2. Installer les dépendances
npm install

# 3. Créer un fichier .env
echo 'DATABASE_URL="file:./dev.db"' >> .env
echo 'JWT_SECRET="un_secret_ultra_safe"' >> .env

# 4. Initialiser la base de données
npx prisma migrate dev --name init

# 5. Lancer le serveur
npm run dev
```

---

## 🍬 Petit Bonus

```bash
# Pour voir ta base de donnée
npx prisma studio
```

---

## 💻 à Propos 

Développé par Nolhan Marteau