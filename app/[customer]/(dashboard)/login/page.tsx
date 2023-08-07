/*
  import { CustomerRoute } from "@/lib/route-params";
import { LoginForm } from "@/components/forms/login";

 */
import { CustomerRoute } from "@/lib/route-params";
import { LoginForm } from "@/components/forms/login";

export default function LoginPage({ params: { customer } }: CustomerRoute) {
    return (
        <div className="grid place-content-center w-full h-screen">
            <LoginForm title={customer.toUpperCase()} />
        </div>
    );
}
