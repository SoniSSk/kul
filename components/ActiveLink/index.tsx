import React, { ReactNode, FC, Children } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
}

const ActiveLink: FC<ActiveLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const className = router.pathname === href ? 'active' : '';
  const child: any = Children.only(children);

  return (
    <Link href={href}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
