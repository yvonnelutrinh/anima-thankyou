"use client";
import html2pdf from "html2pdf.js";
import { useForm } from "react-hook-form";
import PDFPreview from "../PDFPreview";

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
    const elementToConvert = document.getElementById("pdf-preview");

    if (elementToConvert) {
      const options = {
        filename: "anima-thank-you.pdf",

        html2canvas: {},
        jsPDF: {
          unit: "px",
          format: [IMAGEDIMENSIONS.width, IMAGEDIMENSIONS.height],
          orientation: "l",
          hotfixes: ["px_scaling"],
        },
      };

      html2pdf(elementToConvert, options)
        .then(() => {
          console.log("PDF generated successfully!");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
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
