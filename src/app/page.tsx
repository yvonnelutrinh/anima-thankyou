import ThankYouForm from "../components/ThankYouForm";

export default function Home() {
  return (
    <div className="my-16 mx-8">
      <main className="max-w-3xl mx-auto">
        <h1 className="px-4 size-fit rounded-xl ring-1 ring-cyan-500 text-lg tracking-wide text-[var(--accent-teal)] uppercase">
          Thank you
        </h1>
        <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl">
          Your support is appreciated
        </h2>
        <section className="mt-6 max-w-[754px]">
          <p className="my-4 text-[var(--accent-grey)]">
            Add your name to download a custom thank you card.
          </p>
          <ThankYouForm />
        </section>
      </main>
    </div>
  );
}
