import type { NextPage } from "next";
import Head from "next/head";
import Features from "../components/features";
import Login from "../components/login";
import { withAuth } from "../lib/auth";

const Home: NextPage = withAuth(
  ({ session }: any) => {
    console.log({ session });
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Feature Wishlist</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          {!session && <Login />}
          <Features />
        </main>
      </div>
    );
  },
  {
    shouldRedirect: false,
  }
);

export default Home;
