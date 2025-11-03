import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/anima-thankyou",
    images: { unoptimized: true } 
};

export default nextConfig;