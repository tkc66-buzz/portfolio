import Image from "next/image";

export type PixelIconSize = "sm" | "md";

type PixelIconProps = {
  src: string;
  /**
   * Use "" for decorative icons.
   * If `decorative` is true, `alt` is forced to "" and `aria-hidden` is set.
   */
  alt?: string;
  size?: PixelIconSize;
  decorative?: boolean;
  className?: string;
};

const SIZE_PX: Record<PixelIconSize, number> = {
  sm: 16,
  md: 20,
};

export function PixelIcon({
  src,
  alt = "",
  size = "md",
  decorative = true,
  className,
}: PixelIconProps) {
  const px = SIZE_PX[size];

  // Guardrail: keep spacing stable even if the asset 404s.
  // The wrapper reserves layout; the image might fail to load, but UI won't jump.
  return (
    <span
      className={className}
      style={{ width: px, height: px, display: "inline-block", verticalAlign: "text-bottom" }}
      aria-hidden={decorative ? "true" : undefined}
    >
      <Image
        src={src}
        alt={decorative ? "" : alt}
        width={px}
        height={px}
        className="h-full w-full select-none"
      />
    </span>
  );
}


