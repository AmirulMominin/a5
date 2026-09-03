"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_actions/loginAction";
import { toast } from "sonner";

const LoginPage = () => {
    const [state,action,pending] = useActionState(loginAction, null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };
useEffect(() => {
    if(!state) return;
    if(state.success){
        toast.success("User login succesfullylly")
    }else if(!state.success){
        toast.error(state.message)
    }
  }, [state]);


  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
        
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Login to your RentNest account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form  action={action} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            

            {/* Login button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/registration"
              className="font-medium text-primary hover:underline"
            >
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
      
    </main>
  );
};

export default LoginPage;