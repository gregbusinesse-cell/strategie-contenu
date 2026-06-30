import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const DATA_FILE = path.join(process.cwd(), 'finances.json');

function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Erreur lecture:', err);
  }
  return [];
}

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
