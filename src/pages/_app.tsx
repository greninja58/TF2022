import { useEffect } from "react";
import "../styles/globals.css";
import styles from "../styles/App.module.css";
import type { AppProps } from "next/app";
import PageLayout from "../layouts/PageLayout";
import NavigationSection from "../components/NavigationSection";
import ContentSection from "../components/ContentSection";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  const { mutate } = useSWRConfig();

  useEffect(() => {
    AOS.init({
      disable: function () {
        return /bot|googlebot|crawler|spider|robot|crawling/i.test(
          navigator.userAgent
        );
      },
    });

    if (process.env.NODE_ENV === "production") {
    }
  }, []);

  useEffect(() => {
    const registerView = () => {
      fetch(`/api/v1/views`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          const newViews = data.views;
          mutate(`/api/v1/views`, { ...data, views: newViews }, false);
        });
    };

    if (process.env.NODE_ENV === "production") {
      //  console.log("view registered");
      registerView();
    }
  }, [mutate]);

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
