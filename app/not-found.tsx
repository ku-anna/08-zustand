"use client";

import { Metadata } from "next";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Oops! The page you're looking for doesn't exist.",
  openGraph: {
    title: "Page Not Found",
    description: "Oops! The page you're looking for doesn't exist.",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 Not Found",
      },
    ],
  },
};

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist. You will be
        redirected back to the homepage shortly.
      </p>
    </div>
  );
};

export default NotFound;
