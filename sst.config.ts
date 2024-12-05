/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "todo-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const api = new sst.aws.Function("api", {
      url: true,
      handler: "apps/api/src/index.handler",
    });

    new sst.aws.StaticSite("web", {
      path: "apps/web",
      environment: {
        VITE_API_URL: api.url,
      },
      build: {
        command: "pnpm run build",
        output: "dist",
      },
    });
  },
});
