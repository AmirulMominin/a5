import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>

          <CardTitle className="text-2xl">
            Payment Cancelled
          </CardTitle>

          <CardDescription>
            Your payment was cancelled and no payment was completed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Don't worry. Your rental request is still available.
            You can return to your requests and try the payment again.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button  className="w-full">
            <Link href="/tenant/requests">
              Back to My Requests
            </Link>
          </Button>

          <Button  variant="outline" className="w-full">
            <Link href="/tenant">
              Go to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;