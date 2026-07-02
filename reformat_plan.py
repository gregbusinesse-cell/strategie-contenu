#!/usr/bin/env python3
import urllib.request
import json
from datetime import datetime

base_url = "https://yryoizertvsjizptkckf.supabase.co/rest/v1/plan"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW9pemVydHZzaml6cHRrY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzQ2NTIsImV4cCI6MjA5ODUxMDY1Mn0.63kcVg7Isi7f00Wt_6_KOXRYvgaWsbz6ECN9gf4IPR8"

def make_request(method, url, data=None):
    headers = {"apikey": key, "Content-Type": "application/json"}
    if data:
        data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, response.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')

# Dimanches en juillet 2026: 5, 12, 19, 26
sundays = [5, 12, 19, 26]

# Récupérer les données actuelles
req = urllib.request.Request(base_url, headers={"apikey": key})
with urllib.request.urlopen(req) as response:
    all_days = json.loads(response.read().decode('utf-8'))

print("Reformatage du Plan...\n")

updated_count = 0
for day_obj in all_days:
    day_num = day_obj['day_number']
    current_desc = day_obj.get('description', '')

    # Reformatter avec bonne espacement
    # Remplacer " - " par "\n" (une ligne entre les points du même sujet)
    # Remplacer " -- " par "\n\n" (deux lignes entre les sujets différents)
    new_desc = current_desc.replace(' -- ', '\n\n').replace(' - ', '\n')

    # Pour les dimanches (5, 12, 19, 26), ajouter la tâche de préparation
    if day_num in sundays:
        new_desc = new_desc + "\n\nPréparer les vidéos longues pour la semaine qui suit. Titres, miniature, description, script."

    # Mettre à jour si changé
    if new_desc != current_desc:
        data = {"description": new_desc}
        status, response = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", data)
        if status == 204:
            updated_count += 1
            print(f"[OK] Jour {day_num}: Reformaté")
            if day_num in sundays:
                print(f"     + Ajout tâche préparation vidéos longues")

print(f"\n[SUCCESS] {updated_count} jours reformatés!")
