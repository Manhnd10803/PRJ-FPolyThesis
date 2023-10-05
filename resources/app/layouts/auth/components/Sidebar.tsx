import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}
const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/examples/forms',
  },
  {
    title: 'Account',
    href: '/examples/forms/account',
  },
  {
    title: 'Appearance',
    href: '/examples/forms/appearance',
  },
  {
    title: 'Notifications',
    href: '/examples/forms/notifications',
  },
  {
    title: 'Display',
    href: '/examples/forms/display',
  },
];

export function Sidebar({ className }: SidebarNavProps) {
  const { pathname } = useLocation();

  return (
    <aside className='-mx-4 lg:w-1/5'>
      <nav
        className={cn(
          'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
          className
        )}
      >
        {sidebarNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.href
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
