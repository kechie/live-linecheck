import React from "react";
import { motion } from "framer-motion";

export default function StagePlot({
  stageRef,
  channels,
  instruments,
  onPerformerDragEnd,
  onInstrumentDragEnd,
}) {
  return (
    <div className="flex flex-col h-137.5 lg:h-auto">
      <h2 className="text-lg font-bold text-zinc-300 px-1 mb-3">
        Interactive Blocking Map
      </h2>
      <div
        ref={stageRef}
        className="relative w-full bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-inner touch-none flex-1 min-h-125"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] uppercase font-mono tracking-widest text-zinc-600">
          [ UPSTAGE / BACKSTAGE ]
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">
          ▼ --- AUDIENCE / PLENUM --- ▼
        </div>

        {/* PERFORMER NODES */}
        {channels.map((ch) => (
          <motion.div
            key={`ch-${ch.id}-${ch.defaultLeft}-${ch.defaultTop}`}
            drag
            dragConstraints={stageRef}
            dragMomentum={false}
            onDragEnd={(e, info) =>
              onPerformerDragEnd(ch.id, info, ch.defaultLeft, ch.defaultTop)
            }
            whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
            style={{ left: ch.defaultLeft, top: ch.defaultTop }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded border border-green-500 bg-green-950 shadow-xl cursor-grab text-center text-xs font-bold min-w-23.75"
          >
            <div className="text-[8px] text-green-400 font-mono">
              CH {ch.id}
            </div>
            <div className="truncate text-zinc-100">
              {ch.name.split(" ")[0]}
            </div>
            <div className="text-[9px] text-green-300 font-mono">{ch.freq}</div>
          </motion.div>
        ))}

        {/* INSTRUMENT NODES */}
        {instruments.map((inst) => (
          <motion.div
            key={`inst-${inst.id}-${inst.defaultLeft}-${inst.defaultTop}`}
            drag
            dragConstraints={stageRef}
            dragMomentum={false}
            onDragEnd={(e, info) =>
              onInstrumentDragEnd(
                inst.id,
                info,
                inst.defaultLeft,
                inst.defaultTop,
              )
            }
            whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
            style={{ left: inst.defaultLeft, top: inst.defaultTop }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded border border-slate-600 bg-slate-800 shadow-xl cursor-grab text-center text-xs font-bold min-w-25"
          >
            <div className="truncate text-zinc-100">{inst.name}</div>
            <div className="text-[10px] font-normal text-slate-300 truncate border-t border-slate-700 mt-0.5 pt-0.5">
              👤 {inst.player.split(" ")[0]}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
