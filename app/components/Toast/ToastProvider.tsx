"use client";

import { Toaster } from "react-hot-toast";

const toastClassName =
  "!bg-surface !text-white/80 !border !border-white/10 !rounded-lg !px-4 !py-3 !text-sm !shadow-lg !shadow-black/40 !max-w-sm";

/**
 * Global toast container styled to match the portfolio shell.
 */
const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      containerClassName="!top-6"
      toastOptions={{
        duration: 4000,
        className: toastClassName,
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#191919",
          },
        },
        error: {
          iconTheme: {
            primary: "#f87171",
            secondary: "#191919",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
