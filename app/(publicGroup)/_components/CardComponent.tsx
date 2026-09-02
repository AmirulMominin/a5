
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PropertiesType } from "@/types/types";
import { Maximize } from "lucide-react";
import Link from "next/link";
const CardComponent = ({property} : {property : PropertiesType}) => {
  
  return (
   
    <Card className="overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-52 w-full">
        {/* <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover"
        /> */}
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{property.name}</h2>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            {property.type}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {property.details}
        </p>

        {/* Area */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          <Maximize className="h-4 w-4" />
          <span>{property.location} sq ft</span>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold">৳{property.rent}</span>
          <span className="text-sm text-muted-foreground"> / month</span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/properties/${property.id}`}>
        <Button className="w-full">
          View Details
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
  
}

export default CardComponent