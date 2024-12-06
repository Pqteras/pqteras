"use client";
export default function Link({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-yellow-300 transition-colors duration-200 underline"
    >
        {text}
    </a>
  );
}
