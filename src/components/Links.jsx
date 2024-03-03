const Links = ({ text, link }) => {
    return (
      <a href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="hover:text-yellow-300 transition-colors duration-200 underline">
        {text}
      </a>
    );
};

export default Links;
