import { useRef, useState } from "react";

interface ObjectiveCardProps {
  title: string;
  subtitle?: string;
}

const ObjectiveCard = ({ title, subtitle }: ObjectiveCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>("rotateX(0deg) rotateY(0deg) scale(1)");
  const [spotlightStyle, setSpotlightStyle] = useState<{ left: number; top: number; opacity: number }>({ left: 0, top: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const percentX = (offsetX / rect.width) * 2 - 1; // -1 to 1
    const percentY = (offsetY / rect.height) * 2 - 1; // -1 to 1

    const rotateX = -(percentY * 8); // tilt up/down
    const rotateY = percentX * 8; // tilt left/right

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setSpotlightStyle({ left: offsetX, top: offsetY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
    setSpotlightStyle((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group [perspective:1000px]"
    >
      <div
        className="relative card-elegant p-6 rounded-2xl will-change-transform transition-transform duration-200"
        style={{ transform: transformStyle, transformStyle: "preserve-3d" as any }}
      >
        {/* Glow border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(600px circle at var(--x) var(--y), rgba(227, 211, 74, 0.25), transparent 40%)",
            // CSS vars updated below via inline style on wrapper
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center" style={{ transform: "translateZ(30px)" }}>
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-accent" />
          <h3 className="text-lg font-bold text-white-text">{title}</h3>
          {subtitle ? (
            <p className="text-gray-muted text-sm mt-1">{subtitle}</p>
          ) : null}
        </div>

        {/* Moving spotlight */}
        <div
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(160px circle at ${spotlightStyle.left}px ${spotlightStyle.top}px, rgba(227,211,75,0.25), transparent 60%)`,
            opacity: spotlightStyle.opacity,
          }}
        />
      </div>

      {/* Update CSS variables for glow position */}
      <style>
        {`
        .group:hover > div:first-child { --x: ${spotlightStyle.left}px; --y: ${spotlightStyle.top}px; }
        `}
      </style>
    </div>
  );
};

export default ObjectiveCard;
