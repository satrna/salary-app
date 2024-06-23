import Profile from "../components/dashboard/profile";
import SideNav from "../components/dashboard/sidenav";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-1/6 h-full justify-items-end">
        <SideNav />
      </div>
      <div className="w-5/6 h-svh bg-orange-200">
        <div className="flex flex-col space-y-5 mx-10">
          <div className="mt-4 grid justify-items-end">
            <Profile />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
