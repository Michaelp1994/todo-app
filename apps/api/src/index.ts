import createContext from "./createContext";
import { appRouter } from "./router";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { convertAWSHeaders } from "./utils/convertAWSHeaders";
import { db } from "./db";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: ({ event }) =>
    createContext({ headers: convertAWSHeaders(event.headers), db }),
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
