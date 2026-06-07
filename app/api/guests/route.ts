import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "guests.json");

type Guest = {
  id: string;
  name: string;
  phone: string;
  side: "groom" | "bride";
  plannedGuests: number;
  invited: boolean;
};

async function readGuests(): Promise<Guest[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeGuests(guests: Guest[]) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(guests, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(await readGuests());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const guests = await readGuests();
  const guest: Guest = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: body.name ?? "",
    phone: body.phone ?? "",
    side: body.side === "bride" ? "bride" : "groom",
    plannedGuests: parseInt(body.plannedGuests, 10) || 1,
    invited: false,
  };
  guests.push(guest);
  await writeGuests(guests);
  return NextResponse.json(guest);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const guests = await readGuests();
  const idx = guests.findIndex((g) => g.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (typeof body.invited === "boolean") guests[idx].invited = body.invited;
  if (body.plannedGuests !== undefined) guests[idx].plannedGuests = parseInt(body.plannedGuests, 10) || guests[idx].plannedGuests;
  if (body.name) guests[idx].name = body.name;
  if (body.phone !== undefined) guests[idx].phone = body.phone;
  await writeGuests(guests);
  return NextResponse.json(guests[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const guests = await readGuests();
  const next = guests.filter((g) => g.id !== id);
  await writeGuests(next);
  return NextResponse.json({ ok: true });
}
