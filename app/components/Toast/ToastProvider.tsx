"use client";

import { Toaster } from "react-hot-toast";

const toastClassName =
  "!bg-raised !text-fg !border !border-line !rounded-xl !px-4 !py-3 !text-sm !shadow-[0_16px_40px_-16px_rgb(0_0_0/0.8)] !max-w-sm";

const ToastProvider = () => (
  <Toaster
    position="top-center"
    gutter={10}
    containerClassName="!top-6"
    toastOptions={{
      duration: 4000,
      className: toastClassName,
      success: {
        iconTheme: { primary: "#4ade80", secondary: "#22211e" },
      },
      error: {
        iconTheme: { primary: "#f87171", secondary: "#22211e" },
      },
    }}
  />
);

export default ToastProvider;
