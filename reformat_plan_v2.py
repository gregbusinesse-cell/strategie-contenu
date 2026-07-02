#!/usr/bin/env python3
import urllib.request
import json
import re

base_url = "https://yryoizertvsjizptkckf.supabase.co/rest/v1/plan"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW9pemVydHZzaml6cHRrY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzQ2NTIsImV4cCI6MjA5ODUxMDY1Mn0.63kcVg7Isi7f00Wt_6_KOXRYvgaWsbz6ECN9gf4IPR8"

def get_subject(text):
    """Déterminer le sujet d'un point"""
    text_lower = text.lower()
    if any(word in text_lower for word in ['video', 'youtube', 'reel', 'reels', 'court format', 'long', 'enregistr', 'script', 'titre', 'miniature', 'descrip']):
        return 'creation'
    elif any(word in text_lower for word in ['photo', 'airbnb', 'branding', 'personal', 'shooting']):
        return 'photos'
    elif any(word in text_lower for word in ['analyse', 'engagement', 'strateg', 'resultat']):
        return 'analyse'
    elif any(word in text_lower for word in ['achat', 'materiel', 'equipment', 'fournisseur']):
        return 'achats'
    elif any(word in text_lower for word in ['formation', 'billiz', 'apprendre']):
        return 'formation'
    elif any(word in text_lower for word in ['preparer', 'preparation']):
        return 'prep'
    elif any(word in text_lower for word in ['finalis', 'terminer']):
        return 'finition'
    else:
        return 'autre'

def format_description(desc):
    """Formater une description avec bons espaces"""
    if not desc:
        return desc

    # Split par bullet "●"
    parts = re.split(r'●+', desc)

    # Nettoyer et filtrer les parties vides
    points = [p.strip() for p in parts if p.strip()]

    if not points:
        return desc

    # Grouper les points par sujet
    formatted = []
    current_subject = None

    for point in points:
        subject = get_subject(point)

        # Si nouveau sujet, ajouter deux lignes
        if current_subject and subject != current_subject:
            formatted.append('\n')  # Ligne supplémentaire pour deux lignes totales
        # Sinon si pas le premier point, ajouter une ligne
        elif formatted:
            pass  # Pas d'ajout, juste la ligne de bullet

        formatted.append(f"● {point}")
        current_subject = subject

    # Joindre avec des retours à la ligne appropriés
    result = ""
    for i, item in enumerate(formatted):
        if i == 0:
            result = item
        elif item == '\n':
            result += '\n\n'
        else:
            result += '\n' + item

    return result

def make_request(method, url, data=None):
    headers = {"apikey": key, "Content-Type": "application/json"}
    if data:
        data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status
    except urllib.error.HTTPError as e:
        return e.code

# Récupérer les données
req = urllib.request.Request(base_url, headers={"apikey": key})
with urllib.request.urlopen(req) as response:
    all_days = json.loads(response.read().decode('utf-8'))

print("Reformatage des descriptions avec bons espaces...\n")

updated_count = 0
for day_obj in all_days:
    day_num = day_obj['day_number']
    current_desc = day_obj.get('description', '')

    # Formater
    new_desc = format_description(current_desc)

    # Pour les dimanches (5, 12, 19, 26), ajouter tâche préparation vidéos
    sundays = [5, 12, 19, 26]
    if day_num in sundays:
        new_desc = new_desc + "\n\n● Préparer les vidéos longues pour la semaine qui suit. Titres, miniature, description, script."

    # Mettre à jour si changé
    if new_desc != current_desc:
        data = {"description": new_desc}
        status = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", data)
        if status == 204:
            updated_count += 1
            print(f"[OK] Jour {day_num}: Formaté")

print(f"\n[SUCCESS] {updated_count} jours reformatés avec espaces corrects!")
