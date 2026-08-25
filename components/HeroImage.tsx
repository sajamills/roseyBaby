import Image from "next/image";

export default function HeroImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        className="hero-background-image"
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        quality={70}
      />
      <span className="hero-background-shade" aria-hidden="true" />
    </>
  );
}
