import React from 'react';

interface Link {
  url: string;
  label: string;
}

interface NavbarProps {
  links: Link[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Schedule</div>
        <ul className="flex space-x-4">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} className="text-white hover:text-gray-300">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
