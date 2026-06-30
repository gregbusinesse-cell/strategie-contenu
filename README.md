# 📊 Stratégie Création de Contenu

Application interactive pour gérer ton calendrier de production vidéo + stratégie complète.

## ✨ Fonctionnalités

- 📄 **Stratégie** : Vue complète de ta stratégie avec 4 phases coloriées
- 📅 **Calendrier** : Tableau interactif avec 41 lignes (1er juil - 10 août)
  - Édition en temps réel
  - Dropdowns pour le statut
  - Sauvegarde persistante
  - Accès partagé avec tes collaborateurs

## 🚀 Déployer sur Vercel (GRATUIT)

### Option 1 : Depuis GitHub (Recommandé)

1. **Créer un repo GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TON_USERNAME/strategie-contenu.git
   git push -u origin main
   ```

2. **Aller sur Vercel** → https://vercel.com
   - Clique "New Project"
   - Sélectionne ton repo GitHub
   - Clique "Deploy"
   - ✅ C'est live !

### Option 2 : Avec Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Deployer
vercel

# Répondre aux questions
# C'est fini !
```

## 🔗 Partager avec tes collaborateurs

Une fois déployé sur Vercel, partage l'URL avec ton ami :
- Il peut accéder directement dans son navigateur
- Ses modifications se sauvent immédiatement
- Tu vois les changements en temps réel (rafraîchis simplement la page)

## 💻 Lancer en local

```bash
# Installer les dépendances
npm install

# Lancer le serveur dev
npm run dev

# Ouvre http://localhost:3000
```

## 📝 Éditer et modifier

- Modifie `app/page.js` pour changer la stratégie
- Modifie `app/page.css` pour le design
- Les changements se reflètent directement en local
- Pour Vercel, push sur GitHub et ça se redéploie automatiquement

## 🗄️ Les données

- Stockées dans `data.json` (auto-créé)
- Persistées entre les sessions
- Partagées entre tous les utilisateurs
- Réinitialisables via le bouton "🔄 Réinitialiser"

## 📱 Responsive

L'app fonctionne sur desktop, tablet et mobile !

---

**Questions ?** Ouvre un issue sur GitHub ou contacte-moi directement.
