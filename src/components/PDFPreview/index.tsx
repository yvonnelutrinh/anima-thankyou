import Image from "next/image";

export default function PDFPreview({ width, height, pdfText }) {
  return (
    <div className="inline-block relative" id="pdf-preview">
      <p
        style={{
          position: "absolute",
          bottom: height - 6 * 30,
          left: 50,
          width: "50%",
          color: "white",
          fontSize: 30
        }}
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
