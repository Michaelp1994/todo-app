import { appRouter } from "./router";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
