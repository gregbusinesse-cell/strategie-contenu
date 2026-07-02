#!/usr/bin/env python3
import urllib.request
import json

base_url = "https://yryoizertvsjizptkckf.supabase.co/rest/v1/plan"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW9pemVydHZzaml6cHRrY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzQ2NTIsImV4cCI6MjA5ODUxMDY1Mn0.63kcVg7Isi7f00Wt_6_KOXRYvgaWsbz6ECN9gf4IPR8"

def make_request(method, url, data=None):
    headers = {
        "apikey": key,
        "Content-Type": "application/json"
    }
    if data:
        data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status
    except urllib.error.HTTPError as e:
        return e.code

# Jour 6 - VSL Script Prep
day_6 = {
    "title": "📹 Vidéo longue + Script VSL",
    "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3 réels court format\n• Préparer le script VSL (Video Sales Letter)\n• Planifier la structure et les points clés du VSL\n• Collecter les ressources pour le VSL"
}

# Jour 7 - Ad Script Prep
day_7 = {
    "title": "📹 Vidéo longue + Script Pub",
    "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3 réels court format\n• Préparer le script de la pub/annonce\n• Définir le message clé et l'appel à l'action\n• Structurer la vidéo publicitaire"
}

# Jour 8 - Ad Strategy
day_8 = {
    "title": "📺 Stratégie de publication pub",
    "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3 réels court format\n• Préparer la stratégie complète de la pub:\n  - Où la poster (YouTube Ads, TikTok, Instagram, Facebook)\n  - Comment la poster (format, dimensions, spécifications)\n  - Budget allocation par plateforme\n  - Targeting (audience, géolocalisation, intérêts)\n• Planifier comment augmenter le budget en fonction des résultats\n• Fixer les seuils de performance et les mouvements à faire\n• Définir les KPIs et métriques de succès"
}

# Jour 9 - Ad Launch
day_9 = {
    "title": "🚀 Pub: Préparation & Lancement",
    "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3 réels court format\n• Finaliser la stratégie de publication de la pub\n• Configurer les campagnes publicitaires (audiences, budgets, horaires)\n• LANCER LA PUB sur toutes les plateformes prévues\n• Monitorer les premiers résultats\n• Ajuster les budgets selon la performance en temps réel"
}

# Jour 21 - Airbnb + Trip Prep
day_21 = {
    "title": "🏠 Airbnb + Stratégie trip hyper productif",
    "description": "PRÉPARATION TOTALE POUR LE TRIP AIRBNB:\n\n🏠 Logement:\n• Trouver l'Airbnb parfait:\n  - Bon éclairage naturel (essentiel pour vidéos)\n  - Espace de travail confortable et productif\n  - WiFi stable et rapide\n  - Décor/ambiance adaptée au contenu\n• Réserver l'Airbnb\n\n📅 Stratégie du trip (48-72h hyper productivité):\n• Planifier le rythme: 15h de travail par jour possible\n• Batch production: créer le maximum de contenu en minimum de temps\n• Collaborations: prévoir rencontres avec autres créateurs\n• Behind-the-scenes du trip pour engagement maximal\n• Objectif: 1-2 mois de contenu créé en 1 week-end\n\n🎬 Stratégie pour début août:\n• Finir la stratégie Personal Branding\n• Planifier le contenu d'août (thèmes, formats, calendrier)\n• Préparer les scripts et miniatures pour le mois\n\n🧳 Matériel & Logistique:\n• Liste complète du matériel à emporter:\n  - Caméra + batterie + chargeur\n  - Micro + accessoires audio\n  - Lumières portables\n  - Trépied + gimbal\n  - Fond de studio portable\n  - Vêtements (variété de looks pour vidéos)\n  - Accessoires corporels/décors\n• Trajet:\n  - Moyens de transport\n  - Horaires de départ/retour\n  - Logistique du voyage\n• Prévoir batterie externe, câbles, adaptateurs\n• Vérifier tout le matériel avant le départ\n\nAPRÈS LE 21 JUILLET: TOUT EST PRÉVU - Plus rien à réfléchir, juste faire les valises et partir!"
}

# Update days
days_to_update = {
    6: day_6,
    7: day_7,
    8: day_8,
    9: day_9,
    21: day_21
}

for day_num, day_data in days_to_update.items():
    status = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", day_data)
    print(f"[OK] Jour {day_num}: {status}")

print("\n[SUCCESS] Jours 6-9 et 21 mis a jour!")
