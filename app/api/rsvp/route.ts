import { NextRequest, NextResponse } from "next/server";
import { redis } from "../../lib/redis";

const KEY = "rsvp";

type Response = {
  name: string;
  email: string;
  attending: string;
  guests: string;
  message: string;
  submittedAt: string;
};

async function readResponses(): Promise<Response[]> {
  return (await redis.get<Response[]>(KEY)) ?? [];
}

async function writeResponses(responses: Response[]) {
  await redis.set(KEY, responses);
}

export async function GET() {
  return NextResponse.json(await readResponses());
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
  await writeResponses(responses);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { phone } = await req.json();
  const digits = (phone || "").replace(/[^0-9]/g, "").slice(-9);
  if (!digits) return NextResponse.json({ ok: true, removed: 0 });
  const responses = await readResponses();
  const next = responses.filter((e) => (e.email || "").replace(/[^0-9]/g, "").slice(-9) !== digits);
  await writeResponses(next);
  return NextResponse.json({ ok: true, removed: responses.length - next.length });
}
