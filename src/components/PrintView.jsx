import React from "react";

export default function PrintView({
  selectedDateStr,
  channels,
  instruments,
  staff,
  setlist,
}) {
  // Format the date string into a nice readable format for the header
  const formatPrintDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const d = new Date(Date.UTC(year, month - 1, day));
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans">
      <header className="border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-tight">
          Stage Tech Master Manifest
        </h1>
        <p className="text-sm font-semibold mt-1 text-gray-700">
          Production Day: {formatPrintDate(selectedDateStr)}
        </p>
      </header>

      <div className="space-y-8">
        {/* SECTION 1: PERFORMERS */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-400 mb-3">
            1. Performers & Inputs
          </h2>
          <div className="space-y-1.5">
            {channels.map((ch) => (
              <div
                key={ch.id}
                className="flex justify-between border-b border-gray-200 py-1 font-mono text-sm"
              >
                <span>
                  <strong>CH {ch.id}</strong> — {ch.name} ({ch.role})
                </span>
                <span>
                  Freq: {ch.freq}{" "}
                  {ch.freq !== "Wired" && ch.freq !== "TBD" ? "MHz" : ""} |
                  Pack: {ch.pack}
                </span>
              </div>
            ))}
            {channels.length === 0 && (
              <div className="text-xs italic text-gray-500">
                No performers added.
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: INSTRUMENTS */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-400 mb-3">
            2. Instruments & Backline
          </h2>
          <div className="space-y-1.5">
            {instruments.map((inst) => (
              <div
                key={inst.id}
                className="flex justify-between border-b border-gray-200 py-1 text-sm"
              >
                <span>
                  <strong>{inst.name}</strong> (Musician: {inst.player}) —{" "}
                  <span className="font-mono text-xs text-gray-600">
                    {inst.type}
                  </span>
                </span>
                <span className="font-mono font-bold">{inst.monitor}</span>
              </div>
            ))}
            {instruments.length === 0 && (
              <div className="text-xs italic text-gray-500">
                No instruments added.
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: CREW */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-gray-400 mb-3">
            3. Production Crew
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {staff.map((member) => (
              <div
                key={member.id}
                className="border border-gray-300 p-2 font-mono text-xs rounded"
              >
                <div className="font-bold text-sm text-black">
                  {member.name} — {member.role}
                </div>
                <div>Station: {member.station}</div>
                <div>Comms Ring: {member.comms}</div>
              </div>
            ))}
            {staff.length === 0 && (
              <div className="text-xs italic text-gray-500 col-span-2">
                No crew members added.
              </div>
            )}
          </div>
        </div>

        {/* SECTION 4: STAGE PLOT (FORCES A PAGE BREAK) */}
        <div
          style={{ pageBreakBefore: "always", breakBefore: "page" }}
          className="pt-4"
        >
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-black mb-4">
            4. Stage Blocking Layout
          </h2>

          <div className="relative w-full h-137.5 bg-gray-50 border-2 border-black rounded overflow-hidden">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-gray-400">
              [ UPSTAGE / BACKSTAGE ]
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-gray-600 font-bold">
              ▼ --- AUDIENCE / PLENUM --- ▼
            </div>

            {/* Note: Framer Motion is stripped out here. These are pure, static HTML divs */}
            {channels.map((ch) => (
              <div
                key={ch.id}
                style={{ left: ch.defaultLeft, top: ch.defaultTop }}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-white border border-black p-2 rounded text-center text-xs font-bold min-w-22.5 shadow-sm"
              >
                <div className="text-[9px] text-gray-500 font-mono">
                  CH {ch.id}
                </div>
                <div className="truncate">{ch.name.split(" ")[0]}</div>
                <div className="text-[9px] text-gray-600 font-mono">
                  {ch.freq}
                </div>
              </div>
            ))}

            {instruments.map((inst) => (
              <div
                key={inst.id}
                style={{ left: inst.defaultLeft, top: inst.defaultTop }}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-gray-200 border border-black p-2 rounded text-center text-xs font-bold min-w-23.75 shadow-sm"
              >
                <div className="truncate">{inst.name}</div>
                <div className="text-[9px] text-gray-600">
                  👤 {inst.player.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: SETLIST (FORCES A PAGE BREAK) */}
        <div
          style={{ pageBreakBefore: "always", breakBefore: "page" }}
          className="pt-4"
        >
          <h2 className="text-xl font-bold uppercase tracking-wider border-b border-black mb-3">
            5. Production Setlist & Run Sheet
          </h2>
          <table className="w-full text-left border-collapse text-xs mt-2">
            <thead>
              <tr className="bg-gray-100 border-b border-black font-bold">
                <th className="p-2 border border-gray-300 w-12 text-center">
                  No
                </th>
                <th className="p-2 border border-gray-300 w-1/4">Song Track</th>
                <th className="p-2 border border-gray-300 w-16 text-center">
                  Time
                </th>
                <th className="p-2 border border-gray-300">
                  Media Resources & Tech Cues
                </th>
              </tr>
            </thead>
            <tbody>
              {setlist.map((song) => (
                <tr key={song.id} className="border-b border-gray-200">
                  <td className="p-2 border border-gray-300 text-center font-mono">
                    {song.number}
                  </td>
                  <td className="p-2 border border-gray-300 font-bold">
                    {song.title}
                  </td>
                  <td className="p-2 border border-gray-300 text-center font-mono">
                    {song.duration}
                  </td>
                  <td className="p-2 border border-gray-300 leading-normal text-gray-700">
                    {song.audioLink && (
                      <div className="font-mono text-[10px]">
                        • Audio: {song.audioLink}
                      </div>
                    )}
                    {song.chartLink && (
                      <div className="font-mono text-[10px]">
                        • Chart: {song.chartLink}
                      </div>
                    )}
                    <div className="mt-1 font-sans text-xs text-black">
                      <strong>Cues:</strong> {song.notes}
                    </div>
                  </td>
                </tr>
              ))}
              {setlist.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 border border-gray-300 text-center text-gray-500 italic"
                  >
                    No songs added to the setlist.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
