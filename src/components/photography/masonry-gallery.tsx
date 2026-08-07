import Image from "next/image";

import { CameraIcon } from "@/components/ui/icon";

export type GalleryPhoto = {
  image: string;
  alt: string;
  href: string;
};

type MasonryGalleryProps = {
  photos: GalleryPhoto[];
};

// No client JS: the grayscale-to-color reveal and caption are pure CSS
// hover/focus states, so this stays a server component like the rest of the
// page around it.
export default function MasonryGallery({ photos }: MasonryGalleryProps) {
  return (
    <div className="masonry-grid w-full">
      {photos.map((photo, index) => (
        <a
          key={photo.image}
          href={photo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="masonry-item group relative block cursor-pointer overflow-hidden rounded border border-transparent bg-surface-container transition-colors duration-300 hover:border-outline-variant focus-visible:border-primary-fixed"
        >
          <Image
            src={photo.image}
            alt={photo.alt}
            width={800}
            height={600}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={index === 0}
            className="h-auto w-full object-cover grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0"
          />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-end justify-between bg-gradient-to-t from-background to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-mono text-[12px] tracking-[0.1em] text-on-surface-variant uppercase">
              Frame {String(index + 1).padStart(2, "0")}
            </span>
            <CameraIcon className="h-5 w-5 text-primary-fixed" />
          </div>
        </a>
      ))}
    </div>
  );
}
