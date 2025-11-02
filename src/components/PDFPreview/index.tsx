import Image from "next/image";

interface PDFPreviewProps {
  width: number;
  height: number;
  pdfText: string;
}

export default function PDFPreview({ width, height, pdfText }: PDFPreviewProps) {
  return (
    <div
      className="relative inline-block" id="pdf-preview">
      <p
        className="absolute text-white left-12 bottom-[40%] w-1/2 
        text-[clamp(1rem,4vw,2.5rem)]"
      >
        {pdfText}
      </p>
      <Image
        src="/assets/arctic-fox.png"
        alt="Portrait of an Arctic fox looking at the camera"
        width={width}
        height={height}
        preload
      />
    </div>
  );
}