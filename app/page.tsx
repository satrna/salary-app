import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-200 to-white">
      {/* Hero Section */}
      <div className="z-10 max-w-5xl w-full p-8 items-center justify-center text-center text-gray-800 font-mono lg:flex lg:space-y-0 lg:p-0">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl mb-4">
            Rafindo Raya Admin
          </h1>
          <p className="text-xl leading-8">
            Simplified employee salary calculation and management.
          </p>
        </div>
      </div>
      {/* Call-to-Action Section */}
      <div className="mt-16 lg:mt-32">
        <Link href="/login">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded shadow-md transition duration-200 ease-in-out">
            Login
          </Button>
        </Link>
      </div>
    </main>
  );
}
