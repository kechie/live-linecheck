import React from "react";

export default function PrintView({
  selectedDateStr,
  channels,
  instruments,
  staff,
  setlist,
}) {
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
    <div className="min-h-screen bg-white text-black p-4 font-sans">
      {/* INJECT NATIVE BLENDED PAGE RULES */}
      <style>{`
        @media print {
          /* Page 1 & 3: Standard Portrait style sheets */
          @page {
            size: portrait;
            margin: 20mm;
          }

          /* Page 2: Custom Horizontal style sheets */
          @page landscapePage {
            size: landscape;
            margin: 15mm;
          }

          .portrait-section {
            page-break-inside: avoid;
          }

          .forced-page-break {
            page-break-before: always !important;
            break-before: page !important;
          }

          /* Links the map container block explicitly to the landscape page setup */
          .landscape-print-container {
            page: landscapePage;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>

      {/* ========================================== */}
      {/* PAGE 1: TEXT MANIFESTS (PORTRAIT)        */}
      {/* ========================================== */}
      <div className="portrait-section">
        <header className="border-b-2 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-tight">
            Stage Tech Master Manifest
          </h1>
          <p className="text-sm font-semibold mt-1 text-gray-700">
            Production Day: {formatPrintDate(selectedDateStr)}
          </p>
        </header>

        <div className="space-y-8">
          {/* 1. PERFORMERS */}
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
                    Freq: {ch.freq} MHz | Pack: {ch.pack}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. INSTRUMENTS */}
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
            </div>
          </div>

          {/* 3. CREW */}
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
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* PAGE 2: MAP PLOT GRID (NATIVE LANDSCAPE)   */}
      {/* ========================================== */}
      <div className="forced-page-break landscape-print-container">
        <h2 className="text-xl font-bold uppercase tracking-wider border-b border-black mb-4">
          4. Stage Blocking Layout
        </h2>

        {/* Widened bounds to take advantage of the true wide layout */}
        <div className="relative w-full h-130 bg-gray-50 border-2 border-black rounded overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-gray-400">
            [ UPSTAGE / BACKSTAGE ]
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-gray-600 font-bold">
            ▼ --- AUDIENCE / PLENUM --- ▼
          </div>

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

      {/* ========================================== */}
      {/* PAGE 3: SETLIST MANIFEST (PORTRAIT)       */}
      {/* ========================================== */}
      <div className="forced-page-break portrait-section">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
