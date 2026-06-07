import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "settings.json");
const defaults = { invitePhraseTarget: "ඔබ දෙපළට" };

async function readSettings() {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export async function GET() {
  return NextResponse.json(await readSettings());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const current = await readSettings();
  const next = { ...current, invitePhraseTarget: body.invitePhraseTarget ?? current.invitePhraseTarget };
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(next, null, 2), "utf-8");
  return NextResponse.json(next);
}
