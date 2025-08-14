// app/not-found.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./not-found.module.css";

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
