import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "./page";
import Script from "next/script";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useCallback, useEffect } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  const [user, loading] = useAuthState(auth);

  const initializeGSI = useCallback(() => {
    const authHandler = async (response: any) => {
      const idToken = response.credential;
      const credential = GoogleAuthProvider.credential(idToken);

      try {
        await signInWithCredential(auth, credential);
      } catch (error) {
        console.log(error);
      }
    };

    // @ts-ignore:next-line
    window?.google?.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      callback: authHandler,
    });

    // @ts-ignore:next-line
    window?.google?.accounts.id.prompt((notification: any) => {
      console.log("notification:", notification);
    });
  }, []);

  useEffect(() => {
    console.log("user:", user);
    if (loading || user) return;

    const timer = setTimeout(() => {
      initializeGSI();
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, loading, initializeGSI]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />

      {getLayout(
        <>
          {loading && (
            <div className="h-screen w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.65)] z-50 grid place-items-center">
              <div className="flex items-center justify-center ">
                <div className="w-16 h-16 border-b-4 border-gray-50 rounded-full animate-spin"></div>
              </div>
            </div>
          )}
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default MyApp;
