"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerAction } from "../_actions/registerAction";
import { toast } from "sonner";

const RegisterPage = () => {
  const [role, setRole] = useState("");
  const [state, action, pending] = useActionState(registerAction, null);

  useEffect(() => {
    if(!state) return;
    if(state.success){
        toast.success("User Register succesfullylly")
    }else if(!state.success){
        toast.error(state.message)
    }
  }, [state]);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create an Account</CardTitle>
          <CardDescription>
            Join RentNest and find your perfect property
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action} className="space-y-5">
            

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>Register as</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tenant">Tenant</SelectItem>
                  <SelectItem value="Landlord">Landlord</SelectItem>
                </SelectContent>
              </Select>
              {/* Hidden input ensures 'role' is included in FormData */}
              <input type="hidden" name="role" value={role} />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;