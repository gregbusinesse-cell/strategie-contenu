#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import json
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

base_url = "https://yryoizertvsjizptkckf.supabase.co/rest/v1/plan"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW9pemVydHZzaml6cHRrY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzQ2NTIsImV4cCI6MjA5ODUxMDY1Mn0.63kcVg7Isi7f00Wt_6_KOXRYvgaWsbz6ECN9gf4IPR8"

def format_description_structured(desc):
    """Formater avec structure: ● Titre\n- détail\n- détail\n────"""
    if not desc:
        return desc

    # Split par "●" pour obtenir les sections
    sections = re.split(r'●+', desc)

    # Nettoyer et filtrer les sections vides
    sections = [s.strip() for s in sections if s.strip()]

    if not sections:
        return desc

    formatted_sections = []

    for section in sections:
        # Pour chaque section, le premier tiret "-" sépare le titre des détails
        # Chercher le premier "-" ou ":" ou "●"

        # Si le texte contient déjà des "-" ou des lignes, on doit les parseroperly
        # Split par les tirets existants

        lines = section.split('\n')

        # Le titre est généralement la première ligne ou avant le premier tiret
        title = None
        details = []

        for line in lines:
            line = line.strip()
            if not line:
                continue

            # Si c'est le titre (pas de tiret, pas de point commençant)
            if title is None and not line.startswith('-'):
                # Mais si la ligne est très longue et contient des tirets, peut-être qu'elle contient aussi des détails
                # Splitter par ":" pour séparer titre et détails
                if ':' in line:
                    parts = line.split(':', 1)
                    title = parts[0].strip()
                    if parts[1].strip():
                        details.append(parts[1].strip())
                else:
                    title = line
            else:
                # C'est un détail
                line = line.lstrip('-').strip()
                if line:
                    details.append(line)

        if title:
            # Construire la section formatée
            section_text = f"● {title}"
            for detail in details:
                section_text += f"\n- {detail}"
            section_text += "\n─────────────────────"
            formatted_sections.append(section_text)

    result = "\n\n".join(formatted_sections)
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

print("Reformatage avec structure claire (● Titre / - détails / ────)...\n")

updated_count = 0
for day_obj in all_days:
    day_num = day_obj['day_number']
    current_desc = day_obj.get('description', '')

    # Formater
    new_desc = format_description_structured(current_desc)

    # Pour les dimanches, ajouter tâche préparation
    sundays = [5, 12, 19, 26]
    if day_num in sundays:
        new_desc = new_desc + "\n\n● Préparer les vidéos longues pour la semaine qui suit\n- Titres\n- Miniature\n- Description\n- Script\n─────────────────────"

    # Mettre à jour si changé
    if new_desc != current_desc:
        data = {"description": new_desc}
        status = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", data)
        if status == 204:
            updated_count += 1
            print(f"[OK] Jour {day_num}: Structuré")

print(f"\n[SUCCESS] {updated_count} jours reformatés avec structure claire!")
