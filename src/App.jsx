import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
    Camera,
    Copy,
    Download,
    Sparkles,
    Sun,
    Moon,
    Focus,
    Lightbulb,
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
import buildJson from "@/lib/buildJson.jsx";
import ControlCard from "@/components/ControlCard.jsx";
import formatShutter from "@/lib/formatShutter.jsx";
import PhotoSetupPreview from "@/components/PhotoSetupPreview.jsx";
import formatAperture from "@/lib/formatAperture.jsx";


const CAMERA_MODELS = [
    "Blackmagic 6K",
    "Canon R5",
    "Sony A7IV",
    "Nikon Z8",
    "Fujifilm GFX100S",
    "Leica SL2",
    "Phase One XF",
    "RED Komodo",
];

const LENS_MODELS = [
    "24mm f/1.4",
    "35mm f/1.4",
    "50mm f/1.4",
    "85mm f/1.4",
    "105mm f/1.4",
    "70-200mm f/2.8",
    "100mm macro f/2.8",
    "16-35mm f/2.8",
];

const NATURAL_LIGHTS = [
    "golden hour",
    "blue hour",
    "cloudy diffuse",
    "overcast",
    "hard noon sun",
    "window side light",
    "sunrise haze",
    "sunset rim light",
];

const ARTIFICIAL_LIGHTS = [
    "softbox side",
    "ring light",
    "3-point lighting",
    "warm continuous light",
    "beauty dish",
    "LED panel",
    "strip light",
    "strobe with umbrella",
];

const STYLES = [
    "cinematic",
    "macro sharp",
    "documentary",
    "studio product clean",
    "professional portrait",
    "editorial fashion",
    "fine art realism",
    "high contrast noir",
];

const SUBJECTS = ["person", "product", "landscape", "object", "animal"];
const PERSONS = ["", "No Change", "Less Change", "Full Change"];
const FORMATS = ["1:1", "16:9", "9:16", "4:3"];

const PRESETS = {
    cinematic: {
        camera: "Blackmagic 6K",
        lens: "50mm f/1.4",
        iso: 800,
        aperture: 1.8,
        shutter: 1 / 60,
        focal: 50,
        naturalLight: "blue hour",
        artificialLight: "warm continuous light",
        style: "cinematic",
        subject: "person",
        format: "16:9",
        person: "Less Change",
    },
    product: {
        camera: "Canon R5",
        lens: "105mm f/1.4",
        iso: 200,
        aperture: 8,
        shutter: 1 / 125,
        focal: 105,
        naturalLight: "cloudy diffuse",
        artificialLight: "3-point lighting",
        style: "studio product clean",
        subject: "product",
        format: "1:1",
        person: "Full Change",
    },
    portrait: {
        camera: "Sony A7IV",
        lens: "85mm f/1.4",
        iso: 400,
        aperture: 1.6,
        shutter: 1 / 100,
        focal: 85,
        naturalLight: "golden hour",
        artificialLight: "softbox side",
        style: "professional portrait",
        subject: "person",
        format: "9:16",
        person: "No Change",
    },
};

const ISO_MARKS = [50, 100, 200, 400, 800, 1600, 3200, 6400];
const APERTURE_STOPS = [1.2, 1.4, 1.6, 1.8, 2, 2.8, 4, 5.6, 8, 11, 16];
const SHUTTER_STOPS = [
    1 / 2000,
    1 / 1000,
    1 / 500,
    1 / 250,
    1 / 125,
    1 / 100,
    1 / 60,
    1 / 30,
    1 / 15,
    1 / 8,
    1 / 4,
    1 / 2,
    1,
];

const getIndex = (arr, value) => {
    const index = arr.findIndex((item) => item === value);
    return index === -1 ? 0 : index;
};
export default function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [activeTab, setActiveTab] = useState("camera");
    const [config, setConfig] = useState({
        camera: "Sony A7IV",
        lens: "85mm f/1.4",
        iso: 400,
        aperture: 1.8,
        shutter: 1 / 125,
        focal: 85,
        naturalLight: "golden hour",
        artificialLight: "softbox side",
        style: "professional portrait",
        subject: "person",
        format: "9:16",
    });

    const jsonOutput = useMemo(() => buildJson(config), [config]);
    const jsonString = useMemo(() => JSON.stringify(jsonOutput, null, 2), [jsonOutput]);

    const updateConfig = (key, value) => setConfig((prev) => ({ ...prev, [key]: value }));

    const copyJson = async () => {
        await navigator.clipboard.writeText(jsonString);
        toast.success("JSON copied to clipboard!");
    };

    const [activePreset, setActivePreset] = useState("portrait");

    const applyPreset = (presetKey) => {
        setConfig(PRESETS[presetKey]);
        setActivePreset(presetKey);
    };

    const downloadTxt = () => {
        const blob = new Blob([jsonString], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "prompt.json.txt";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={cn(darkMode ? "dark" : "", "min-h-screen bg-background text-foreground transition-colors")}>
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_30%)]">
                <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]"
                    >
                        <div className="min-w-0 space-y-6">
                            <Card className="overflow-hidden border-zinc-200/80 shadow-sm dark:border-zinc-800">
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="space-y-3">
                                            <Badge className="rounded-full px-3 py-1 text-xs tracking-wide">
                                                Photo Studio Prompteer
                                            </Badge>
                                            <div>
                                                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                                    Build advanced photo prompts for image AIs
                                                </h1>
                                                <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                                                    Generate clean JSON prompts in English with Midjourney, SDXL, and DALL·E compatibility parameters.
                                                </p>

                                                <div className="flex justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <Sun size={16}/>
                                                        <Switch checked={darkMode} onCheckedChange={setDarkMode}/>
                                                        <Moon size={16}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <Button
                                                variant={activePreset === "cinematic" ? "secondary" : "outline"}
                                                onClick={() => applyPreset("cinematic")}
                                            >
                                                Preset: Cinematic
                                            </Button>
                                            <Button
                                                variant={activePreset === "product" ? "secondary" : "outline"}
                                                onClick={() => applyPreset("product")}
                                            >
                                                Preset: Product
                                            </Button>
                                            <Button
                                                variant={activePreset === "portrait" ? "secondary" : "outline"}
                                                onClick={() => applyPreset("portrait")}
                                            >
                                                Preset: Portrait
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="w-full min-w-0">
                                <Tabs
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                    className="flex w-full min-w-0 flex-col space-y-5"
                                >
                                    <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-2xl border border-zinc-200/70 bg-zinc-100/90 p-1.5 shadow-inner dark:border-zinc-800 dark:bg-zinc-900/80 md:grid-cols-4">
                                        <TabsTrigger
                                            value="camera"
                                            className="rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide text-zinc-600 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)] dark:text-zinc-400 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50"
                                        >
                                            Camera
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="lens"
                                            className="rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide text-zinc-600 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)] dark:text-zinc-400 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50"
                                        >
                                            Lens
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="lighting"
                                            className="rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide text-zinc-600 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)] dark:text-zinc-400 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50"
                                        >
                                            Lighting
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="style"
                                            className="rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide text-zinc-600 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)] dark:text-zinc-400 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50"
                                        >
                                            Style
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="camera"
                                        className="mt-0 w-full space-y-4 rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-1 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40"
                                    >
                                        <ControlCard
                                            title="Camera control"
                                            description="Choose the body and dial in the core exposure settings."
                                            icon={Camera}
                                        >
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label>Camera model</Label>
                                                    <Select value={config.camera} onValueChange={(value) => updateConfig("camera", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select camera" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {CAMERA_MODELS.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>ISO: {config.iso}</Label>
                                                    <Slider
                                                        min={0}
                                                        max={ISO_MARKS.length - 1}
                                                        step={1}
                                                        value={[getIndex(ISO_MARKS, config.iso)]}
                                                        onValueChange={(index) => updateConfig("iso", ISO_MARKS[index])}
                                                    />
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>50</span>
                                                        <span>6400</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Aperture: {formatAperture(config.aperture)}</Label>
                                                    <Slider
                                                        min={0}
                                                        max={APERTURE_STOPS.length - 1}
                                                        step={1}
                                                        value={[getIndex(APERTURE_STOPS, config.aperture)]}
                                                        onValueChange={(index) => updateConfig("aperture", APERTURE_STOPS[index])}
                                                    />
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>f/1.2</span>
                                                        <span>f/16</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Shutter: {formatShutter(config.shutter)}</Label>
                                                    <Slider
                                                        min={0}
                                                        max={SHUTTER_STOPS.length - 1}
                                                        step={1}
                                                        value={[getIndex(SHUTTER_STOPS, config.shutter)]}
                                                        onValueChange={(index) => updateConfig("shutter", SHUTTER_STOPS[index])}
                                                    />
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>1/2000s</span>
                                                        <span>1s</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ControlCard>
                                    </TabsContent>

                                    <TabsContent
                                        value="lens"
                                        className="mt-0 w-full space-y-4 rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-1 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40"
                                    >
                                        <ControlCard
                                            title="Lens selection"
                                            description="Pick the lens character and frame the image with focal length."
                                            icon={Focus}
                                        >
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label>Lens model</Label>
                                                    <Select value={config.lens} onValueChange={(value) => updateConfig("lens", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select lens" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {LENS_MODELS.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Focal length: {config.focal}mm</Label>
                                                    <Slider
                                                        min={10}
                                                        max={200}
                                                        step={1}
                                                        value={[config.focal]}
                                                        onValueChange={(value) => updateConfig("focal", value)}
                                                    />
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>10mm</span>
                                                        <span>200mm</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ControlCard>
                                    </TabsContent>

                                    <TabsContent
                                        value="lighting"
                                        className="mt-0 w-full space-y-4 rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-1 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40"
                                    >
                                        <ControlCard
                                            title="Lighting design"
                                            description="Mix ambient and controlled light or snap to a cinematic preset."
                                            icon={Lightbulb}
                                        >
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label>Natural light</Label>
                                                    <Select value={config.naturalLight} onValueChange={(value) => updateConfig("naturalLight", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select natural light" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {NATURAL_LIGHTS.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Artificial light</Label>
                                                    <Select value={config.artificialLight} onValueChange={(value) => updateConfig("artificialLight", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select artificial light" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ARTIFICIAL_LIGHTS.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <Separator className="my-6" />

                                            <div className="flex flex-wrap gap-3">
                                                <Button variant="outline" onClick={() => applyPreset("cinematic")}>
                                                    Preset: Cinematic
                                                </Button>
                                                <Button variant="outline" onClick={() => applyPreset("product")}>
                                                    Preset: Product
                                                </Button>
                                                <Button variant="outline" onClick={() => applyPreset("portrait")}>
                                                    Preset: Portrait
                                                </Button>
                                            </div>
                                        </ControlCard>
                                    </TabsContent>

                                    <TabsContent
                                        value="style"
                                        className="mt-0 w-full space-y-4 rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-1 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40"
                                    >
                                        <ControlCard
                                            title="Style & subject"
                                            description="Define visual intent and what the photographic setup is shooting."
                                            icon={Sparkles}
                                        >
                                            <div className="grid gap-6 md:grid-cols-4">
                                                <div className="space-y-1">
                                                    <Label>Style</Label>
                                                    <Select value={config.style} onValueChange={(value) => updateConfig("style", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select style" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {STYLES.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-1">
                                                    <Label>Subject</Label>
                                                    <Select value={config.subject} onValueChange={(value) => updateConfig("subject", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select subject" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {SUBJECTS.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label>Person</Label>
                                                    <Select value={config.person} onValueChange={(value) => updateConfig("person", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select person" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {PERSONS.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label>Format</Label>
                                                    <Select value={config.format} onValueChange={(value) => updateConfig("format", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select format" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {FORMATS.map((item) => (
                                                                <SelectItem key={item} value={item}>
                                                                    {item}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </ControlCard>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
                                <CardHeader>
                                    <CardTitle>JSON prompt output</CardTitle>
                                    <CardDescription>
                                        Structured for Midjourney, SDXL, and DALL·E workflows.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="rounded-3xl border bg-zinc-950 p-4 text-sm text-zinc-100">
                    <pre className="max-h-115 overflow-auto whitespace-pre-wrap wrap-break-word font-mono leading-6">
                      {jsonString}
                    </pre>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Button className="w-full" onClick={copyJson}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy JSON
                                        </Button>
                                        <Button variant="secondary" className="w-full" onClick={downloadTxt}>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download .txt
                                        </Button>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <div className="rounded-2xl border p-4">
                                            <div className="text-sm text-muted-foreground">Midjourney</div>
                                            <div className="mt-1 font-medium">
                                                {jsonOutput.midjourney.quality} • {jsonOutput.midjourney.ar}
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border p-4">
                                            <div className="text-sm text-muted-foreground">SDXL</div>
                                            <div className="mt-1 font-medium">{jsonOutput.sdxl.realism}</div>
                                        </div>
                                        <div className="rounded-2xl border p-4">
                                            <div className="text-sm text-muted-foreground">DALL·E</div>
                                            <div className="mt-1 font-medium">{jsonOutput.dalle.detail}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <PhotoSetupPreview config={config} darkMode={darkMode} />
                        </div>
                    </motion.div>
                </div>
            <Toaster duration={2000} />
            </div>
        </div>
    );
}