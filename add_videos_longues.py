#!/usr/bin/env python3
import urllib.request
import json
from datetime import datetime, timedelta

base_url = "https://yryoizertvsjizptkckf.supabase.co/rest/v1/videos_youtube"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeW9pemVydHZzaml6cHRrY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MzQ2NTIsImV4cCI6MjA5ODUxMDY1Mn0.63kcVg7Isi7f00Wt_6_KOXRYvgaWsbz6ECN9gf4IPR8"

def make_request(method, url, data=None):
    headers = {"apikey": key, "Content-Type": "application/json"}
    if data:
        data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, response.read().decode('utf-8') if response.status != 204 else ""
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')

# Start from July 6, 2026 to July 31, 2026
start_date = datetime(2026, 7, 6)
end_date = datetime(2026, 7, 31)

current_date = start_date
added_count = 0

while current_date <= end_date:
    date_str = current_date.strftime('%Y-%m-%d')

    data = {
        "date": date_str,
        "statut": "Planifiee",
        "titre": "Vidéo YouTube longue",
        "miniature": "",
        "description": "Production Vidéo YouTube"
    }

    status, response = make_request("POST", base_url, data)

    if status in [200, 201]:
        added_count += 1
        print(f"[OK] {date_str}: Vidéo YouTube longue ajoutée")
    else:
        print(f"[ERREUR] {date_str}: Status {status}")

    current_date += timedelta(days=1)

print(f"\n[SUCCESS] {added_count} vidéos YouTube longues ajoutées du 6 au 31 juillet!")
