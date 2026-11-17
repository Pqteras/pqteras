type LinksProps = {
  href: string;
  text: string;
};

const Links = ({ href, text }: LinksProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-sm font-medium text-accent underline decoration-accent/35 decoration-[1.5px] underline-offset-[3px] transition-[text-decoration-color,color] duration-150 hover:text-accent-soft hover:decoration-accent"
  >
    {text}
  </a>
);

export default Links;
