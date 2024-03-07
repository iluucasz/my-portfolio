import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MdOutlineTag } from 'react-icons/md';

type TListItemProp = {
  label: string,
  href: string
}

// className = "text-lg font-semibold hover:scale-105 cursor-pointer"
const ListItem = ({ label, href }: TListItemProp) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <>
      <Link href={href} className={cn("flex items-center gap-2 text-lg text-white font-semibold hover:scale-105 cursor-pointer", isActive && 'text-red-900 font-bold')}><MdOutlineTag />{label}</Link>
    </>
  )
}

export default ListItem;