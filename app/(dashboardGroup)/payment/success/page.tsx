import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PaymentSuccessPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <CardTitle className="text-2xl">
            Payment Successful!
          </CardTitle>

          <CardDescription>
            Your rental payment has been successfully completed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Thank you for your payment. Your rental information has
            been updated successfully.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button  className="w-full">
            <Link href="/tenant/requests">
              View My Requests
            </Link>
          </Button>

          <Button  variant="outline" className="w-full">
            <Link href="/dashboard/tenant/requests">
              View My Requests
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;