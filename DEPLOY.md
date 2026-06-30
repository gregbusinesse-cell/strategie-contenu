# 🚀 Guide de Déploiement sur Vercel

## Étape 1 : Créer un repo GitHub (2 minutes)

```bash
# Va dans le dossier du projet
cd C:\Users\gregd\Downloads\strategie-vercel

# Initialise Git
git init
git add .
git commit -m "🎬 Initial commit - Stratégie création de contenu"

# Crée un repo GitHub vierge sur https://github.com/new
# Appelle-le "strategie-contenu"

# Puis :
git branch -M main
git remote add origin https://github.com/TON_USERNAME/strategie-contenu.git
git push -u origin main
```

## Étape 2 : Déployer sur Vercel (1 minute)

1. Va sur **https://vercel.com**
2. Clique **"New Project"**
3. Connecte ton compte GitHub
4. Sélectionne **"strategie-contenu"**
5. Clique **"Deploy"**
6. ✅ **C'est live !** Tu recevras une URL comme `https://strategie-contenu.vercel.app`

## Étape 3 : Partager avec tes amis

Donne l'URL à ton ami. Il peut :
- ✏️ Modifier les données directement
- 💾 Les changements se sauvent automatiquement
- 🔄 Vous voyez les changements en temps réel

## ✨ Bonus : Domaine custom (optionnel)

Si tu veux un domaine comme `strategie.tonsite.com` :
1. Va dans les **Vercel Project Settings**
2. Clique **"Domains"**
3. Ajoute ton domaine custom
4. Mets à jour le DNS chez ton registrar

## 🔄 Mettre à jour l'app

Après avoir déployé, si tu veux modifier quelque chose :

```bash
# Modifie les fichiers
# Puis :

git add .
git commit -m "Mise à jour - [description]"
git push

# Vercel redéploie automatiquement en ~30 secondes
```

## 🆘 Troubleshooting

**"Erreur lors du build"**
- Vérifie que tu as `package.json` et `app/page.js`
- Essaie de relancer le build depuis Vercel

**"Les données ne se sauvegardent pas"**
- Utilise une base de données (Vercel KV ou Turso) pour plus tard
- Pour l'instant, ça fonctionne mais se réinitialise si le serveur redémarre

**"Mon ami ne voit pas mes changements"**
- Il doit rafraîchir la page (F5)
- Vous pouvez aussi échanger le lien et accéder ensemble

---

**C'est prêt ! Envoie-moi l'URL une fois en ligne ! 🎉**
