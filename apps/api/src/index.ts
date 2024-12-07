import createContext from "./createContext";
import { appRouter } from "./router";
import {
  awsLambdaRequestHandler,
  type APIGatewayEvent,
} from "@trpc/server/adapters/aws-lambda";

function convertAWSHeadersToHeaders(
  headers: APIGatewayEvent["headers"],
): Headers {
  const h = new Headers();
  for (const key in headers) {
    h.set(key, headers[key] ?? "");
  }
  return h;
}

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: ({ event }) =>
    createContext({ headers: convertAWSHeadersToHeaders(event.headers) }),
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
