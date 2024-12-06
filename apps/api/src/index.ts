import createContext from "./createContext";
import { appRouter } from "./router";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
  responseMeta(opts) {
    if (opts.ctx?.resHeaders) {
      return {
        headers: {
          "Set-Cookie": opts.ctx.resHeaders.get("Set-Cookie") || "",
        },
      };
    } else {
      return {};
    }
  },
});
