import { defineConfig } from "vitepress";
import tasklists from "markdown-it-task-lists";

import { parseFeatures } from "../features";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OpenAE",
  description: "Empower Acoustic Emission with Open Standards",
  themeConfig: {
    logo: "/icon.png",

    search: {
      provider: "local",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Project",
        link: "/project/goals",
        activeMatch: `^/project/`,
      },
      {
        text: "Features",
        link: "/features/",
        activeMatch: `^/features/`,
      },
      {
        text: "Models",
        link: "/models/index",
        activeMatch: `^/models/`,
      },
    ],

    sidebar: [
      {
        text: "Project",
        items: [
          { text: "Goals", link: "/project/goals" },
          { text: "Contribute", link: "/project/contribute" },
        ],
      },
      {
        text: "Features",
        items: [
          {
            text: "Overview",
            link: "/features/",
          },
          {
            text: "Algorithms",
            items: [
              {
                text: "latest",
                link: "/features/latest/",
                collapsed: true,
                items: parseFeatures().map((feature) => ({
                  text: feature.meta.title,
                  link: `/features/latest/${feature.id}/`,
                })),
              },
            ],
          },
          { text: "Versioning", link: "/features/versioning" },
          { text: "Implementations", link: "/features/implementations" },
        ],
      },
      {
        text: "Models",
        link: "/models/index",
        items: [{ text: "Overview", link: "/models/" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/openae-io" }],

    editLink: {
      pattern: ({ filePath }) => {
        if (filePath.startsWith("features/algorithm-")) {
          const re = /algorithm-([\w\d\.]+)-([\w-]+)/;
          const [_, version, id] = filePath.match(re) ?? ["", "latest", ""];
          return `https://github.com/openae-io/features/edit/main/${id}/README.md`;
        } else {
          return `https://github.com/openae-io/openae-io/edit/main/${filePath}`;
        }
      },
      text: "Edit this page on GitHub",
    },

    footer: {
      message: `
        Released under the <a href="https://github.com/openae-io/openae-io/blob/main/LICENSE">MIT License</a>.
        Image by <a href='https://www.freepik.com/free-vector/colorful-equalizer-wave-background_6779942.htm'>Freepik</a>.
        <br />
        <a href="/legal-notice">Legal notice</a> | <a href="/privacy-policy">Privacy policy</a>
      `,
    },
  },
  markdown: {
    config: (md) => {
      md.use(tasklists);
    },
    math: true,
  },
  srcExclude: ["README.md", "external/**"],
  rewrites: {
    "features/algorithms-:version.md": "features/:version/index.md",
    "features/algorithm-:version-:id.md": "features/:version/:id/index.md",
  },
});
