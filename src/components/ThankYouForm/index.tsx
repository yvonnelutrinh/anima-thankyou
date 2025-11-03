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
      <form
        className="mt-8 grid gap-4 sm:grid-cols-3 items-end"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block text-sm  text-[var(--accent-grey)]">
          First name:
          <input
            type="text"
            className="mt-2 w-full rounded-sm bg-white shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500/60 focus:outline-none px-5 py-3 placeholder:text-slate-400  text-[var(--accent-grey)]"
            placeholder="John"
            aria-label="First name"
            {...register("firstName")}
          />
        </label>
        <label className="block text-sm  text-[var(--accent-grey)]">
          Last name:
          <input
            type="text"
            className="mt-2 w-full rounded-sm bg-white shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-cyan-500/60 focus:outline-none px-5   py-3 placeholder:text-slate-400  text-[var(--accent-grey)]"
            placeholder="Doe"
            aria-label="Last name"
            {...register("lastName")}
          />
        </label>
        <button
          type="submit"
          className="mt-6 sm:mt-0 inline-flex items-center justify-center rounded-sm px-6 py-3 text-base font-semibold text-white
           bg-gradient-to-r from-cyan-500 to-sky-600 shadow-lg shadow-cyan-500/20
           ring-1 ring-inset ring-white/10
           hover:from-cyan-600 hover:to-sky-700
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
        >
          Download PDF
        </button>
      </form>
    </>
  );
}
