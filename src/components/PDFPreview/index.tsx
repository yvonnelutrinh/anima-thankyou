import Image from "next/image";

export default function PDFPreview({width, height}) {
  return (
    <Image
      src="/assets/arctic-fox.png"
      alt="Portrait of an Arctic fox looking at the camera"
      width= {width}
      height={height}
      preload
    />
  );
}
