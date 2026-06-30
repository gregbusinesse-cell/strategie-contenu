import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Générer les données initiales
function generateInitialData() {
  const startDate = new Date(2026, 6, 1);
  const endDate = new Date(2026, 7, 10);
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const rowNum = data.length + 1;
    let phase = 'prep';
    if (rowNum >= 6 && rowNum <= 20) phase = 'launch';
    else if (rowNum >= 21 && rowNum <= 31) phase = 'saas';
    else if (rowNum >= 32) phase = 'trip';

    const dateStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];

    data.push({
      date: dateStr,
      day: dayName,
      video: '',
      status: 'À faire',
      title: '',
      miniature: '',
      notes: '',
      phase
    });
  }

  return data;
}

// Lire les données
function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Erreur lecture:', err);
  }
  return generateInitialData();
}

// Écrire les données
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Erreur écriture:', err);
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function PUT(request) {
  const data = await request.json();
  writeData(data);
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const data = generateInitialData();
  writeData(data);
  return NextResponse.json({ success: true });
}
