#!/bin/bash

# API Supabase
URL="https://yryoizertvsjizptkckf.supabase.co/rest/v1/plan"
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW9pemVydHZzaml6cHRrY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzQ2NTIsImV4cCI6MjA5ODUxMDY1Mn0.63kcVg7Isi7f00Wt_6_KOXRYvgaWsbz6ECN9gf4IPR8"

# Jour 1 - UPDATE
curl -X PATCH "$URL?day_number=eq.1" \
  -H "apikey: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"📋 Fin des achats & Démarrage production","description":"• Finaliser tous les achats nécessaires\n• Commencer les enregistrements (3 réels min)\n• Vérifier que tout le matériel est prêt\n• Vidéo YouTube longue à tourner (si possible commencer aujourd'\''hui)"}'

# Jour 2 - UPDATE
curl -X PATCH "$URL?day_number=eq.2" \
  -H "apikey: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"📚 Formation Billiz Part 1 + Stratégie PB","description":"Matin/Après-midi:\n• Regarder la moitié 1 de la formation Billiz (~6h)\n• Prendre des notes détaillées\n\nSoirée:\n• Commencer à écrire la stratégie Personal Branding (brouillon)\n• 3 réels quotidiens\n• Vidéo longue (si pas faite jour 1)"}'

# Jour 3 - UPDATE
curl -X PATCH "$URL?day_number=eq.3" \
  -H "apikey: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"📚 Formation Billiz Part 2 + Stratégie PB","description":"Matin/Après-midi:\n• Regarder la moitié 2 de la formation Billiz (~6h)\n• Continuer les notes\n\nSoirée:\n• Poursuivre l'\''écriture stratégie Personal Branding (brouillon)\n• 3 réels\n• Vidéo longue PRIORITÉ (dernière chance avant phase 2)"}'

# Jour 4 - UPDATE
curl -X PATCH "$URL?day_number=eq.4" \
  -H "apikey: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"🎯 Stratégie PB finale + Setup vidéo","description":"Matin:\n• Terminer la stratégie Personal Branding (version propre et définitive)\n• Revoir et valider tous les éléments\n\nAprès-midi:\n• Préparer le setup de tournage (décor, lumière, caméra)\n• Tester la qualité audio/vidéo\n• Faire des tests de cadrage\n\nSoirée:\n• 3 réels\n• Commencer à préparer les vidéos longues pour semaine 8-14 (scripts, planning)"}'

# Jour 5 - UPDATE
curl -X PATCH "$URL?day_number=eq.5" \
  -H "apikey: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"🎬 Setup complet + Tests techniques","description":"Préparation intensive du setup:\n• Préparer les scripts et titres pour les vidéos\n• Préparer les miniatures (vêtements, accessoires)\n• Regarder les vidéos Billiz sur les thèmes pertinents\n• Préparer les ressources montage (photos, vidéos, musiques)\n\nTests techniques:\n• Tester complètement le matériel (caméra, micro, lumière)\n• Se familiariser avec l'\''équipement\n• Finir les préparatifs du setup d'\''agencement\n• Tester les vidéos de test pour qualité\n• Expérimenter les angles (quel angle de caméra est le meilleur)\n• Tester les accessoires corporels et décors\n• Ajuster la lumière et l'\''audio\n\n• 3 réels"}'

echo "✓ Jours 1-5 mis à jour"

# Créer les jours 6-10 (pattern standard)
for day in {6..10}; do
  curl -X POST "$URL" \
    -H "apikey: $KEY" \
    -H "Content-Type: application/json" \
    -d "{\"day_number\":$day,\"title\":\"📹 Production intensive\",\"description\":\"• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format\n• 50% contenu SaaS (tutoriels, stratégie business)\n• 50% Personal Branding (coulisses, lifestyle, tips)\n• Analyser engagement et adapter\",\"completed\":false}"
done

echo "✓ Jours 6-10 créés"

# Créer les jours 11-20 (pattern standard)
for day in {11..20}; do
  curl -X POST "$URL" \
    -H "apikey: $KEY" \
    -H "Content-Type: application/json" \
    -d "{\"day_number\":$day,\"title\":\"📹 Production intensive\",\"description\":\"• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format\n• 50% contenu SaaS (tutoriels, stratégie business)\n• 50% Personal Branding (coulisses, lifestyle, tips)\n• Analyser engagement et adapter\",\"completed\":false}"
done

echo "✓ Jours 11-20 créés"

# Jour 21 - Airbnb + Stratégie
curl -X POST "$URL" \
  -H "apikey: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"day_number":21,"title":"🏠 Airbnb + Stratégie août + Sortie stylée","description":"Préparation TOTALE pour trip Airbnb:\n• Choisir l'\''Airbnb parfait (critères: bon éclairage naturel, espace travail, wifi stable)\n• Réserver l'\''Airbnb\n• Finaliser la stratégie pour début août\n• Planifier une sortie dans un lieu stylé pour tourner du contenu vidéo de qualité\n• Préparer la liste complète du matériel à emporter\n• Faire les valises\n\nProductivité SaaS:\n• Bosser intensément sur le SaaS (développement produit, stratégie, contenu)\n\nAprès le 21 juillet: TOUT DOIT ÊTRE PRÉVU - plus rien à réfléchir, juste faire les valises et partir!","completed":false}'

echo "✓ Jour 21 créé"

# Créer les jours 22-31 (pattern standard)
for day in {22..31}; do
  curl -X POST "$URL" \
    -H "apikey: $KEY" \
    -H "Content-Type: application/json" \
    -d "{\"day_number\":$day,\"title\":\"📹 Production intensive\",\"description\":\"• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format\n• 50% contenu SaaS (tutoriels, stratégie business)\n• 50% Personal Branding (coulisses, lifestyle, tips)\n• Analyser engagement et adapter\",\"completed\":false}"
done

echo "✓ Jours 22-31 créés"
echo "✅ PLAN JUILLET COMPLET!"
