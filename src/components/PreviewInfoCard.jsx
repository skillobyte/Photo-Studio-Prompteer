import React, { useMemo, useState } from "react";

export default function PreviewInfoCard({ icon: Icon, title, value }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-2">
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <div className="text-sm text-zinc-400">{title}</div>
                    <div className="font-medium">{value}</div>
                </div>
            </div>
        </div>
    );
}