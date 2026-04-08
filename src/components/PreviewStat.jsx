import React from "react";

export default function PreviewStat({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">{label}</div>
            <div className="mt-1 line-clamp-2 text-sm font-medium text-white">{value}</div>
        </div>
    );
}