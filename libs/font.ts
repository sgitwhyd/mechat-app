import { Averia_Sans_Libre } from "@next/font/google";

const averiaSans = Averia_Sans_Libre({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-averia",
});

const fonts = {
  averiaSans,
};

export default fonts;
