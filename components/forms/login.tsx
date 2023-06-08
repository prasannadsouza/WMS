import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export type LoginFormParams = {
  title?: String
};

export const LoginForm = ({ title = "" }: LoginFormParams) => (
  <Card>
    <CardHeader>
      <CardTitle>{title} Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" type="email" placeholder="you@someplace.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="password" type="password" placeholder="#jds23ld" />
            </div>
          </div>
      </form>
    </CardContent>
    <CardFooter>
      <Button className="w-full" type="submit">
        Login
      </Button>
    </CardFooter>
  </Card>
);
