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
import { Skeleton } from '@/app/components';

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className={cn('nav-link', {
              '!text-zinc-900': currentPath === href,
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );
  }

  if (status === 'loading') {
    return <Skeleton width="3rem" />;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          alt="User photo"
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">
            {session!.user!.email!}
          </Text>
        </DropdownMenu.Label>

        <Link href="/api/auth/signout">
          <DropdownMenu.Item>
            Log out
          </DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const NavBar = () => (
  <nav className="border-b mb-5 px-5 py-3">
    <Container>
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <FaBug />
          </Link>

          <NavLinks />
        </Flex>

        <Box>
          <AuthStatus />
        </Box>
      </Flex>
    </Container>
  </nav>
);

export default NavBar;
