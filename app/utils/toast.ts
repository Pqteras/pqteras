"use client";

import toast, { type ToastOptions } from "react-hot-toast";

const MAX_TOASTS = 3;
const TOAST_DURATION_MS = 4000;

const activeToastIds: string[] = [];

const sharedOptions: ToastOptions = {
  duration: TOAST_DURATION_MS,
};

const registerToast = (id: string) => {
  activeToastIds.push(id);

  while (activeToastIds.length > MAX_TOASTS) {
    const oldestId = activeToastIds.shift();
    if (oldestId) toast.dismiss(oldestId);
  }

  window.setTimeout(() => {
    const index = activeToastIds.indexOf(id);
    if (index >= 0) activeToastIds.splice(index, 1);
  }, TOAST_DURATION_MS + 300);
};

export const showErrorToast = (message: string) => {
  const id = toast.error(message, sharedOptions);

  registerToast(id);
};

export const showSuccessToast = (message: string) => {
  const id = toast.success(message, sharedOptions);

  registerToast(id);
};
