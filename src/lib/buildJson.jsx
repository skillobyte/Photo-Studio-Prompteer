import formatAperture from "@/lib/formatAperture.jsx";
import formatShutter from "@/lib/formatShutter.jsx";

export default function buildJson(config) {
    return {
        prompt: `Edit and make these pictures ultra-detailed photograph of a ${config.subject}, captured with a ${config.camera} and ${config.lens}, ${formatAperture(config.aperture)}, ISO ${config.iso}, ${formatShutter(config.shutter)}, ${config.focal}mm focal length, ${config.naturalLight} natural light, ${config.artificialLight}, ${config.style} style, realistic textures, professional composition, highly refined photographic lighting.`,
        camera: config.camera,
        lens: config.lens,
        exposure: {
            iso: config.iso,
            aperture: formatAperture(config.aperture),
            shutter: formatShutter(config.shutter),
        },
        focal_length_mm: config.focal,
        lighting: {
            natural: config.naturalLight,
            artificial: config.artificialLight,
        },
        style: config.style,
        midjourney: {
            quality: "--q 2",
            ar: "--ar 3:2",
        },
        sdxl: {
            realism: "photographic",
        },
        dalle: {
            detail: "ultra high resolution",
        },
    };
}