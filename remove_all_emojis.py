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
    if not text:
        return text
    emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"
        u"\U0001F300-\U0001F5FF"
        u"\U0001F680-\U0001F6FF"
        u"\U0001F1E0-\U0001F1FF"
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
        u"️"
        u"〰"
        "]+", re.UNICODE)
    result = emoji_pattern.sub(r'', text).strip()
    # Remove extra spaces
    result = re.sub(r'\s+', ' ', result)
    return result

# Fetch all days
req = urllib.request.Request(base_url, headers={"apikey": key})
with urllib.request.urlopen(req) as response:
    all_days = json.loads(response.read().decode('utf-8'))

# Update all descriptions - remove emojis
cleaned_count = 0
for day_obj in all_days:
    day_num = day_obj['day_number']
    description = day_obj.get('description', '')
    original_desc = description

    # Remove emojis from description
    clean_desc = remove_emojis(description)

    if clean_desc != original_desc:
        data = {"description": clean_desc}
        status = make_request("PATCH", f"{base_url}?day_number=eq.{day_num}", data)
        if status == 204:
            cleaned_count += 1
            print(f"[OK] Jour {day_num}: Emojis retires de la description")

print(f"\n[SUCCESS] {cleaned_count} descriptions nettoyees de tous les emojis!")
