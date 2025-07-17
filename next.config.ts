import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";
// @ts-ignore
import withPWA from "next-pwa";

const baseConfig: NextConfig = {
  reactStrictMode: true,
};

export default withFlowbiteReact(
  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  })(baseConfig)
);
