import type { NextRouter } from "next/router";
import type { NextPageContext } from "next";

export const routesRoots: Record<string, string> = {
  home: "/",
};

export const publicRoutes:  Record<string, string> = {
  login: "/login",
};

export const supportedRoots = Object.values(routesRoots);
export const publicRoots = Object.values(publicRoutes)

export async function redirect(
  context: {
    router: NextRouter;
    ctx?: NextPageContext;
  },
  href: string,
  as?: string
) {
  const { router, ctx } = context;
  if (ctx?.res) {
    return ctx.res.writeHead(302, { Location: href }).end();
  } else {
    return router.push(href, as);
  }
}