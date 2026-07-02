#!/usr/bin/env python3
import urllib.request
import json
import re

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

# Remove all emojis from a string
def remove_emojis(text):
    emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        u"\U0001f926-\U0001f937"
        u"\U00010000-\U0010ffff"
        u"♀-♂"
        u"☀-⭕"
        u"‍"
        u"⏏"
        u"⏩"
        u"⌚"
        u"️"  # dingbats
        u"〰"
        "]+", re.UNICODE)
    return emoji_pattern.sub(r'', text)

# Varied titles for days 11-31 based on content
varied_titles = {
    11: "Production intensive",
    12: "Production + Analyse engagement",
    13: "Production + Stories instantanees",
    14: "Production + Engagement storytelling",
    15: "Production + Connexion audience",
    16: "Production + Recit authentique",
    17: "Production + Echange communaute",
    18: "Production + Conversation stories",
    19: "Production + Analyse interaction",
    20: "Production + Photos brandees",
    22: "Contenu stylise personal branding",
    23: "Shooting session personal",
    24: "Photos presentes instagram",
    25: "Production intensive",
    26: "Production + Suivi engagement",
    27: "Analyse resultats - Decision Newsletter",
    28: "Nouvelles strategies - Pubs & Personal Branding",
    29: "Production intensive",
    30: "Production intensive",
    31: "Production intensive"
}

# Fetch all days
req = urllib.request.Request(base_url, headers={"apikey": key})
with urllib.request.urlopen(req) as response:
    all_days = json.loads(response.read().decode('utf-8'))

# Update all titles - remove emojis and update days 11-31 with varied titles
for day_obj in all_days:
    day_num = day_obj['day_number']
    current_title = day_obj.get('title', '')

    # Remove emojis
    clean_title = remove_emojis(current_title).strip()

    # For days 11-31 (except 21), use varied titles
    if day_num in varied_titles:
        clean_title = varied_titles[day_num]

    # Update if changed
    if clean_title != current_title:
        data = {"title": clean_title}
        status = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", data)
        if status == 204:
            print(f"[OK] Jour {day_num}: {clean_title}")

print("\n[SUCCESS] Tous les emojis retires et titres ameliores!")
