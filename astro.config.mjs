// astro.config.mjs
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  env: {
    schema: {
      PUBLIC_SOCIAL_GITHUB: envField.string({ context: "client", access: "public" }),
      PUBLIC_SOCIAL_X: envField.string({ context: "client", access: "public" }),
      PUBLIC_SOCIAL_LINKEDIN: envField.string({ context: "client", access: "public" }),
      PUBLIC_SOCIAL_EMAIL: envField.string({ context: "client", access: "public" }),
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({ context: "client", access: "public" }),
    },
  },
});
