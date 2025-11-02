declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    pagebreak?: object;
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number };
    jsPDF?: { unit: string; format: string; orientation: string, hotfixes:string[] };
  }

  export default function html2pdf(
    element: HTMLElement | string,
    options?: Html2PdfOptions
  ): Promise<void>;
}