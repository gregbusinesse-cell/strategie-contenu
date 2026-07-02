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

# Base production pattern (no SaaS/PB breakdown)
base_production = {
    "title": "📹 Production intensive",
    "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format"
}

# Production with analysis (Sundays)
production_with_analysis = {
    "title": "📹 Production intensive + Analyse",
    "description": "• 1 vidéo YouTube longue (15-30 min)\n• 3-5 réels court format\n• Analyser engagement et adapter"
}

# Sundays to add analysis
sundays = [12, 19, 26]

# Update days 10-31 (except 21)
for day in range(10, 32):
    if day == 21:  # Skip day 21 (special Airbnb day)
        continue

    if day in sundays:
        data = production_with_analysis
    else:
        data = base_production

    status = make_request("PATCH", f"{base_url}?day_number=eq.{day}", data)
    analysis_text = " + ANALYSE" if day in sundays else ""
    print(f"[OK] Jour {day}{analysis_text}: {status}")

print("\n[SUCCESS] Tous les jours de production mis a jour!")
print(f"[INFO] Analyses ajoutees: jours 12, 19, 26")
