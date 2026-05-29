import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component Imports
import FormInput from "./components/FormInput";
import DataTable from "./components/DataTable";
import StagePlot from "./components/StagePlot";
import SetlistTable from "./components/SetlistTable";
import EditModal from "./components/EditModal";
import PrintView from "./components/PrintView";

// --- LOCAL STORAGE HELPER FUNCTION ---
const loadSavedData = (storageKey, fallbackData) => {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : fallbackData;
  } catch (error) {
    console.error(`Error loading ${storageKey} from local storage`, error);
    return fallbackData;
  }
};

const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

export default function App() {
  const initialDate = getTodayString();
  const [selectedDateStr, setSelectedDateStr] = useState(initialDate);

  // Global State (Dynamically initialized using the current date in the storage key!)
  // const [channels, setChannels] = useState(() =>
  //   loadSavedData(`stageTech_channels_${initialDate}`, INITIAL_CHANNELS),
  // );
  // const [staff, setStaff] = useState(() =>
  //   loadSavedData(`stageTech_staff_${initialDate}`, INITIAL_STAFF),
  // );
  // const [instruments, setInstruments] = useState(() =>
  //   loadSavedData(`stageTech_instruments_${initialDate}`, INITIAL_INSTRUMENTS),
  // );
  // const [setlist, setSetlist] = useState(() =>
  //   loadSavedData(`stageTech_setlist_${initialDate}`, INITIAL_SETLIST),
  // );
  // Global States start clean and empty
  const [channels, setChannels] = useState([]);
  const [staff, setStaff] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [setlist, setSetlist] = useState([]);

  const stageRef = useRef(null);
  const fileInputRef = useRef(null);

  // UI States
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Input Form States
  const [newName, setNewName] = useState("");
  const [newFreq, setNewFreq] = useState("");
  const [newPack, setNewPack] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("Stage Manager");
  const [staffStation, setStaffStation] = useState("");
  const [staffComms, setStaffComms] = useState("");
  const [instName, setInstName] = useState("");
  const [instPlayer, setInstPlayer] = useState("");
  const [instType, setInstType] = useState("DI Box");
  const [instMon, setInstMon] = useState("");
  const [songNum, setSongNum] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songDuration, setSongDuration] = useState("");
  const [songAudio, setSongAudio] = useState("");
  const [songChart, setSongChart] = useState("");
  const [songNotes, setSongNotes] = useState("");
  // --- COMPONENT BOOT / DATE SWITCH LIFECYCLE ---
  useEffect(() => {
    const savedChannels = localStorage.getItem(
      `stageTech_channels_${selectedDateStr}`,
    );
    const savedStaff = localStorage.getItem(
      `stageTech_staff_${selectedDateStr}`,
    );
    const savedInstruments = localStorage.getItem(
      `stageTech_instruments_${selectedDateStr}`,
    );
    const savedSetlist = localStorage.getItem(
      `stageTech_setlist_${selectedDateStr}`,
    );

    // If ANY data exists in LocalStorage for this date, load it instantly
    if (savedChannels || savedStaff || savedInstruments || savedSetlist) {
      setChannels(savedChannels ? JSON.parse(savedChannels) : []);
      setStaff(savedStaff ? JSON.parse(savedStaff) : []);
      setInstruments(savedInstruments ? JSON.parse(savedInstruments) : []);
      setSetlist(savedSetlist ? JSON.parse(savedSetlist) : []);
    } else {
      // If today has completely clean memory, fetch our baseline template JSON file
      fetch("/init_data.json")
        .then((res) => res.json())
        .then((fallback) => {
          setChannels(fallback.channels || []);
          setStaff(fallback.staff || []);
          setInstruments(fallback.instruments || []);
          setSetlist(fallback.setlist || []);
        })
        .catch((err) =>
          console.error("Error seeding initial template manifest map:", err),
        );
    }
  }, [selectedDateStr]);
  // --- LOCAL STORAGE "WATCHERS" (useEffect) ---
  // FIXED: Added length guards so empty states don't overwrite memory on reset
  useEffect(() => {
    if (channels.length > 0) {
      localStorage.setItem(
        `stageTech_channels_${selectedDateStr}`,
        JSON.stringify(channels),
      );
    }
  }, [channels, selectedDateStr]);

  useEffect(() => {
    if (staff.length > 0) {
      localStorage.setItem(
        `stageTech_staff_${selectedDateStr}`,
        JSON.stringify(staff),
      );
    }
  }, [staff, selectedDateStr]);

  useEffect(() => {
    if (instruments.length > 0) {
      localStorage.setItem(
        `stageTech_instruments_${selectedDateStr}`,
        JSON.stringify(instruments),
      );
    }
  }, [instruments, selectedDateStr]);

  useEffect(() => {
    if (setlist.length > 0) {
      localStorage.setItem(
        `stageTech_setlist_${selectedDateStr}`,
        JSON.stringify(setlist),
      );
    }
  }, [setlist, selectedDateStr]);

  // --- DATE SWITCHING LOGIC ---
  // const loadDateData = (newDate) => {
  //   setSelectedDateStr(newDate);
  //   // When the date changes, instantly pull that day's data from memory (or load templates)
  //   setChannels(
  //     loadSavedData(`stageTech_channels_${newDate}`, INITIAL_CHANNELS),
  //   );
  //   setStaff(loadSavedData(`stageTech_staff_${newDate}`, INITIAL_STAFF));
  //   setInstruments(
  //     loadSavedData(`stageTech_instruments_${newDate}`, INITIAL_INSTRUMENTS),
  //   );
  //   setSetlist(loadSavedData(`stageTech_setlist_${newDate}`, INITIAL_SETLIST));
  // };
  // --- DATE SWITCHER CORRECTION ---
  const loadDateData = (newDate) => {
    setSelectedDateStr(newDate);
    // State arrays get wiped clean momentarily; the primary lifecycle watcher hook above handles re-seeding
    setChannels([]);
    setStaff([]);
    setInstruments([]);
    setSetlist([]);
  };
  // --- EXPORT / IMPORT LOGIC ---
  const handleExportShow = () => {
    const showData = { channels, staff, instruments, setlist };
    const blob = new Blob([JSON.stringify(showData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stage-manifest-${selectedDateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (
          parsed.channels &&
          parsed.staff &&
          parsed.instruments &&
          parsed.setlist
        ) {
          // This overwrites the current day's layout with the imported file
          setChannels(parsed.channels);
          setStaff(parsed.staff);
          setInstruments(parsed.instruments);
          setSetlist(parsed.setlist);
          alert("Show data imported successfully to the selected date!");
        } else {
          alert(
            "Invalid show file format. Please upload a valid JSON manifest.",
          );
        }
      } catch (error) {
        alert("Error reading the file.");
        console.error(error);
      }
      e.target.value = null;
    };
    reader.readAsText(file);
  };

  const handleResetDay = () => {
    if (
      window.confirm(
        `Are you sure you want to wipe all data for ${selectedDateStr}? This will reset today back to the defaults.`,
      )
    ) {
      // setChannels(INITIAL_CHANNELS);
      // setStaff(INITIAL_STAFF);
      // setInstruments(INITIAL_INSTRUMENTS);
      // setSetlist(INITIAL_SETLIST);

      // Clear out the specific keys for this day from the browser
      localStorage.removeItem(`stageTech_channels_${selectedDateStr}`);
      localStorage.removeItem(`stageTech_staff_${selectedDateStr}`);
      localStorage.removeItem(`stageTech_instruments_${selectedDateStr}`);
      localStorage.removeItem(`stageTech_setlist_${selectedDateStr}`);

      // Force reload the dashboard's storage cycle lifecycle hooks
      loadDateData(selectedDateStr);
    }
  };

  // Drag Handlers
  const handlePerformerDragEnd = (id, info, currentLeftPct, currentTopPct) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const finalLeft = Math.max(
      2,
      Math.min(
        98,
        parseFloat(currentLeftPct) + (info.offset.x / rect.width) * 100,
      ),
    );
    const finalTop = Math.max(
      2,
      Math.min(
        98,
        parseFloat(currentTopPct) + (info.offset.y / rect.height) * 100,
      ),
    );
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id
          ? { ...ch, defaultLeft: `${finalLeft}%`, defaultTop: `${finalTop}%` }
          : ch,
      ),
    );
  };

  const handleInstrumentDragEnd = (id, info, currentLeftPct, currentTopPct) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const finalLeft = Math.max(
      2,
      Math.min(
        98,
        parseFloat(currentLeftPct) + (info.offset.x / rect.width) * 100,
      ),
    );
    const finalTop = Math.max(
      2,
      Math.min(
        98,
        parseFloat(currentTopPct) + (info.offset.y / rect.height) * 100,
      ),
    );
    setInstruments((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, defaultLeft: `${finalLeft}%`, defaultTop: `${finalTop}%` }
          : i,
      ),
    );
  };

  const handleModalChange = (field, value) => {
    setEditingItem((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
    }));
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;
    const { type, data } = editingItem;
    if (type === "channel")
      setChannels((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    if (type === "staff")
      setStaff((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    if (type === "instrument")
      setInstruments((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    if (type === "song")
      setSetlist((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    setEditingItem(null);
  };

  // ==========================================
  // FIXED ADD HANDLERS
  // ==========================================
  const submitChannel = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const nextId =
      channels.length > 0 ? Math.max(...channels.map((c) => c.id)) + 1 : 1;
    setChannels([
      ...channels,
      {
        id: nextId,
        name: newName,
        role: "Performer",
        mic: "Handheld",
        freq: newFreq || "TBD",
        pack: newPack || "None",
        defaultLeft: "50%",
        defaultTop: "80%",
      },
    ]);
    setNewName("");
    setNewFreq("");
    setNewPack("");
  };

  const submitStaff = (e) => {
    e.preventDefault();
    if (!staffName.trim()) return;
    // FIXED: Maps from 'staff' instead of 'channels'
    const nextId =
      staff.length > 0 ? Math.max(...staff.map((s) => s.id)) + 1 : 1;
    setStaff([
      ...staff,
      {
        id: nextId,
        name: staffName,
        role: staffRole,
        station: staffStation || "TBD",
        comms: staffComms || "Ch 1",
      },
    ]);
    setStaffName("");
    setStaffStation("");
    setStaffComms("");
  };

  const submitInst = (e) => {
    e.preventDefault();
    if (!instName.trim()) return;
    // FIXED: Maps from 'instruments' instead of 'channels'
    const nextId =
      instruments.length > 0
        ? Math.max(...instruments.map((i) => i.id)) + 1
        : 1;
    setInstruments([
      ...instruments,
      {
        id: nextId,
        name: instName,
        player: instPlayer || "Sessionist",
        type: instType,
        monitor: instMon || "None",
        defaultLeft: "50%",
        defaultTop: "25%",
      },
    ]);
    setInstName("");
    setInstPlayer("");
    setInstMon("");
  };

  const submitSong = (e) => {
    e.preventDefault();
    if (!songTitle.trim()) return;
    // FIXED: Maps from 'setlist' instead of 'channels'
    const nextId =
      setlist.length > 0 ? Math.max(...setlist.map((s) => s.id)) + 1 : 1;
    setSetlist([
      ...setlist,
      {
        id: nextId,
        number: songNum || `${nextId}.0`,
        title: songTitle,
        duration: songDuration || "--:--",
        audioLink: songAudio,
        chartLink: songChart,
        notes: songNotes,
      },
    ]);
    setSongTitle("");
    setSongNum("");
    setSongDuration("");
    setSongAudio("");
    setSongChart("");
    setSongNotes("");
  };

  const triggerPrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 150);
  };

  // --- RENDER DEDICATED PRINT VIEW ---
  if (isPrintMode) {
    return (
      <PrintView
        selectedDateStr={selectedDateStr}
        channels={channels}
        instruments={instruments}
        staff={staff}
        setlist={setlist}
      />
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 min-h-screen font-sans select-none relative">
      {/* Hidden file input for importing JSON */}
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* HEADER */}
      <header className="mb-6 border-b border-zinc-800 pb-4 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-red-500">
            A1 Master Console
          </h1>
          <p className="text-sm text-zinc-400">
            Manage show assets below.{" "}
            <span className="text-amber-400 font-bold">Drag nodes</span> to
            adjust layouts. Data saves automatically per day.
          </p>
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Notice we changed the input onChange to loadDateData! */}
          <input
            type="date"
            value={selectedDateStr}
            onChange={(e) => loadDateData(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded px-3 h-10 text-sm font-mono cursor-pointer scheme-dark"
          />
          <button
            onClick={() => loadDateData(getTodayString())}
            className="bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 border border-red-900/50 rounded px-3 h-10 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            Today
          </button>

          <div className="flex gap-2 border-l border-zinc-800 pl-2">
            <button
              onClick={triggerImport}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 h-10 rounded-lg font-bold text-xs uppercase cursor-pointer transition-colors"
            >
              📁 Import
            </button>
            <button
              onClick={handleExportShow}
              className="bg-zinc-900 hover:bg-zinc-800 text-blue-400 border border-zinc-700 px-3 h-10 rounded-lg font-bold text-xs uppercase cursor-pointer transition-colors"
            >
              💾 Export
            </button>
          </div>

          <div className="flex gap-2 border-l border-zinc-800 pl-2">
            <button
              onClick={handleResetDay}
              className="bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50 px-3 h-10 rounded-lg font-bold text-xs uppercase cursor-pointer transition-colors"
            >
              ⟲ Reset Day
            </button>
            <button
              onClick={triggerPrint}
              className="bg-zinc-100 hover:bg-white text-black px-4 h-10 rounded-lg font-bold text-xs uppercase cursor-pointer transition-colors shadow-lg"
            >
              🖨️ Print
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* LEFT COLUMN: ARRAYS & FORMS */}
        <div className="space-y-6 max-h-155 overflow-y-auto pr-2">
          <div className="space-y-3">
            <h2 className="text-base font-bold px-1 border-l-4 border-red-500 pl-2">
              Performers & Inputs
            </h2>
            <FormInput onSubmit={submitChannel} colorTheme="red">
              <div className="flex-1 min-w-30">
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 focus:outline-none"
                />
              </div>
              <div className="w-24">
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">
                  Freq
                </label>
                <input
                  type="text"
                  value={newFreq}
                  onChange={(e) => setNewFreq(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 focus:outline-none font-mono"
                />
              </div>
              <div className="w-20">
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">
                  Pack
                </label>
                <input
                  type="text"
                  value={newPack}
                  onChange={(e) => setNewPack(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 focus:outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-black px-3 py-1 rounded h-8.5"
              >
                +
              </button>
            </FormInput>
            <DataTable
              items={channels}
              type="channel"
              onEdit={(t, data) => setEditingItem({ type: t, data })}
              onRemove={(id) =>
                setChannels((c) => c.filter((i) => i.id !== id))
              }
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold px-1 border-l-4 border-slate-400 pl-2">
              Instruments & Backline
            </h2>
            <FormInput onSubmit={submitInst} colorTheme="slate">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-400 mb-1">
                  Gear
                </label>
                <input
                  type="text"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-400 mb-1">
                  Musician
                </label>
                <input
                  type="text"
                  value={instPlayer}
                  onChange={(e) => setInstPlayer(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-600 hover:bg-slate-500 text-white font-black px-3 py-1 rounded h-8.5"
              >
                +
              </button>
            </FormInput>
            <DataTable
              items={instruments}
              type="instrument"
              onEdit={(t, data) => setEditingItem({ type: t, data })}
              onRemove={(id) =>
                setInstruments((i) => i.filter((x) => x.id !== id))
              }
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold px-1 border-l-4 border-blue-500 pl-2">
              Live Production Crew
            </h2>
            <FormInput onSubmit={submitStaff} colorTheme="blue">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-3 py-1 rounded h-8.5"
              >
                +
              </button>
            </FormInput>
            <DataTable
              items={staff}
              type="staff"
              onEdit={(t, data) => setEditingItem({ type: t, data })}
              onRemove={(id) => setStaff((s) => s.filter((x) => x.id !== id))}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: STAGE PLOT */}
        <StagePlot
          stageRef={stageRef}
          channels={channels}
          instruments={instruments}
          onPerformerDragEnd={handlePerformerDragEnd}
          onInstrumentDragEnd={handleInstrumentDragEnd}
        />
      </div>

      {/* BOTTOM AREA: SETLIST */}
      <div className="mt-8 border-t border-zinc-800 pt-6 space-y-4">
        <h2 className="text-lg font-bold px-1 border-l-4 border-amber-500 pl-2">
          Song Setlist Matrix
        </h2>
        <FormInput onSubmit={submitSong} colorTheme="amber">
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-zinc-400 mb-1">
              Song Title
            </label>
            <input
              type="text"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded p-2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-600 text-white font-black px-4 py-1.5 rounded h-9.5"
          >
            +
          </button>
        </FormInput>
        <SetlistTable
          setlist={setlist}
          onEdit={(t, data) => setEditingItem({ type: t, data })}
          onRemove={(id) => setSetlist((s) => s.filter((x) => x.id !== id))}
        />
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {editingItem && (
          <EditModal
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            handleModalChange={handleModalChange}
            saveEdit={saveEdit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
