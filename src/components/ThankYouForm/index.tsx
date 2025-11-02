"use client";
import { useForm } from "react-hook-form";
import PDFPreview from "../PDFPreview";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const IMAGEDIMENSIONS = { width: 754, height: 387 };
const PDFTEXT = "Thank you for supporting us";

export default function ThankYouForm() {
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

    // add blank page to the document with image dimensions
    const page = pdfDoc.addPage([
      IMAGEDIMENSIONS.width,
      IMAGEDIMENSIONS.height,
    ]);

    // get the width and height of the page
    const { width, height } = page.getSize();

    // draw string of text near top of the page
    const fontSize = 30;
    page.drawText(
      customPDFText(watch("firstName"), watch("lastName"), PDFTEXT),
      {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: poppins,
        color: rgb(0, 0, 0),
      }
    );

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
