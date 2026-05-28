import React from 'react';

export default function FormInput({ onSubmit, title, children, colorTheme }) {
  // Define border focus colors based on the theme passed
  const themeColors = {
    red: 'focus:border-red-500 text-zinc-100',
    slate: 'focus:border-slate-400 text-zinc-100',
    blue: 'focus:border-blue-500 text-zinc-100',
    amber: 'focus:border-amber-500 text-zinc-100',
  };

  const activeTheme = themeColors[colorTheme] || themeColors.red;

  return (
    <form onSubmit={onSubmit} className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-wrap gap-3 items-end text-xs">
      {/* We use React.Children.map to inject our custom Tailwind focus classes into all input/select children automatically */}
      {React.Children.map(children, child => {
        // If it's the submit button or a non-input wrapper, return it as-is
        if (child.type === 'button' || child.props.className?.includes('flex-1') || child.props.className?.includes('w-')) {
            return child;
        }
        
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${activeTheme}`
        });
      })}
    </form>
  );
}