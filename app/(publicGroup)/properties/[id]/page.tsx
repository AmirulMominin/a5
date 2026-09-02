import React from 'react'
import { getPropertyById } from '../../_actions/getPropertyById'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const getByIdPage = async({params}: {params: Promise<{ id: string }>}) => {
    const {id} = (await params)
    const property = await getPropertyById(id)
    
  return (
    <main className="container mx-auto px-4 py-10">
      {/* Back */}
      <div className="mb-6">
        <Link href={'/properties'}>
        <Button variant="ghost">
          ← Back to Properties
        </Button>
        </Link>
      </div>

      {/* Main section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-[400px] overflow-hidden rounded-xl">
          {/* <Image
            src={property.thumbnail}
            alt={property.name}
            fill
            className="object-cover"
          /> */}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              {property.type}
            </span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            {property.data.name}
          </h1>

          <p className="mt-3 text-muted-foreground">
            📍 {property.data.location}
          </p>

          

          <div className="mt-6">
            <p className="text-3xl font-bold">
              ৳{property.data.rent.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / month
              </span>
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <Button size="lg">
              Request to Rent
            </Button>

            <Button size="lg" variant="outline">
              Contact Landlord
            </Button>
          </div>
        </div>
      </div>

      {/* Property information */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">
          Property Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Property Type
              </p>
              <p className="mt-1 font-semibold">
                {property.data.type}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Area
              </p>
              <p className="mt-1 font-semibold">
                {property.data.area} sq ft
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Monthly Rent
              </p>
              <p className="mt-1 font-semibold">
                ৳{property.data.rent}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default getByIdPage