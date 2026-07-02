#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

base_url = "https://yryoizertvsjizptkckf.supabase.co/rest/v1/finances"
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

# Éléments à ajouter
items = [
    {
        "article": "Trésorerie disponible",
        "quantite": "1",
        "prixunitaire": "785",
        "statut": "Disponible",
        "fournisseur": "Budget",
        "lien": "",
        "notes": "Budget disponible à dépenser"
    },
    {
        "article": "Papier peint + Lumière + Manteau personnalisé branding",
        "quantite": "1",
        "prixunitaire": "170",
        "statut": "Acheté",
        "fournisseur": "",
        "lien": "",
        "notes": "Acheté hier"
    },
    {
        "article": "Caméra + Micro",
        "quantite": "1",
        "prixunitaire": "300",
        "statut": "Planifiée",
        "fournisseur": "",
        "lien": "",
        "notes": "À acheter pour la production"
    }
]

print("Ajout des éléments Finances...\n")

added_count = 0
for item in items:
    status, response = make_request("POST", base_url, item)

    if status in [200, 201]:
        added_count += 1
        print(f"[OK] {item['article']}: {item['prixunitaire']}€")
    else:
        print(f"[ERREUR] {item['article']}: Status {status}")

print(f"\n[SUCCESS] {added_count} éléments ajoutés aux Finances!")
