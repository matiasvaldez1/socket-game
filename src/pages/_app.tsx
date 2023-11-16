import type { AppContext, AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { publicRoots, redirect, supportedRoots } from "@/utils/lib";
import "nes.css/css/nes.min.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { session } = pageProps as any;
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

MyApp.getInitialProps = async function (context: Exclude<AppContext, Session>) {
  const { ctx, router } = context;
  const user = await getSession(ctx);
  const isPrivateRoute = supportedRoots.some((root) =>
    router.pathname.startsWith(root)
  );
  const isPublicRoute = publicRoots.some((root) =>
    router.pathname.startsWith(root)
  );
  const userExists = Boolean(user?.user?.email);

  if(isPublicRoute) return context
  if (userExists && !isPrivateRoute && !isPublicRoute) return redirect(context, "/");
  if (!userExists && isPrivateRoute && !isPublicRoute) return redirect(context, "/login");

  return context;
};

export default api.withTRPC(MyApp);
