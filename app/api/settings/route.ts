import { NextRequest, NextResponse } from "next/server";
import { redis } from "../../lib/redis";

const KEY = "settings";
const defaults = { invitePhraseTarget: "ඔබ දෙපළට" };

async function readSettings() {
  const stored = await redis.get<typeof defaults>(KEY);
  return { ...defaults, ...(stored ?? {}) };
}

export async function GET() {
  return NextResponse.json(await readSettings());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const current = await readSettings();
  const next = { ...current, invitePhraseTarget: body.invitePhraseTarget ?? current.invitePhraseTarget };
  await redis.set(KEY, next);
  return NextResponse.json(next);
}
