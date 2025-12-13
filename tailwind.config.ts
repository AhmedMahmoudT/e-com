import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const colors = [
  "#008BDE",
  "#DE0088",
  "#00DE88",
  "#ffac1c",
  "#280cc7",
  "#c70a23",
];

const safelist = colors.flatMap((color) => [
  `bg-[${color}]`,
  `hover:bg-[${color}]`,
  `text-[${color}]`,
  `border-[${color}]`,
]);

export default {
  content: ["./src/**/*.tsx"],
  safelist,
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
