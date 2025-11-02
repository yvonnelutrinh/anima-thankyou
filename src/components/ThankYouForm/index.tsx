"use client";
import { useForm } from "react-hook-form";
import PDFPreview from "../PDFPreview";
import { PDFDocument, rgb, layoutMultilineText, TextAlignment } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const IMAGEDIMENSIONS = { width: 754, height: 387 };
const PDFTEXT = "Thank you for supporting us";

export default function ThankYouForm() {
  // custom message generator
  function customPDFText(firstName, lastName, baseText) {
    if (firstName || lastName) {
      return baseText + ", " + firstName + " " + lastName + "!";
    }
    return baseText + "!";
  }

  // instantiate form, controlled inputs, handle submit
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => generatePDF(data);

  async function generatePDF(data) {
    // create new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // register fontkit
    pdfDoc.registerFontkit(fontkit);

    // load and embed poppins
    const fontBytes = await fetch("/fonts/Poppins-Regular.ttf").then((res) =>
      res.arrayBuffer()
    );
    const poppins = await pdfDoc.embedFont(fontBytes);

    // add image to page
    const pngImageBytes = await fetch("/assets/arctic-fox.png").then((res) =>
      res.arrayBuffer()
    );

    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    // add blank page to the document using image dimensions
    const page = pdfDoc.addPage([pngImage.width, pngImage.height]);

    // draw image onto page
    page.drawImage(pngImage, {
      width: pngImage.width,
      height: pngImage.height,
    });

    const fontSize = 30;

    // define boundaries for text
    const layout = layoutMultilineText(
      customPDFText(watch("firstName"), watch("lastName"), PDFTEXT),
      {
        bounds: {
          x: 50,
          y: pngImage.height - 6 * fontSize,
          width: pngImage.width * 0.6, // text width is 60% of image
          height: pngImage.height,
        },
        font: poppins,
        fontSize: fontSize,
        alignment: TextAlignment.Left,
      }
    );

    // draw string of text near top of the page
    layout.lines.forEach((line, i) => {
      page.drawText(line.text, {
        x: layout.bounds.x,
        y: layout.bounds.y - i * layout.lineHeight,
        // size: layout.fontSize,
        // font: layout.font,
        color: rgb(1, 1, 1),
      });
    });

    // serialize pdf to bytes
    const pdfBytes = await pdfDoc.save();

    // download pdf
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thank-you.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PDFPreview
        width={IMAGEDIMENSIONS.width}
        height={IMAGEDIMENSIONS.height}
        pdfText={customPDFText(watch("firstName"), watch("lastName"), PDFTEXT)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First name:
          <input type="text" {...register("firstName")} />
        </label>
        <label>
          Last name:
          <input type="text" {...register("lastName")} />
        </label>
        <button type="submit">Download PDF</button>
      </form>
    </>
  );
}
