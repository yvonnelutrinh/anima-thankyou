import Image from "next/image";

export default function PDFPreview({ width, height, pdfText }) {
  return (
    <>
      <p>{pdfText}</p>
      <Image
        src="/assets/arctic-fox.png"
        alt="Portrait of an Arctic fox looking at the camera"
        width={width}
        height={height}
        preload
      />
    </>
  );
}
