"use client";

import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icon";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthFormSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Must be a email",
        }),
    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
        .min(8, {
            message: "Min 8 character",
        }),
});

type UserAuthFormValues = z.infer<typeof userAuthFormSchema>;

export function UserAuthFormLogin({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const form = useForm<UserAuthFormValues>({
        resolver: zodResolver(userAuthFormSchema),
    });

    const onSubmit = (data: UserAuthFormValues) => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example@gmail.com"
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
                                        type="password"
                                        placeholder="********"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Link
                        className="underline float-right mt-0 decoration-solid"
                        to="/forgot_password"
                    >
                        Forgot password?
                    </Link>
                    <Button className="w-full bg-black" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        GO !
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm text-[#857d7d] font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember for 30 days
                        </label>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button
                onClick={() => {
                    fetch("http://localhost:8000/api/google-auth", {
                        mode: "no-cors",
                    }).then(() => {
                        window.open(
                            "https://accounts.google.com/o/oauth2/auth?client_id=667013799420-s3s1c82l9da8vkuif91dkt4mp51qnqg3.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fgoogle-callback&scope=openid+profile+email&response_type=code"
                        );
                    });
                }}
                variant="outline"
                type="button"
                disabled={isLoading}
            >
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                Login width Google
            </Button>
        </div>
    );
}
