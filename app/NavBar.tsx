'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaBug } from 'react-icons/fa';
import cn from 'classnames';

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn('text-zinc-500 hover:text-zinc-800 transition-colors', {
                'text-zinc-900': currentPath === href,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
