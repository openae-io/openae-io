import { defineConfig } from "vitepress";
import tasklists from "markdown-it-task-lists";

import { parseFeatures } from "../features";
import { parseDatasets } from "../datasets";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OpenAE",
  description: "Empower Acoustic Emission with Open Standards",
  head: [
    [
      "script",
      {
        defer: "",
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "c05feaf8-6f9b-4108-bb92-e1143e9dbba9",
      },
    ],
  ],
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
        text: "Standards",
        link: "/standards/",
        activeMatch: `^/standards/`,
      },
      {
        text: "Datasets",
        link: "/datasets/",
        activeMatch: `^/datasets/`,
      },
      {
        text: "Models",
        link: "/models/index",
        activeMatch: `^/models/`,
      },
    ],

    sidebar: {
      "/project/": [
        {
          text: "Project",
          items: [
            { text: "Goals", link: "/project/goals" },
            { text: "Contribute", link: "/project/contribute" },
          ],
        },
      ],
      "/standards/": [
        {
          text: "Standards",
          items: [{ text: "Overview", link: "/standards/" }],
        },
        {
          text: "Feature extraction algorithms",
          items: [
            { text: "Intro", link: "/standards/features/" },
            {
              text: "Algorithms",
              link: "/standards/features/latest/",
              items: [
                {
                  text: "latest",
                  link: "/standards/features/latest/",
                  collapsed: false,
                  items: parseFeatures().map((feature) => ({
                    text: feature.meta.title,
                    link: `/standards/features/latest/${feature.id}/`,
                  })),
                },
              ],
            },
          ],
        },
      ],
      "/datasets/": [
        {
          text: "Datasets",
          items: parseDatasets().map((dataset) => ({
            text: dataset.meta.title,
            link: `/datasets/${dataset.id}/`,
          })),
        },
      ],
      "/models/": [],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/openae-io" }],

    editLink: {
      pattern: ({ filePath, params }) => {
        const baseUrl = "https://github.com/openae-io";
        const filePathDatasets = "external/datasets/";
        if (filePath.startsWith("standards/features/algorithm-")) {
          return `${baseUrl}/features/edit/main/${params?.id}/README.md`;
        }
        if (filePath.startsWith(filePathDatasets)) {
          return `${baseUrl}/datasets/edit/main/${filePath.slice(filePathDatasets.length)}`;
        }
        return `${baseUrl}/openae-io/edit/main/${filePath}`;
      },
      text: "Edit this page on GitHub",
    },

    footer: {
      message: `
        Image by <a href='https://www.freepik.com/free-vector/colorful-equalizer-wave-background_6779942.htm'>Freepik</a>.
        <br/>
        <a href="/legal-notice">Legal notice</a> |
        <a href="/privacy-policy">Privacy policy</a> | 
        Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="license noopener noreferrer">CC BY 4.0</a>
      `,
    },
  },
  markdown: {
    config: (md) => {
      md.use(tasklists);
    },
    math: true,
  },
  srcExclude: ["README.md", "external/features/**"],
  rewrites: {
    "standards/features/algorithms-:version.md": "standards/features/:version/index.md",
    "standards/features/algorithm-:version--:id.md": "standards/features/:version/:id/index.md",
    "external/datasets/:id/README.md": "datasets/:id/index.md",
  },
  sitemap: {
    hostname: "https://openae.io",
  },
});
