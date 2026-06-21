"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <input
        className="search-input"
        type="text"
        placeholder="Search shows by title…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search shows"
      />
    </div>
  );
}