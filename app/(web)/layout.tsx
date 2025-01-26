import NavBar from "@/components/NavBars";
import Footer from "./_components/footer";
import RegisterDialog from "@/components/auth/RegisterDialog";
import LoginDialog from "@/components/auth/LoginDialog";

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <RegisterDialog />
      <LoginDialog />
      <div className="flex flex-col w-full h-auto">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
