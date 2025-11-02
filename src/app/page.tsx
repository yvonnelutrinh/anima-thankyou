import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Thank you </h1>
      <p>Your support is appreciated</p>
      <Image
        src="/assets/arctic-fox.png"
        alt="Portrait of an Arctic fox looking at the camera."
        width={754}
        height={387}
        preload
      />
    </main>
  );
}
