import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Camera,
    Copy,
    Download,
    Sparkles,
    Sun,
    Moon,
    Aperture,
    TimerReset,
    Focus,
    Lightbulb,
    Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import formatShutter from "@/lib/formatShutter.jsx";
import formatAperture from "@/lib/formatAperture.jsx";
import PreviewStat from "@/components/PreviewStat.jsx";
import PreviewInfoCard from "@/components/PreviewInfoCard.jsx";

export default function PhotoSetupPreview({ config, darkMode }) {
    const sceneLabel = `${config.subject} scene`;

    return (
        <Card className="overflow-hidden border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-2xl dark:border-white/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <ImageIcon className="h-5 w-5" />
                    Photo Setup Preview
                </CardTitle>
                <CardDescription className="text-zinc-300">
                    Live visual mockup of the generated photographic setup.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <motion.div
                        layout
                        className={cn(
                            "relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 p-6",
                            darkMode
                                ? "bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.9),rgba(9,9,11,0.95))]"
                                : "bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.25),_transparent_35%),linear-gradient(180deg,rgba(63,63,70,0.85),rgba(9,9,11,0.95))]"
                        )}
                    >
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-yellow-200 blur-3xl" />
                            <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-blue-400 blur-3xl" />
                        </div>

                        <div className="relative flex h-full flex-col justify-between gap-6">
                            <div className="flex items-start justify-between gap-3">
                                <Badge variant="secondary" className="border-0 bg-white/10 px-3 py-1 text-white">
                                    {config.style}
                                </Badge>
                                <Badge variant="secondary" className="border-0 bg-white/10 px-3 py-1 text-white">
                                    {config.naturalLight}
                                </Badge>
                            </div>

                            <div className="mx-auto flex h-48 w-full max-w-sm items-center justify-center rounded-[2rem] border border-dashed border-white/20 bg-white/5 backdrop-blur-sm">
                                <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
                                    <div className="absolute h-24 w-24 rounded-full border border-white/15 bg-black/40" />
                                    <div className="absolute h-14 w-14 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                                    <div className="absolute -bottom-9 flex w-max items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        {sceneLabel}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm text-zinc-200 sm:grid-cols-3">
                                <PreviewStat label="Camera" value={config.camera} />
                                <PreviewStat label="Lens" value={config.lens} />
                                <PreviewStat label="Aperture" value={formatAperture(config.aperture)} />
                                <PreviewStat label="ISO" value={String(config.iso)} />
                                <PreviewStat label="Shutter" value={formatShutter(config.shutter)} />
                                <PreviewStat label="Focal" value={`${config.focal}mm`} />
                                <PreviewStat label="Natural" value={config.naturalLight} />
                                <PreviewStat label="Artificial" value={config.artificialLight} />
                                <PreviewStat label="Subject" value={config.subject} />
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid gap-3">
                        <PreviewInfoCard icon={Camera} title="Camera body" value={config.camera} />
                        <PreviewInfoCard icon={Focus} title="Lens & focus" value={`${config.lens} • ${config.focal}mm`} />
                        <PreviewInfoCard
                            icon={Aperture}
                            title="Exposure"
                            value={`${formatAperture(config.aperture)} • ISO ${config.iso} • ${formatShutter(config.shutter)}`}
                        />
                        <PreviewInfoCard icon={Lightbulb} title="Lighting" value={`${config.naturalLight} + ${config.artificialLight}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}