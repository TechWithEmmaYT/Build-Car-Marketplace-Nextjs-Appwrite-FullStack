"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { Loader, MessageSquareText, Plus, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useRegister from "@/hooks/use-register-dialog";
import useLogin from "@/hooks/use-login-dialog";
import { logoutMutationFn } from "@/lib/fetcher";
import { toast } from "@/hooks/use-toast";
import useCurrentUser from "@/hooks/api/use-current-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { onOpen } = useRegister();
  const { onOpen: onShow } = useLogin();
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const { data: user, isPending: isLoading } = useCurrentUser();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["currentUser"],
      });
      router.push("/");
    },
    onError: () => {
      toast({
        title: "Logout failed",
        description: "Please try again ",
      });
    },
  });

  const handleSell = () => {
    if (!user) {
      onShow();
      return;
    }
    router.push("/my-shop/add-listing");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (searchKeyword) {
      router.push(`/search?q=${searchKeyword}`);
    } else {
      router.push("/search");
    }
  };

  const handleLogout = useCallback(async () => {
    mutate();
  }, [mutate]);

  console.log(user);
  const hideSearchPathname = ["/", "/my-shop/add-listing", "/my-shop/messages"];
  const hideNavPath = ["/my-shop", "/my-shop/add-listing", "/my-shop/messages"];
  return (
    <header
      className="w-full bg-primary sticky top-0 align-top z-10 h-14"
      style={{
        boxShadow: "1px 1px 4px #50727d66",
      }}
    >
      <nav className="flex items-center h-full max-w-7xl mx-auto">
        <Logo />

        <ul
          className="hidden lg:flex flex-1 items-center 
        justify-start space-x-4 mx-9 
        text-white/80 lg:space-x-6"
        >
          <li className="flex-[0.6] hidden md:flex">
            {!hideSearchPathname.includes(pathname) && (
              <div
                className="w-full max-w-[320px] h-10 bg-white rounded-lg
             relative"
              >
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex items-center justify-between">
                    <Input
                      type="search"
                      className="flex-1 !shadow-none h-10 text-black
                   !ring-0 !border-0"
                      placeholder="Type your search here"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <Search className=" w-5 h-5 mr-2 text-gray-600" />
                  </div>
                </form>
              </div>
            )}
          </li>

          {!hideNavPath.includes(pathname) && (
            <>
              <li>
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium">
                  Services & Repair
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium">
                  Pricings
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="ml-auto flex items-center space-x-4">
          {isLoading || isPending ? (
            <Loader className="w-5 h-5 animate-spin text-white" />
          ) : !user ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={onShow}
                className="text-sm font-extralight text-white"
              >
                Sign in
              </button>
              <Separator orientation="vertical" className="h-3 text-white" />
              <button
                onClick={onOpen}
                className="text-sm font-extralight  text-white"
              >
                Registration
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                className="rounded-full shadow-sm !py-0 !bg-white !text-black"
                onClick={() => router.push("/my-shop/messages")}
              >
                <MessageSquareText />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar role="button" className="h-9 w-9 shadow-sm ">
                    <AvatarFallback className="text-sm uppercase">
                      {user.name.charAt(0)}
                      {user.name.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem
                    onClick={() => router.push("/my-shop")}
                    className="!cursor-pointer"
                  >
                    My shop
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isPending}
                    className="!cursor-pointer"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <Button
            onClick={handleSell}
            size="default"
            className="!bg-[#fea03c] !px-5 !h-10"
          >
            <Plus />
            Sell Car
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
