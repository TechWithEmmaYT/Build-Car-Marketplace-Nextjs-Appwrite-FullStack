import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import NavBar from "@/components/NavBars";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  if (!user) redirect("/");

  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-auto">
        <NavBar />
        <main>{children}</main>
      </div>
    </div>
  );
}
