import { StackContext, Api, NextjsSite, Auth } from "sst/constructs";

export function Stacks({ stack }: StackContext) {

  //API GATEAWAY
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/auth/login.handler",
      "GET /session": "packages/functions/src/auth/session.handler",
    },
  });

  //SITE
  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    bind: [api],
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
    },
  });

  //AUTH
  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth/login.handler",
      bind: [site],
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth",
  });

  stack.addOutputs({
    ApiUrl: api.url,
    SiteUrl: site.url
  });
}
