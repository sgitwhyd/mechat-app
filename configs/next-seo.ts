import { DefaultSeoProps } from "next-seo";

const url = "https://mechat-app.vercel.app";
const title = "MeChat";
const description =
  "Realtime chat app build using NextJs, Express, Tailwind, Pusher";

const defaultSeoConfig: DefaultSeoProps = {
  titleTemplate: ` %s | ${title}`,
  description: description,
  additionalMetaTags: [
    {
      property: "og:title",
      content: "MeChat an realtime chat app",
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: url,
    },
    {
      property: "og:type",
      content: title,
    },
    {
      property: "og:image",
      content: "/apple-touch-icon.png",
    },
    {
      property: "msapplication-TileColor",
      content: "#da532c",
    },
    {
      property: "theme-color",
      content: "#ffffff",
    },
    {
      property: "twitter:url",
      content: url,
    },
    {
      property: "twitter:domain",
      content: url,
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:image",
      content: "/apple-touch-icon.png",
    },
  ],

  additionalLinkTags: [
    {
      rel: "applce-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: url,
    site_name: "MeChat",
  },
};

export default defaultSeoConfig;
