#!/usr/bin/env python3
import urllib.request
import json

base_url = "https://yryoizertvsjizptkckf.supabase.co/rest/v1/plan"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW9pemVydHZzaml6cHRrY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzQ2NTIsImV4cCI6MjA5ODUxMDY1Mn0.63kcVg7Isi7f00Wt_6_KOXRYvgaWsbz6ECN9gf4IPR8"

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

# Day 27: Analysis
day_27 = {
    "title": "📊 Analyse resultats - Decision Newsletter",
    "description": "ANALYSER LES RÉSULTATS:\n\nObjectifs a atteindre:\n• Minimum 300 abonnés YouTube\n• Environ 10 commentaires par vidéo en moyenne\n\nSI objectifs atteints:\n• Lancer une newsletter\n• Commencer a collecter les emails\n• Planifier le contenu newsletter\n• Premiere newsletter a envoyer\n\nSI objectifs NON atteints:\n• Attendre d'avoir ces resultats avant de lancer\n• Continuer la production et l'engagement\n• Analyser ce qui fonctionne et l'ajuster\n\nAnalyse detaillee:\n• Combien de commentaires par video en moyenne?\n• Quel type de contenu recoit le plus de commentaires?\n• Quel type de contenu recoit le plus de vues?\n• Taux d'engagement global\n• Croissance abonnés par semaine"
}

# Day 28: New Strategies
day_28 = {
    "title": "🎯 Nouvelles strategies - Pubs & PB",
    "description": "CHERCHER NOUVELLES STRATÉGIES:\n\nAnalyse des pubs:\n• Qu'est-ce qui a bien fonctionne dans les pubs?\n• Quel type d'audience a converti le mieux?\n• Quel message/hook a marche le plus?\n• Quel budget vs ROI?\n• Refaire les meilleures pubs avec optimisations\n\nApporter plus de clients:\n• Comment convertir les spectateurs en clients?\n• Ameliorer le CTA (Call To Action)\n• Creer un funnel de vente optimal\n• Augmenter la valeur perçue du produit/service\n• Proposer une offre irrésistible\n\nAméliorer Personal Branding:\n• Renforcer la presence et l'authenticité\n• Plus de contenu derriere-les-scenes\n• Montrer la personnalité et les valeurs\n• Construire une communauté fidele\n• Engagement authentique vs growth artificiel\n\nOptimisations a envisager:\n• Tester nouvelles strategies\n• Doubler les budgets sur ce qui fonctionne\n• Arreter ce qui ne fonctionne pas\n• Nouvelles plateformes/formats"
}

# Update days 27-28
status_27 = make_request("PATCH", f"{base_url}?day_number=eq.27", day_27)
print(f"[OK] Jour 27 (Analyse): {status_27}")

status_28 = make_request("PATCH", f"{base_url}?day_number=eq.28", day_28)
print(f"[OK] Jour 28 (Strategies): {status_28}")

# Now clean up all descriptions - remove Matin/Apres-midi/Soirée/Midi
print("\n[INFO] Nettoyage des mentions Matin/Apres-midi/Soirée/Midi...")

# Get all plan data first
try:
    req = urllib.request.Request(base_url, headers={"apikey": key})
    with urllib.request.urlopen(req) as response:
        all_days = json.loads(response.read().decode('utf-8'))

    cleaned_count = 0
    for day_obj in all_days:
        day_num = day_obj['day_number']
        description = day_obj.get('description', '')
        title = day_obj.get('title', '')

        # Clean description and title
        original_desc = description
        original_title = title

        # Remove time mentions
        for time_word in ['Matin/', 'Apres-midi/', 'Soirée:', 'Midi:', 'Matin:', 'Apres-midi:', 'Soirée/', 'Midi/']:
            description = description.replace(time_word, '')
            title = title.replace(time_word, '')

        # Remove standalone time words at start of lines
        lines = description.split('\n')
        cleaned_lines = []
        for line in lines:
            if line.strip().startswith('Matin') or line.strip().startswith('Apres-midi') or line.strip().startswith('Soirée') or line.strip().startswith('Midi'):
                continue
            cleaned_lines.append(line)
        description = '\n'.join(cleaned_lines)

        # If something changed, update it
        if description != original_desc or title != original_title:
            data = {"description": description, "title": title}
            status = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", data)
            if status == 204:
                cleaned_count += 1
                print(f"[CLEANED] Jour {day_num}")

    print(f"\n[SUCCESS] {cleaned_count} jours nettoyés!")

except Exception as e:
    print(f"[ERROR] {e}")

print("\n[COMPLETE] Jours 27-28 ajoutes + Nettoyage termine!")
