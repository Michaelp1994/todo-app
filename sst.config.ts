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
    const vpc = new sst.aws.Vpc("Vpc", { nat: "ec2", bastion: true });

    const db = new sst.aws.Postgres("database", {
      vpc,
      dev: {
        username: process.env["DB_USERNAME"],
        password: process.env["DB_PASSWORD"],
        database: process.env["DB_NAME"],
        port: 5432,
        host: "localhost",
      },
    });

    const api = new sst.aws.Function("api", {
      url: true,
      vpc,
      handler: "apps/api/src/index.handler",
      link: [db],
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
