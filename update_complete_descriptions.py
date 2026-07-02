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

# Days 13-19: Add Stories PLUS Video + Reels
for day in range(13, 20):
    data = {
        "title": "📹 Production + 📱 Stories instantanees",
        "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format\n\n📱 Stories instantanees:\n• Publier des stories Instagram instantanees\n• Parler 15-30 secondes sur un petit sujet/anecdote\n• Peut etre une anecdote, une phrase, un petit texte ou script\n• Objectif: Tester l'engagement et les reponses\n• Analyser les reponses pour voir ce qui engage"
    }
    status = make_request("PATCH", f"{base_url}?day_number=eq.{day}", data)
    print(f"[OK] Jour {day} (Production + Stories): {status}")

# Days 20, 22-24: Add Photos PLUS Video + Reels (skip 21)
for day in [20, 22, 23, 24]:
    data = {
        "title": "📹 Production + 📸 Photos stylees",
        "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format\n\n📸 Photos stylees Personal Branding:\n• Tourner minimum 6 photos (ou 20-24 si pas deja fait)\n• A differents endroits/locations\n• Avec differents vetements styles (type picking blinders)\n• Personal Branding: avoir l'air professionnel et stylise\n• Varier les looks et les ambiances\n• Preparer les images pour Instagram\n• Poster les photos sur Instagram en feed"
    }
    status = make_request("PATCH", f"{base_url}?day_number=eq.{day}", data)
    print(f"[OK] Jour {day} (Production + Photos): {status}")

# Day 21: Add Video + Reels + Photos to existing Airbnb content
day_21 = {
    "title": "🏠 Airbnb + Stratégie + 📹 Production + 📸 Photos",
    "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format\n\n📸 Photos stylees Personal Branding:\n• Tourner minimum 6 photos (ou 20-24 si pas deja fait)\n• A differents endroits/locations\n• Avec differents vetements styles (type picking blinders)\n• Personal Branding: avoir l'air professionnel et stylise\n• Varier les looks et les ambiances\n• Preparer les images pour Instagram\n• Poster les photos sur Instagram en feed\n\n🏠 PRÉPARATION TOTALE POUR LE TRIP AIRBNB:\n\n🏠 Logement:\n• Trouver l'Airbnb parfait:\n  - Bon éclairage naturel (essentiel pour vidéos)\n  - Espace de travail confortable et productif\n  - WiFi stable et rapide\n  - Décor/ambiance adaptée au contenu\n• Réserver l'Airbnb\n\n📅 Stratégie du trip (48-72h hyper productivité):\n• Planifier le rythme: 15h de travail par jour possible\n• Batch production: créer le maximum de contenu en minimum de temps\n• Collaborations: prévoir rencontres avec autres créateurs\n• Behind-the-scenes du trip pour engagement maximal\n• Objectif: 1-2 mois de contenu créé en 1 week-end\n\n🎬 Stratégie pour début août:\n• Finir la stratégie Personal Branding\n• Planifier le contenu d'août (thèmes, formats, calendrier)\n• Préparer les scripts et miniatures pour le mois\n\n🧳 Matériel & Logistique:\n• Liste complète du matériel à emporter:\n  - Caméra + batterie + chargeur\n  - Micro + accessoires audio\n  - Lumières portables\n  - Trépied + gimbal\n  - Fond de studio portable\n  - Vêtements (variété de looks pour vidéos)\n  - Accessoires corporels/décors\n• Trajet:\n  - Moyens de transport\n  - Horaires de départ/retour\n  - Logistique du voyage\n• Prévoir batterie externe, câbles, adaptateurs\n• Vérifier tout le matériel avant le départ\n\nAPRÈS LE 21 JUILLET: TOUT EST PRÉVU - Plus rien à réfléchir, juste faire les valises et partir!"
}
status = make_request("PATCH", f"{base_url}?day_number=eq.21", day_21)
print(f"[OK] Jour 21 (Airbnb + Production + Photos): {status}")

print("\n[SUCCESS] Descriptions completees!")
print(f"[INFO] Jours 13-19: Production + Stories")
print(f"[INFO] Jours 20, 22-24: Production + Photos")
print(f"[INFO] Jour 21: Airbnb + Production + Photos")
