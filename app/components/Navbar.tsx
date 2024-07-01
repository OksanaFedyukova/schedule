import React from 'react';
import Link from 'next/link';
import { useAuthContext } from "@/app/context/AuthContext";

interface LinkProps {
  url: string;
  label: string;
}

interface NavbarProps {
  links: LinkProps[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const { user, handleSignOut } = useAuthContext();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Schedule</div>
        <ul className="flex space-x-4">
          {links.map((link, index) => (
            <li key={index} className="text-white hover:text-gray-300">
              <Link href={link.url}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {user ? (
          <>
          <button
            onClick={() => handleSignOut()}
          className="text-white hover:text-gray-300"
          >
            Logout
          </button> 
                      <div className="mt-2 text-white">Welcome, {user.email}</div>
</>
        ) : (
          <Link href="/pages/signin" className="text-white hover:text-gray-300">
Login          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
