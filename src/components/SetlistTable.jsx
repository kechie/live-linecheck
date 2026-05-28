import React from "react";

export default function SetlistTable({ setlist, onEdit, onRemove }) {
  if (setlist.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-zinc-500 italic bg-zinc-900/20 rounded border border-zinc-800">
        Setlist tracker is empty.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 shadow-md">
      <table className="w-full text-left border-collapse text-sm min-w-200">
        <thead>
          <tr className="bg-zinc-900 border-b border-zinc-800 font-bold text-zinc-300">
            <th className="p-3 w-16 text-center font-mono">No</th>
            <th className="p-3 w-1/4">Song Track</th>
            <th className="p-3 w-20 text-center font-mono">Time</th>
            <th className="p-3 w-36">Streaming Reference</th>
            <th className="p-3 w-36">Documentation Chart</th>
            <th className="p-3">Technical Cues / Execution Block</th>
            <th className="p-3 w-20 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60 font-medium text-zinc-200">
          {setlist.map((song) => (
            <tr
              key={song.id}
              className="hover:bg-zinc-900/50 transition-colors group"
            >
              <td className="p-3 text-center font-mono bg-black/10 text-zinc-400">
                {song.number}
              </td>
              <td className="p-3 font-bold text-zinc-100">{song.title}</td>
              <td className="p-3 text-center font-mono opacity-80">
                {song.duration}
              </td>
              <td className="p-3">
                {song.audioLink ? (
                  <a
                    href={song.audioLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-400 hover:text-green-300 underline font-semibold text-xs"
                  >
                    🎵 Media Link
                  </a>
                ) : (
                  <span className="text-zinc-600 text-xs italic">None</span>
                )}
              </td>
              <td className="p-3">
                {song.chartLink ? (
                  <a
                    href={song.chartLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline font-semibold text-xs"
                  >
                    📄 Open Chart
                  </a>
                ) : (
                  <span className="text-zinc-600 text-xs italic">None</span>
                )}
              </td>
              <td className="p-3 text-xs text-zinc-400 font-normal leading-relaxed">
                {song.notes}
              </td>
              <td className="p-3 text-center">
                <div className="flex gap-2 justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit("song", song)}
                    className="text-blue-400 hover:text-blue-300 font-bold text-[11px] cursor-pointer"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => onRemove(song.id)}
                    className="text-zinc-500 hover:text-red-400 font-bold text-[11px] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
