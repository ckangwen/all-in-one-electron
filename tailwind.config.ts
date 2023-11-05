import { slate } from "@radix-ui/colors"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...slate,
      },
    },
  },
  corePlugins: {},
  plugins: [],
};
