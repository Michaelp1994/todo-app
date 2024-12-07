import { type APIGatewayEvent } from "@trpc/server/adapters/aws-lambda";

export function convertAWSHeaders(
  headers: APIGatewayEvent["headers"]
): Headers {
  const h = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (value) {
      h.set(key, value);
    }
  }
  return h;
}
