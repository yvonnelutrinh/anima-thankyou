import Image from "next/image";

interface PDFPreviewProps {
  width: number;
  height: number;
  pdfText: string;
}

export default function PDFPreview({ width, height, pdfText }: PDFPreviewProps) {
  return (
    <div className="relative inline-block overflow-hidden" id="pdf-preview">
      <div className="absolute inset-0 flex items-center">
        <p 
          className="text-white ml-12 w-2/5 text-[clamp(0.5rem,4vw,2.5rem)]"
        >
          {pdfText}
        </p>
      </div>
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