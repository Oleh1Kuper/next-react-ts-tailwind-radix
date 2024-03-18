'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaBug } from 'react-icons/fa';
import cn from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box, Container, DropdownMenu, Flex,
  Text,
} from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>

          <Box>
            {status === 'authenticated' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  alt="User photo"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">
                    {session.user?.email}
                  </Text>
                </DropdownMenu.Label>

                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">
                    Log out
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
            <Link href="/api/auth/signin">
              Login
            </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
