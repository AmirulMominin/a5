import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getProperty } from "../../_actions/landloardActions";
import AddPropertyDialog from "../../_components/landloard/AddProperty";

// const properties = [
//   {
//     id: "1",
//     thumbnail: "/images/property-1.jpg",
//     name: "Modern Family Apartment",
//     content:
//       "Beautiful apartment located in a peaceful residential area.",
//     price: 25000,
//     type: "Apartment",
//     area: 1200,
//     status: "AVAILABLE",
//   },
//   {
//     id: "2",
//     thumbnail: "/images/property-2.jpg",
//     name: "Luxury City Apartment",
//     content:
//       "Spacious apartment with excellent city views and facilities.",
//     price: 35000,
//     type: "Apartment",
//     area: 1500,
//     status: "RENTED",
//   },
//   {
//     id: "3",
//     thumbnail: "/images/property-3.jpg",
//     name: "Cozy Family House",
//     content:
//       "Comfortable family house with a beautiful garden.",
//     price: 45000,
//     type: "House",
//     area: 2000,
//     status: "AVAILABLE",
//   },
// ];

const LandlordPropertiesPage = async() => {
  const properties = await getProperty()
  console.log("ine 51",properties)
  return (
    // <div></div>
    <main className="container mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Properties
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage all your rental properties
          </p>
        </div>

        {<AddPropertyDialog></AddPropertyDialog>}
        {/* <Button asChild>
          <Link href="/dashboard/landlord/properties/new">
            + Add Property
          </Link>
        </Button> */}
        
      </div>

      {/* Properties */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.data?.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-52 w-full">
              <Image
                src={property.image}
                alt={property.name}
                fill
                className="object-cover"
              />

              {/* Status */}
              <span
                className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                  property.status === "AVAILABLE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {property.status}
              </span>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xl font-semibold">
                  {property.name}
                </h2>

                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  {property.type}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {property.content}
              </p>

              <div className="mt-4 flex justify-between text-sm">
                <span>
                  {property.area} sq ft
                </span>

                <span className="font-semibold">
                  ৳{property.rent}/month
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="flex-1"
              >
                <Link
                  href={`/properties/${property.id}`}
                >
                  View
                </Link>
              </Button>

              <Button
                asChild
                className="flex-1"
              >
                <Link
                  href={`/dashboard/landlord/properties/${property.id}/edit`}
                >
                  Edit
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    </main>
  );
};

export default LandlordPropertiesPage;