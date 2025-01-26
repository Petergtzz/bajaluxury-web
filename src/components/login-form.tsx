"use client";

import { login } from "@/app/login/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className={cn("flex flex-col gap-4 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Welcome to Baja Luxury Management
          </CardTitle>
          <CardDescription>Whatever</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="m@example.com" />
                  {state?.errors?.email && (
                    <p className="text-red-500">{state.errors.email}</p>
                  )}
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" />
                  {state?.errors?.password && (
                    <p className="text-red-500">{state.errors.password}</p>
                  )}
                </div>
                <LoginButton />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground text-white [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Login
    </Button>
  );
}
