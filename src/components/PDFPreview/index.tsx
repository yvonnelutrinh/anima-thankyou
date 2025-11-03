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
        className="absolute text-white left-12 bottom-[30%] w-2/5 
        text-[clamp(0.5rem,4vw,2.5rem)]"
      >
        {pdfText}
      </p>
      <Image
        src="/assets/arctic-fox.png"
        className="rounded-sm"
        alt="Portrait of an Arctic fox looking at the camera"
        width={width}
        height={height}
        preload
      />
    </div>
  );
}