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

# Days 13-19: Stories instantanees
stories_pattern = {
    "title": "📱 Stories instantanees",
    "description": "• Publier des stories Instagram instantanees\n• Parler 15-30 secondes sur un petit sujet/anecdote\n• Peut etre une anecdote, une phrase, un petit texte ou script\n• Objectif: Tester l'engagement et les reponses\n• Analyser les reponses pour voir ce qui engage\n• Plus naturel et authentique que les posts"
}

# Days 20-24: Photos styled
photos_pattern = {
    "title": "📸 Photos stylees Personal Branding",
    "description": "• Tourner minimum 6 photos (ou 20-24 si pas deja fait)\n• A differents endroits/locations\n• Avec differents vetements styles (type picking blinders)\n• Personal Branding: avoir l'air professionnel et stylise\n• Varier les looks et les ambiances\n• Preparer les images pour Instagram\n• Poster les photos sur Instagram en feed"
}

# Update days 13-19 (Stories)
for day in range(13, 20):
    status = make_request("PATCH", f"{base_url}?day_number=eq.{day}", stories_pattern)
    print(f"[OK] Jour {day} (Stories): {status}")

# Update days 20-24 (Photos)
for day in range(20, 25):
    status = make_request("PATCH", f"{base_url}?day_number=eq.{day}", photos_pattern)
    print(f"[OK] Jour {day} (Photos): {status}")

print("\n[SUCCESS] Stories et Photos mises a jour!")
print(f"[INFO] Stories: jours 13-19")
print(f"[INFO] Photos: jours 20-24")
