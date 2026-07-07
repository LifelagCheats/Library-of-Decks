import { type ImageMetadata } from "astro";

const images = import.meta.glob(
  "../assets/cards/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, ImageMetadata>;

const imageMap = Object.fromEntries(
  Object.entries(images).map(([path, image]) => {
    const filename = path.split("/").pop()!;

    return [filename, image];
  })
);

export function getCardImage(filename: string): ImageMetadata {
  const image = imageMap[filename];

  if (!image) {
    throw new Error(`Card image "${filename}" was not found.`);
  }

  return image;
}
