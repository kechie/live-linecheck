import React from "react";
import { motion } from "framer-motion";

export default function EditModal({
  editingItem,
  setEditingItem,
  handleModalChange,
  saveEdit,
}) {
  if (!editingItem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
          <h3 className="text-lg font-bold text-zinc-100 uppercase tracking-wider">
            Update{" "}
            {editingItem.type === "channel"
              ? "Performer"
              : editingItem.type === "staff"
                ? "Crew Member"
                : editingItem.type === "instrument"
                  ? "Instrument"
                  : "Song"}
          </h3>
          <button
            onClick={() => setEditingItem(null)}
            className="text-zinc-500 hover:text-white transition cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={saveEdit} className="space-y-4">
          {/* PERFORMER EDIT FIELDS */}
          {editingItem.type === "channel" && (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                  Performer Name
                </label>
                <input
                  type="text"
                  value={editingItem.data.name}
                  onChange={(e) => handleModalChange("name", e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Freq (MHz)
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.freq}
                    onChange={(e) => handleModalChange("freq", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Pack Info
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.pack}
                    onChange={(e) => handleModalChange("pack", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {/* INSTRUMENT EDIT FIELDS */}
          {editingItem.type === "instrument" && (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                  Instrument Gear
                </label>
                <input
                  type="text"
                  value={editingItem.data.name}
                  onChange={(e) => handleModalChange("name", e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                  Musician Name
                </label>
                <input
                  type="text"
                  value={editingItem.data.player}
                  onChange={(e) => handleModalChange("player", e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Input Style
                  </label>
                  <select
                    value={editingItem.data.type}
                    onChange={(e) => handleModalChange("type", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-slate-400"
                  >
                    <option value="DI Box">DI Box</option>
                    <option value="Stereo DI">Stereo DI</option>
                    <option value="Instrument Mic">Instrument Mic</option>
                    <option value="Line Level">Line Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Mon Mix
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.monitor}
                    onChange={(e) =>
                      handleModalChange("monitor", e.target.value)
                    }
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>
            </>
          )}

          {/* STAFF EDIT FIELDS */}
          {editingItem.type === "staff" && (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                  Crew Name
                </label>
                <input
                  type="text"
                  value={editingItem.data.name}
                  onChange={(e) => handleModalChange("name", e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                  Role
                </label>
                <select
                  value={editingItem.data.role}
                  onChange={(e) => handleModalChange("role", e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Stage Manager">Stage Manager</option>
                  <option value="Assistant SM">Assistant SM</option>
                  <option value="A1 Audio Engineer">A1 Eng</option>
                  <option value="A2 Deck Audio">A2 Deck</option>
                  <option value="Light Board Op">Light Board Op</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Station
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.station}
                    onChange={(e) =>
                      handleModalChange("station", e.target.value)
                    }
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Comms
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.comms}
                    onChange={(e) => handleModalChange("comms", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {/* SONG EDIT FIELDS */}
          {editingItem.type === "song" && (
            <>
              <div className="grid grid-cols-[80px_1fr] gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Act / No
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.number}
                    onChange={(e) =>
                      handleModalChange("number", e.target.value)
                    }
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-amber-500 text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Song Track Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.data.title}
                    onChange={(e) => handleModalChange("title", e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Audio URL
                  </label>
                  <input
                    type="url"
                    value={editingItem.data.audioLink}
                    onChange={(e) =>
                      handleModalChange("audioLink", e.target.value)
                    }
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                    Chart URL
                  </label>
                  <input
                    type="url"
                    value={editingItem.data.chartLink}
                    onChange={(e) =>
                      handleModalChange("chartLink", e.target.value)
                    }
                    className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">
                  Tech Cues / Notes
                </label>
                <input
                  type="text"
                  value={editingItem.data.notes}
                  onChange={(e) => handleModalChange("notes", e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </>
          )}

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded font-bold text-sm text-zinc-400 hover:text-zinc-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
