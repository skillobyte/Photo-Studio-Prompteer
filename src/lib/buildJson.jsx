import formatAperture from "@/lib/formatAperture.jsx";
import formatShutter from "@/lib/formatShutter.jsx";

export default function buildJson(config) {
    let personDescription = "";
    switch (config.person) {
        case "No Change":
            personDescription = " The person's appearance should remain unchanged.";
            break;
        case "Less Change":
            personDescription = " The person's appearance can be subtly enhanced while maintaining their natural look.";
            break;
        case "Full Change":
            personDescription = " The person's appearance can be dramatically transformed, depending on the desired outcome.";
            break;
        default:
            personDescription = "";
    }
    return {
        prompt: `Edit and make these pictures ultra-detailed photograph of a ${config.subject}, captured with a ${config.camera} and ${config.lens}, ${formatAperture(config.aperture)}, ISO ${config.iso}, ${formatShutter(config.shutter)}, ${config.focal}mm focal length, ${config.naturalLight} natural light, ${config.artificialLight}, ${config.style} style, realistic textures, professional composition, highly refined photographic lighting.${personDescription}. With ${config.format} aspect ratio.  The final image should be a high-quality, ultra-detailed photograph that looks like it was taken with the specified camera and lens settings, showcasing the subject in the best possible way.`,
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
            ar: `--ar ${config.format}`,
        },
        sdxl: {
            realism: "photographic",
        },
        dalle: {
            detail: "ultra high resolution",
        },
    };
}