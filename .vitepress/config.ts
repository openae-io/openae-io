import { defineConfig } from "vitepress";
import mathjax3 from "markdown-it-mathjax3";
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
                  text: feature.id,
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
        if (filePath.startsWith("external/features/")) {
          const filePathSplit = filePath.split("/");
          const id = filePathSplit.at(3);  // 0: external, 1: features, 2: version, 3: id
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
        <br/>
        Image by <a href='https://www.freepik.com/free-vector/colorful-equalizer-wave-background_6779942.htm'>Freepik</a>.
      `,
    },
  },
  markdown: {
    config: (md) => {
      md.use(tasklists);
    },
    math: true,
  },
  srcExclude: ["README.md"],
  rewrites: {
    "external/features/:version/:id/README.md": "features/:version/:id/index.md",
    "features/algorithms-:version.md": "features/:version/index.md",
  },
});
