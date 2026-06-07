import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "rsvp.json");

async function readResponses() {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function GET() {
  const responses = await readResponses();
  return NextResponse.json(responses);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const responses = await readResponses();
  responses.push({
    name: body.name ?? "",
    email: body.email ?? "",
    attending: body.attending ?? "yes",
    guests: body.guests ?? "1",
    message: body.message ?? "",
    submittedAt: new Date().toISOString(),
  });
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(responses, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { phone } = await req.json();
  const digits = (phone || "").replace(/[^0-9]/g, "").slice(-9);
  if (!digits) return NextResponse.json({ ok: true, removed: 0 });
  const responses: { email?: string }[] = await readResponses();
  const next = responses.filter((e) => (e.email || "").replace(/[^0-9]/g, "").slice(-9) !== digits);
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(next, null, 2), "utf-8");
  return NextResponse.json({ ok: true, removed: responses.length - next.length });
}
