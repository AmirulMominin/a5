
import Link from "next/link";
import { Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">

        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Home className="h-10 w-10 text-muted-foreground" />
        </div>

        {/* 404 */}
        <p className="text-7xl font-bold tracking-tight">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-3 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved, deleted, or the URL may be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/properties">
              <Search className="mr-2 h-4 w-4" />
              Browse Properties
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;

