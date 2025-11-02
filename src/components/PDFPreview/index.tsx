import Image from "next/image";

export default function PDFPreview() {
  return (
    <Image
      src="/assets/arctic-fox.png"
      alt="Portrait of an Arctic fox looking at the camera."
      width={754}
      height={387}
      preload
    />
  );
}
