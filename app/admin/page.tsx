"use client";

import { useEffect, useState } from "react";

type RSVPEntry = {
  name: string;
  email: string;
  attending: string;
  guests: string;
  message: string;
  submittedAt: string;
};

type Guest = {
  id: string;
  name: string;
  phone: string;
  side: "groom" | "bride";
  plannedGuests: number;
  invited: boolean;
};

export default function AdminPage() {
  const [entries, setEntries] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [invitePhraseTarget, setInvitePhraseTarget] = useState("ඔබ දෙපළට");
  const [savingPhrase, setSavingPhrase] = useState(false);

  const phraseOptions = ["ඔබට", "ඔබ දෙපළට", "ඔබ සැමට"];

  const [guests, setGuests] = useState<Guest[]>([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSide, setNewSide] = useState<"groom" | "bride">("groom");
  const [newQty, setNewQty] = useState("1");

  const loadGuests = () => {
    fetch("/api/guests").then((r) => r.json()).then(setGuests).catch(() => {});
  };

  const addGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), phone: newPhone.trim(), side: newSide, plannedGuests: newQty }),
    })
      .then((r) => r.json())
      .then((g) => { setGuests((prev) => [...prev, g]); setNewName(""); setNewPhone(""); setNewQty("1"); });
  };

  const sendInvite = (g: Guest) => {
    if (!(g.phone || "").trim()) return;
    const digits = (g.phone || "").replace(/[^0-9]/g, "");
    const intl = digits.startsWith("0") ? "94" + digits.slice(1) : digits;
    const link = `${window.location.origin}/?p=${encodeURIComponent(g.phone)}&n=${encodeURIComponent(g.name)}&g=${encodeURIComponent(String(g.plannedGuests))}`;
    const message =
      `ආරාධනාවයි! 🌸\n\n${g.name} ඔබට, විහඟ සහ සඳලිගේ විවාහ මංගල්‍යයට සහභාගී වන ලෙස ගෞරවයෙන් ආරාධනා කර සිටිමු.\n\n` +
      `ආරාධනා පත්‍රය මෙතැනින් බලන්න: ${link}\n\nකරුණාකර ඔබගේ පැමිණීම තහවුරු කරන්න (RSVP).`;
    window.open(`https://wa.me/${intl}?text=${encodeURIComponent(message)}`, "_blank");
    if (!g.invited) toggleInvited(g);
  };

  const toggleInvited = (g: Guest) => {
    const updated = { ...g, invited: !g.invited };
    setGuests((prev) => prev.map((x) => (x.id === g.id ? updated : x)));
    fetch("/api/guests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: g.id, invited: updated.invited }),
    });
  };

  const removeGuest = (id: string) => {
    const g = guests.find((x) => x.id === id);
    setGuests((prev) => prev.filter((x) => x.id !== id));
    fetch("/api/guests", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (g && (g.phone || "").trim()) {
      fetch("/api/rsvp", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: g.phone }) })
        .then(() => load())
        .catch(() => {});
    }
  };

  const findResponse = (g: Guest) => {
    if (!g.invited) return undefined;
    const recent = [...entries].reverse();
    const byName = recent.find((e) => e.name.trim().toLowerCase() === g.name.trim().toLowerCase());
    if (byName) return byName;
    if (!(g.phone || "").trim()) return undefined;
    const gDigits = (g.phone || "").replace(/[^0-9]/g, "").slice(-9);
    if (!gDigits) return undefined;
    return recent.find((e) => !!e.email && e.email.replace(/[^0-9]/g, "").slice(-9) === gDigits);
  };

  const savePhrase = (value: string) => {
    setInvitePhraseTarget(value);
    setSavingPhrase(true);
    fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitePhraseTarget: value }),
    }).finally(() => setSavingPhrase(false));
  };

  const load = () => {
    setLoading(true);
    fetch("/api/rsvp")
      .then((r) => r.json())
      .then((data) => setEntries(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    loadGuests();
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => { if (d.invitePhraseTarget) setInvitePhraseTarget(d.invitePhraseTarget); })
      .catch(() => {});
  }, []);

  const accepted = entries.filter((e) => e.attending === "yes");
  const declined = entries.filter((e) => e.attending === "no");
  const totalGuests = accepted.reduce((sum, e) => sum + (parseInt(e.guests, 10) || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0", padding: "48px 20px", fontFamily: "'Cormorant Garamond', serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, color: "#3d2b2b", marginBottom: 8 }}>RSVP Dashboard</h1>
        <p style={{ color: "#7a5c5c", marginBottom: 28 }}>Vihanga &amp; Sandali — Wedding Invitations</p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          {[
            { label: "Total Responses", value: entries.length },
            { label: "Joyfully Accepted", value: accepted.length },
            { label: "Regretfully Declined", value: declined.length },
            { label: "Total Guests Attending", value: totalGuests },
          ].map((s) => (
            <div key={s.label} style={{ flex: "1 1 180px", background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 4px 16px rgba(61,43,43,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#c9a96e" }}>{s.value}</div>
              <div style={{ fontSize: 14, color: "#7a5c5c", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <form
          onSubmit={addGuest}
          style={{ background: "#fff", borderRadius: 12, padding: "18px 24px", marginBottom: 24, border: "1px solid rgba(201,169,110,0.25)", display: "flex", alignItems: "flex-end", gap: 14, flexWrap: "wrap" }}
        >
          <div>
            <label style={{ display: "block", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#7a5c5c", marginBottom: 6 }}>Invitation phrase</label>
            <select
              value={invitePhraseTarget}
              onChange={(e) => {
                savePhrase(e.target.value);
                if (e.target.value === "ඔබට") setNewQty("1");
                else if (e.target.value === "ඔබ දෙපළට") setNewQty("2");
              }}
              style={{ fontFamily: "'Noto Serif Sinhala', serif", fontSize: 15, padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(201,169,110,0.4)", background: "#fdf6f0", color: "#3d2b2b" }}
            >
              {phraseOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {savingPhrase && <span style={{ fontSize: 13, color: "#a89090" }}>Saving…</span>}
          <div>
            <label style={{ display: "block", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#7a5c5c", marginBottom: 6 }}>Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Guest or family name"
              style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(201,169,110,0.4)", fontFamily: "inherit", fontSize: 15, minWidth: 200 }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#7a5c5c", marginBottom: 6 }}>WhatsApp Number</label>
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              onClick={async () => {
                const nav = navigator as any;
                if (nav.contacts && nav.contacts.select) {
                  try {
                    const contacts = await nav.contacts.select(["name", "tel"], { multiple: false });
                    if (contacts && contacts[0]) {
                      const c = contacts[0];
                      if (c.tel && c.tel[0]) setNewPhone(c.tel[0]);
                      if (c.name && c.name[0] && !newName.trim()) setNewName(c.name[0]);
                    }
                  } catch {}
                }
              }}
              placeholder="07XXXXXXXX"
              style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(201,169,110,0.4)", fontFamily: "inherit", fontSize: 15, minWidth: 150, cursor: "pointer" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#7a5c5c", marginBottom: 6 }}>Side</label>
            <select
              value={newSide}
              onChange={(e) => setNewSide(e.target.value as "groom" | "bride")}
              style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(201,169,110,0.4)", fontFamily: "inherit", fontSize: 15 }}
            >
              <option value="groom">Groom's Side</option>
              <option value="bride">Bride's Side</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#7a5c5c", marginBottom: 6 }}>Planned Guests</label>
            <input
              type="number"
              min={1}
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(201,169,110,0.4)", fontFamily: "inherit", fontSize: 15, width: 100 }}
            />
          </div>
          <button
            type="submit"
            style={{ background: "#c9a96e", color: "#fff", border: "none", borderRadius: 6, padding: "9px 22px", cursor: "pointer", fontSize: 14, letterSpacing: 1 }}
          >
            + Add Guest
          </button>
          <a
            href="/#story"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "auto", fontSize: 14, color: "#c9a96e", textDecoration: "underline", whiteSpace: "nowrap" }}
          >
            View Invitation ↗
          </a>
        </form>

        {(() => {
          const invitedCount = guests.filter((g) => g.invited).length;
          const confirmedComing = guests.reduce((sum, g) => {
            const resp = findResponse(g);
            return sum + (resp && resp.attending === "yes" ? (parseInt(resp.guests, 10) || 0) : 0);
          }, 0);
          const sideTotal = (side: "groom" | "bride") =>
            guests.filter((g) => g.side === side).reduce((sum, g) => sum + (g.plannedGuests || 0), 0);
          const sideConfirmed = (side: "groom" | "bride") =>
            guests.filter((g) => g.side === side).reduce((sum, g) => {
              const resp = findResponse(g);
              return sum + (resp && resp.attending === "yes" ? (parseInt(resp.guests, 10) || 0) : 0);
            }, 0);
          return (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
              {[
                { label: "Guests Invited", value: invitedCount },
                { label: "Members Coming to Wedding", value: confirmedComing },
                { label: "Groom's Side Total (Confirmed / Planned)", value: `${sideConfirmed("groom")} / ${sideTotal("groom")}` },
                { label: "Bride's Side Total (Confirmed / Planned)", value: `${sideConfirmed("bride")} / ${sideTotal("bride")}` },
              ].map((s) => (
                <div key={s.label} style={{ flex: "1 1 220px", background: "#fff", borderRadius: 12, padding: "20px 24px", boxShadow: "0 4px 16px rgba(61,43,43,0.08)", border: "1px solid rgba(201,169,110,0.25)" }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#c9a96e" }}>{s.value}</div>
                  <div style={{ fontSize: 14, color: "#7a5c5c", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          );
        })()}

        <h3 style={{ fontSize: 20, color: "#3d2b2b", marginBottom: 12 }}>
          All Guests <span style={{ color: "#a89090", fontWeight: 400, fontSize: 15 }}>({guests.length})</span>
        </h3>
        {guests.length === 0 ? (
          <p style={{ color: "#a89090", fontSize: 14, background: "#fff", padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(201,169,110,0.25)", marginBottom: 32 }}>No guests added yet.</p>
        ) : (
          <style>{`
            @media (max-width: 760px) {
              .guest-table thead { display: none; }
              .guest-table, .guest-table tbody, .guest-table tr, .guest-table td { display: block; width: 100%; }
              .guest-table tr { border-top: 1px solid rgba(201,169,110,0.15); padding: 12px 16px; }
              .guest-table td { padding: 6px 0 !important; border: none !important; white-space: normal !important; }
              .guest-table td::before {
                content: attr(data-label);
                display: block;
                font-size: 11px;
                letter-spacing: 1px;
                text-transform: uppercase;
                color: #a89090;
                margin-bottom: 2px;
              }
            }
          `}</style>
          <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12, border: "1px solid rgba(201,169,110,0.25)", marginBottom: 32 }}>
            <table className="guest-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "rgba(201,169,110,0.12)", textAlign: "left" }}>
                  {["Name", "Side", "Phone", "Planned", "Confirmed Coming", "Invited", "RSVP Status", "Message", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", color: "#3d2b2b", letterSpacing: 1, textTransform: "uppercase", fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guests.map((g) => {
                  const resp = findResponse(g);
                  const confirmedCount = resp && resp.attending === "yes" ? (parseInt(resp.guests, 10) || 0) : null;
                  const declined = resp && resp.attending === "no";
                  return (
                    <tr key={g.id} style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}>
                      <td data-label="Name" style={{ padding: "12px 16px", color: "#3d2b2b", fontWeight: 600 }}>{g.name}</td>
                      <td data-label="Side" style={{ padding: "12px 16px" }}>
                        <span style={{
                          padding: "3px 10px", borderRadius: 20, fontSize: 12,
                          background: g.side === "groom" ? "rgba(99,102,241,0.12)" : "rgba(236,72,153,0.12)",
                          color: g.side === "groom" ? "#4338ca" : "#be185d",
                        }}>
                          {g.side === "groom" ? "Groom's Side" : "Bride's Side"}
                        </span>
                      </td>
                      <td data-label="Phone" style={{ padding: "12px 16px", color: "#7a5c5c" }}>{g.phone || "—"}</td>
                            <td data-label="Planned" style={{ padding: "12px 16px", color: "#7a5c5c" }}>{g.plannedGuests}</td>
                            <td data-label="Confirmed Coming" style={{ padding: "12px 16px", color: confirmedCount !== null ? "#2e7d32" : declined ? "#c62828" : "#a89090", fontWeight: confirmedCount !== null ? 600 : 400 }}>
                              {confirmedCount !== null ? confirmedCount : declined ? "0 (declined)" : "—"}
                            </td>
                            <td data-label="Invited" style={{ padding: "12px 16px" }}>
                              <label style={{ display: "flex", alignItems: "center", gap: 6, color: "#7a5c5c", fontSize: 13, cursor: "pointer" }}>
                                <input type="checkbox" checked={g.invited} onChange={() => toggleInvited(g)} />
                                {g.invited ? "Invited" : "Not invited"}
                              </label>
                            </td>
                            <td data-label="RSVP Status" style={{ padding: "12px 16px" }}>
                              {resp ? (
                                <span style={{
                                  padding: "4px 12px", borderRadius: 20, fontSize: 12,
                                  background: resp.attending === "yes" ? "rgba(76,175,80,0.15)" : "rgba(244,67,54,0.12)",
                                  color: resp.attending === "yes" ? "#2e7d32" : "#c62828",
                                }}>
                                  {resp.attending === "yes" ? "Accepted" : "Declined"}
                                </span>
                              ) : (
                                <span style={{ color: "#a89090", fontSize: 12 }}>No response yet</span>
                              )}
                            </td>
                            <td data-label="Message" style={{ padding: "12px 16px", color: "#7a5c5c", maxWidth: 220 }}>
                              {resp?.message || "—"}
                            </td>
                            <td data-label="Actions" style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                              <button
                                onClick={() => sendInvite(g)}
                                disabled={!(g.phone || "").trim()}
                                title={(g.phone || "").trim() ? "Send invitation via WhatsApp" : "Add a WhatsApp number first"}
                                style={{
                                  background: (g.phone || "").trim() ? "#25D366" : "rgba(0,0,0,0.08)",
                                  color: (g.phone || "").trim() ? "#fff" : "#a89090",
                                  border: "none", borderRadius: 6, padding: "7px 14px", cursor: (g.phone || "").trim() ? "pointer" : "not-allowed",
                                  fontSize: 13, marginRight: 12,
                                }}
                              >
                                Send via WhatsApp
                              </button>
                              <button
                                onClick={() => removeGuest(g.id)}
                                style={{ background: "none", border: "none", color: "#c62828", cursor: "pointer", fontSize: 13 }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                  })}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={load}
          style={{ marginBottom: 16, background: "#c9a96e", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", cursor: "pointer", fontSize: 14, letterSpacing: 1 }}
        >
          ↻ Refresh
        </button>

      </div>
    </div>
  );
}
