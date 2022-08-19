import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
import supabase from "./supabase";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center">
      Redirecting...
    </div>
  );
};

type WithAuthOptions = {
  shouldRedirect?: boolean;
};

export const withAuth = (
  Component: any,
  { shouldRedirect = true }: WithAuthOptions = {}
) => {
  return () => {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
      let mounted = true;

      async function getInitialSession() {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // only update the react state if the component is still mounted
        if (mounted) {
          if (session) {
            setSession(session);
          }

          setIsLoading(false);
        }
      }

      getInitialSession();

      const { subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );

      return () => {
        mounted = false;

        subscription?.unsubscribe();
      };
    }, []);

    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if (shouldRedirect) {
      return !session ? <Redirect /> : <Component session={session} />;
    }

    return <Component session={session} />;
  };
};
