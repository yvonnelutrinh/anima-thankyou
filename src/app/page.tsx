import CustomPDFGenerator from "../components/CustomPDFGenerator";

export default function Home() {
  return (
    <main className="max-w-3xl m-16">
      <h1 className="px-4 size-fit
 rounded-xl ring-1 ring-cyan-500 text-lg tracking-wide text-[var(--accent-teal)] uppercase">
        Thank you{" "}
      </h1>
      <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl">Your support is appreciated</h2>
      <CustomPDFGenerator />
    </main>
  );
}
