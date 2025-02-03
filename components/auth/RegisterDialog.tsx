"use client";
import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import useRegister from "@/hooks/use-register-dialog";
import useLogin from "@/hooks/use-login-dialog";
import { registerMutationFn } from "@/lib/fetcher";
import { toast } from "@/hooks/use-toast";
import { signupSchema } from "@/validation/auth.validation";

const RegisterDialog = () => {
  const { open, onClose } = useRegister();
  const { onOpen } = useLogin();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  //Imported from validation/auth.validation.ts
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      shopName: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["currentUser"],
        });
        toast({
          title: "Registration Success",
          description: "You have been registered successfully",
          variant: "success",
        });
        form.reset();
        onClose();
      },
      onError: () => {
        toast({
          title: "Error Occurred",
          description: "Registration failed. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const openLoginDialog = () => {
    onClose();
    onOpen();
  };

  return (
    <Dialog modal open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Enter your details below to register for an account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subcribe to TechWithEmma co."
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="lg"
              disabled={isPending}
              className="w-full"
              type="submit"
            >
              {isPending && <Loader className="w-4 h-4 animate-spin" />}
              Register
            </Button>
          </form>
        </Form>

        <div className="mt-2 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={openLoginDialog} className="!text-primary">
              Sign in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
