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

# New adapted titles for days 10-31 (without emojis)
titles = {
    10: "Production intensive + Analyse",
    11: "Production intensive",
    12: "Production intensive + Analyse engagement",
    13: "Production + Stories instantanees",
    14: "Production + Stories instantanees",
    15: "Production + Stories instantanees",
    16: "Production + Stories instantanees",
    17: "Production + Stories instantanees",
    18: "Production + Stories instantanees",
    19: "Production + Stories instantanees + Analyse",
    20: "Production + Photos stylees Personal Branding",
    22: "Production + Photos stylees Personal Branding",
    23: "Production + Photos stylees Personal Branding",
    24: "Production + Photos stylees Personal Branding",
    25: "Production intensive",
    26: "Production intensive + Analyse engagement",
    27: "Analyse resultats - Decision Newsletter",
    28: "Nouvelles strategies - Pubs & Personal Branding",
    29: "Production intensive",
    30: "Production intensive",
    31: "Production intensive"
}

# Update titles (description stays the same)
updated_count = 0
for day_num, title in titles.items():
    # Get current data first
    req = urllib.request.Request(f"{base_url}?day_number=eq.{day_num}", headers={"apikey": key})
    try:
        with urllib.request.urlopen(req) as response:
            data_list = json.loads(response.read().decode('utf-8'))
            if data_list:
                current_data = data_list[0]
                # Update only title, keep everything else
                update_data = {"title": title}
                status = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", update_data)
                if status == 204:
                    updated_count += 1
                    print(f"[OK] Jour {day_num}: {title}")
    except:
        pass

print(f"\n[SUCCESS] {updated_count} titres mis a jour!")
