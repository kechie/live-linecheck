# Live LineCheck - A1 Master Console

A comprehensive React + Vite dashboard for managing live event production workflows. Organize performers, instruments, crew, and setlists with real-time stage plotting and automatic data persistence.

## Overview

**Live LineCheck** is a production management tool designed for audio engineers and stage managers to organize and visualize complex live events. The dashboard provides:

- **Performer & Channel Management**: Track vocalists and input channels with microphone types, frequencies, and wireless pack assignments
- **Instrument & Backline Organization**: Manage instruments, musicians, and monitor mixes
- **Crew Coordination**: Document production staff roles, stations, and communication channels
- **Setlist Planning**: Create and manage song lineups with duration, audio references, charts, and notes
- **Visual Stage Plot**: Interactive drag-and-drop stage layout to position performers and instruments
- **Per-Day Data Persistence**: Automatic localStorage saves organize data by date for multiple events
- **Import/Export**: JSON-based manifest system for sharing and archiving show configurations
- **Print-Ready Output**: Generate professional documentation for the entire production

## Features

### Core Functionality

- **Dynamic Date Switching**: Switch between different event dates and automatically load saved configurations
- **Drag-and-Drop Stage Layout**: Position performers and instruments on an interactive stage plot
- **Real-Time Data Persistence**: Changes automatically save to browser localStorage, organized by date
- **Modal Editing**: Edit any item (performers, staff, instruments, songs) through inline modals
- **Bulk Operations**: Import complete show manifests or export for backup and sharing
- **Reset Functionality**: Clear a day's data and return to template defaults
- **Print View**: Generate a comprehensive print layout of all show information

### Production-Ready Interface

- **Dark Mode UI**: Easy on the eyes for live event monitoring
- **Color-Coded Sections**: Red (performers), Blue (crew), Slate (instruments), Amber (setlist)
- **Responsive Design**: Works on desktop and tablet devices
- **Fast Performance**: Optimized React + Vite for instant responsiveness

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn (v4.15.0) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kechie/live-linecheck.git
cd live-linecheck

# Install dependencies
yarn install
# or
npm install
```

### Development

```bash
# Start the development server with HMR
yarn dev
# or
npm run dev
```

The app will open at `http://localhost:5173` with hot module replacement enabled.

### Build

```bash
# Create a production build
yarn build
# or
npm run build

# Preview the production build
yarn preview
# or
npm preview
```

## Project Structure

```
live-linecheck/
├── src/
│   ├── App.jsx              # Main application component
│   ├── components/          # Reusable UI components
│   │   ├── FormInput.jsx
│   │   ├── DataTable.jsx
│   │   ├── StagePlot.jsx
│   │   ├── SetlistTable.jsx
│   │   ├── EditModal.jsx
│   │   └── PrintView.jsx
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── init_data.txt        # Template data structure
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── eslint.config.js         # ESLint configuration
└── package.json             # Dependencies and scripts
```

## Usage Guide

### Performers & Inputs

1. **Add Performer**: Fill in the name, frequency, and wireless pack fields and click the `+` button
2. **Edit**: Click the edit icon on any performer row to modify details (role, mic type, frequency, pack)
3. **Remove**: Click the delete icon to remove a performer
4. **Position on Stage**: Drag the performer's node on the stage plot to adjust their position

### Instruments & Backline

1. **Add Instrument**: Enter the gear name and musician name, click `+`
2. **Edit**: Modify instrument details (type, monitor mix assignment)
3. **Remove**: Delete instruments from the list
4. **Stage Positioning**: Drag instrument nodes on the stage plot

### Live Production Crew

1. **Add Staff**: Enter crew member name and click `+` to add
2. **Edit**: Update role, station, and communications channel assignments
3. **Remove**: Delete crew members as needed

### Song Setlist

1. **Add Song**: Enter the song title and click `+`
2. **Edit**: Add song number, duration, audio links, chart references, and production notes
3. **Remove**: Delete songs from the setlist
4. **Organization**: Setlist updates automatically as you add/edit songs

### Stage Plot

- **Interactive Canvas**: Central right-column visualization of the stage layout
- **Drag Performers**: Click and drag performer nodes to reposition them on stage
- **Drag Instruments**: Move instrument nodes to their stage positions
- **Visual Reference**: Color-coded nodes indicate performer vs. instrument positions

### Managing Show Data

#### By Date

- **Date Picker**: Select any date to load that day's show configuration
- **Today Button**: Quick shortcut to return to today's data
- **Automatic Switching**: Data automatically switches when you change dates

#### Import/Export

- **Export**: Click `💾 Export` to download the current day's show as a JSON manifest
  - Filename format: `stage-manifest-YYYY-MM-DD.json`
  - Includes: channels, staff, instruments, setlist

- **Import**: Click `📁 Import` to load a previously exported JSON manifest
  - Overwrites the current day's configuration
  - Validates file format before loading

#### Reset & Print

- **Reset Day**: Click `⟲ Reset Day` to clear all data and return to template defaults
  - Confirmation required to prevent accidental data loss
- **Print**: Click `🖨️ Print` to generate a print-friendly view of all show data

## Data Structure

### Channel (Performer/Input)
```javascript
{
  id: number,
  name: string,
  role: string,
  mic: string,
  freq: string,
  pack: string,
  defaultLeft: string (percentage),
  defaultTop: string (percentage),
}
```

### Staff
```javascript
{
  id: number,
  name: string,
  role: string,
  station: string,
  comms: string,
}
```

### Instrument
```javascript
{
  id: number,
  name: string,
  player: string,
  type: string,
  monitor: string,
  defaultLeft: string (percentage),
  defaultTop: string (percentage),
}
```

### Song (Setlist)
```javascript
{
  id: number,
  number: string,
  title: string,
  duration: string,
  audioLink: string,
  chartLink: string,
  notes: string,
}
```

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4 + PostCSS
- **Animation**: Framer Motion 12
- **Bundler**: Yarn 4.15.0
- **Linting**: ESLint 10 with React hooks support
- **Plugins**: Vitejs React Plugin (Oxc)

## Browser Support

- Modern browsers with ES2020+ support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development Scripts

```bash
yarn dev        # Start development server with HMR
yarn build      # Create production build
yarn lint       # Run ESLint on source files
yarn preview    # Preview production build locally
```

## Configuration

### Vite
- **Port**: 5173 (default)
- **HMR Enabled**: Yes
- **Fast Refresh**: Yes

### Tailwind CSS
- **JIT Mode**: Enabled
- **Dark Mode**: Supported
- **Plugins**: @tailwindcss/vite

### ESLint
- **Parser**: @eslint/js
- **Plugins**: eslint-plugin-react-refresh, eslint-plugin-react-hooks
- **Target**: ES2020

## Storage & Persistence

- **Storage Backend**: Browser localStorage
- **Storage Key Format**: `stageTech_[type]_[YYYY-MM-DD]`
  - Example: `stageTech_channels_2024-05-28`
- **Data Types Stored**: channels, staff, instruments, setlist
- **Capacity**: ~5-10MB depending on browser
- **Persistence**: Data persists across browser sessions

## Tips & Best Practices

1. **Regular Exports**: Export your show manifests regularly for backup
2. **Template Data**: Use the provided template with your most common performers/staff
3. **Pre-Event Setup**: Set up your show 24-48 hours before the event
4. **Stage Plot**: Adjust positions during soundcheck; they'll save automatically
5. **Multi-Show Workflow**: Switch dates to manage multiple events in the same week
6. **Print Before Show**: Generate a print copy for the tech team to reference

## Troubleshooting

### Data Not Saving
- Check browser localStorage is enabled
- Verify you're not in private/incognito mode
- Clear browser cache if experiencing issues

### Stage Plot Not Updating
- Refresh the page to reload from localStorage
- Ensure JavaScript is enabled

### Import Failing
- Verify JSON file is valid and properly formatted
- Ensure file contains required fields: channels, staff, instruments, setlist

## License

Open source - feel free to modify and distribute

## Support

For issues, feature requests, or contributions, please open an issue on the GitHub repository.

---

**Live LineCheck** - Simplifying live event production management, one show at a time.

Built project can be found on [amian.tech](https://ccf-set.amian.tech/).
