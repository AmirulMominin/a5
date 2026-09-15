
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-64px)] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find a Place You’ll
              <span className="block text-primary">
                Love to Call Home
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Discover comfortable and affordable properties for rent.
              Browse apartments, houses, and other properties in one place.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button  size="lg">
                <Link href="/properties">
                  View All Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              
            </div>
          </div>
        </div>
      </section>

      {/* Simple Features Section */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
          <div className="rounded-xl border bg-background p-6">
            <h2 className="text-xl font-semibold">
              Find Properties
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse properties that match your needs and budget.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-6">
            <h2 className="text-xl font-semibold">
              Easy Rental
            </h2>
            <p className="mt-2 text-muted-foreground">
              Send rental requests and manage everything from your dashboard.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-6">
            <h2 className="text-xl font-semibold">
              Secure Payments
            </h2>
            <p className="mt-2 text-muted-foreground">
              Make your rental payments securely through RentNest.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

