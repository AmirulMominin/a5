import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllRequest } from "../../_actions/tenentActions";

// const requests = [
//   {
//     id: "1",
//     propertyName: "Modern 2 Bedroom Apartment",
//     landlordName: "Mr. Rahman",
//     rent: 25000,
//     requestedAt: "2026-09-05",
//     rentalStatus: "PENDING",
//   },
//   {
//     id: "2",
//     propertyName: "Luxury Family Apartment",
//     landlordName: "Ahmed Khan",
//     rent: 35000,
//     requestedAt: "2026-09-03",
//     rentalStatus: "ACCEPTED",
//   },
//   {
//     id: "3",
//     propertyName: "Cozy 1 Bedroom Flat",
//     landlordName: "Karim Hasan",
//     rent: 18000,
//     requestedAt: "2026-08-30",
//     rentalStatus: "REJECTED",
//   },
// ];



const TenantRequestsPage = async() => {
  const allRentalRequest = await getAllRequest()
console.log("41",allRentalRequest)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          My Rental Requests
        </h1>

        <p className="mt-1 text-muted-foreground">
          View and manage your rental requests
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Property</TableHead> */}
              <TableHead>Proerty</TableHead>
              <TableHead>Rent</TableHead>
             
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allRentalRequest.data?.map((request) => (
              <TableRow key={request.id}>
                {/* Property */}
                <TableCell>
                  <p className="font-medium">
                    {request.property.name}
                  </p>
                </TableCell>

                {/* Landlord */}
                {/* <TableCell>
                  {request.landlordName}
                </TableCell> */}

                {/* Rent */}
                <TableCell>
                  ৳{request.property.rent.toLocaleString()}
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / month
                  </span>
                </TableCell>

                {/* Requested Date */}
                <TableCell>
                  {request.createdAt}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={
                      request.rentalStatus === "ACCEPTED"
                        ? "default"
                        : request.rentalStatus === "REJECTED"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {request.rentalStatus}
                  </Badge>
                </TableCell>

                {/* Action */}
                <TableCell>
                  <div className="flex justify-end">
                    {request.rentalStatus === "APPROVE" && (
                      <Button size="sm">
                        Pay Now
                      </Button>
                    )}

                    {request.rentalStatus === "PENDING" && (
                      <span className="text-sm text-muted-foreground">
                        Waiting for approval
                      </span>
                    )}

                    {request.rentalStatus === "REJECTED" && (
                      <span className="text-sm text-muted-foreground">
                        No action
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TenantRequestsPage;