import NavBar from "@/components/NavBars";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-auto">
        <NavBar />
        <main>{children}</main>
      </div>
    </div>
  );
}
