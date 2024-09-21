import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/login";

export function Login() {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        login(
          event.currentTarget.email.value,
          event.currentTarget.password.value,
        );
        if (localStorage.getItem("role") === "teacher") {
          navigate("/teacher");
        } else if (localStorage.getItem("role") === "student") {
          navigate("/student");
        }
      }}
    >
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-cyan-500 to-primary">
        <Card className="m-6 w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue="jane.doe@company.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue="verystrongpassword"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <LoadingButton loading={false} type="submit" className="w-full">
              Sign in
            </LoadingButton>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
