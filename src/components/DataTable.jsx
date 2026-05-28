import React from "react";

export default function DataTable({ items, type, onEdit, onRemove }) {
  // Dynamic styling based on the list type
  const getStyles = () => {
    switch (type) {
      case "channel":
        return {
          bg: "bg-green-950/40",
          border: "border-green-500/30",
          text: "text-green-200",
          highlight: "text-green-400",
          hoverBtn: "hover:text-blue-400",
          rmvBtn: "hover:text-red-400",
        };
      case "instrument":
        return {
          bg: "bg-slate-950/40",
          border: "border-slate-600/30",
          text: "text-slate-200",
          highlight: "text-slate-300",
          hoverBtn: "hover:text-blue-400",
          rmvBtn: "hover:text-red-400",
        };
      case "staff":
        return {
          bg: "bg-zinc-900/50",
          border: "border-blue-900/40",
          text: "text-zinc-300",
          highlight: "text-blue-400",
          hoverBtn: "hover:text-blue-400",
          rmvBtn: "hover:text-red-400",
        };
      default:
        return {
          bg: "bg-zinc-900",
          border: "border-zinc-800",
          text: "text-zinc-100",
          highlight: "text-white",
        };
    }
  };

  const s = getStyles();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-xs italic text-zinc-500 bg-zinc-900/20 rounded border border-zinc-800/50">
        List is empty.
      </div>
    );
  }

  // STAFF Render (Grid layout)
  if (type === "staff") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-2.5 rounded-lg border ${s.border} ${s.bg} flex flex-col gap-1 group`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-bold text-sm ${s.highlight}`}>
                  {item.name}
                </h3>
                <p className="text-[10px] font-semibold opacity-60">
                  {item.role}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono bg-blue-950/60 ${s.highlight} border border-blue-900/40 px-1.5 py-0.5 rounded`}
                >
                  {item.comms}
                </span>
                <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(type, item)}
                    className={`text-zinc-500 ${s.hoverBtn} text-[11px] font-bold p-0.5 cursor-pointer`}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className={`text-zinc-500 ${s.rmvBtn} text-[11px] font-bold p-0.5 cursor-pointer`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-0.5 font-mono">
              Station: {item.station}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // PERFORMERS & INSTRUMENTS Render (List layout)
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`p-2.5 rounded-lg border border-zinc-800 ${s.bg} ${s.text} flex items-center justify-between text-sm group`}
        >
          <div className="flex items-center gap-3">
            {type === "channel" && (
              <div
                className={`text-base font-black bg-black/40 px-2 py-0.5 rounded border border-white/10 w-12 text-center ${s.highlight}`}
              >
                CH {item.id}
              </div>
            )}
            <div>
              <h3 className="font-bold text-sm text-zinc-100">{item.name}</h3>
              {type === "channel" ? (
                <p className="text-[10px] opacity-60">
                  {item.role} • {item.mic}
                </p>
              ) : (
                <>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Musician:{" "}
                    <span className="text-zinc-300 font-normal">
                      {item.player}
                    </span>
                  </p>
                  <p className="text-[10px] opacity-50 mt-0.5">{item.type}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              {type === "channel" ? (
                <>
                  <div className="text-[9px] uppercase font-mono tracking-widest opacity-60">
                    Pack: {item.pack}
                  </div>
                  <div className="font-mono text-xs font-bold text-zinc-300">
                    {item.freq} {item.freq !== "Wired" ? "MHz" : ""}
                  </div>
                </>
              ) : (
                <div className="text-xs font-mono font-bold text-slate-400">
                  {item.monitor}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(type, item)}
                className="bg-zinc-900 hover:bg-blue-900 text-blue-400 rounded px-1.5 py-0.5 text-[10px] font-bold border border-zinc-800 transition-colors cursor-pointer"
              >
                ✎
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="bg-zinc-900 hover:bg-red-950 text-red-400 rounded px-1.5 py-0.5 text-[10px] font-bold border border-zinc-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
