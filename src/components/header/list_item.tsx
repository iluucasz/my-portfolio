import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineTag } from 'react-icons/md';

type TListItemProp = {
  label: string,
  href: string,
  onNavigate?: () => void
}

const ListItem = ({ label, href, onNavigate }: TListItemProp) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-base font-medium text-gray-400 transition-all hover:text-white",
        isActive && "text-white"
      )}
    >
      <MdOutlineTag className={cn(
        "text-sm transition-colors",
        isActive ? "text-red-500" : "text-gray-600 group-hover:text-red-500/70"
      )} />
      {label}
      {/* Active indicator */}
      {isActive && (
        <span className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-red-500 to-red-800 lg:block hidden" />
      )}
      {/* Mobile active indicator */}
      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-red-500 lg:hidden" />
      )}
    </Link>
  )
}

export default ListItem;