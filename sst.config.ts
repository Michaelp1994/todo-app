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
        port: Number(process.env["DB_PORT"]),
        host: "localhost",
      },
    });

    const api = new sst.aws.Function("api", {
      url: {
        cors: {
          allowOrigins: ["http://localhost:5173"], // TODO: add the deployed web URL
          allowCredentials: true,
        },
      },
      vpc,
      handler: "apps/api/src/index.handler",
      link: [db],
      nodejs: {
        install: ["@node-rs/argon2"],
      },
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
    new sst.x.DevCommand("Studio", {
      dev: {
        command: "pnpm run db studio",
        autostart: true,
      },
    });
  },
});
