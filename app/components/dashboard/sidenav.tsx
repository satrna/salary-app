// app/ui/dashboard/side-nav.tsx
"use client";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  CalendarDaysIcon,
  ClockIcon,
  BanknotesIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { signOut } from '@/auth';

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const links: NavLink[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Data Karyawan", href: "/dashboard/employee", icon: UserIcon },
  { name: "Data Absen", href: "/dashboard/attendance", icon: CalendarDaysIcon },
  { name: "Data Lembur", href: "/dashboard/overtime", icon: ClockIcon },
  { name: "Data Gaji", href: "/dashboard/salary", icon: BanknotesIcon },
];

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(); 
      router.push('/login'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex h-full flex-col text-gray-700">
      <Link
        className="mb-2 flex h-5 items-center justify-center rounded-bl-md rounded-br-md p-4 md:h-40"
        href="/dashboard"
        aria-label="Go to home"
      >
        <div className="text-2xl font-extrabold">Rafindo Raya</div>
      </Link>
      <div className="flex grow flex-col space-y-2 p-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex items-center p-2 rounded-md hover:bg-orange-200`,
              pathname === link.href ? "bg-orange-200" : ""
            )}
            aria-label={link.name}
          >
            <link.icon className="w-6 h-6 mr-2" />
            <span>{link.name}</span>
          </Link>
        ))}
        <form action={handleSignOut} className="mt-auto">
          <button
            className="mt-auto flex items-center w-full p-2 rounded-md hover:bg-orange-200"
            aria-label="Sign out"
          >
            <PowerIcon className="w-6 h-6 mr-2" />
            <div>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
