 


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllRequests, requestsDecision } from "../../_actions/landloardActions";
import { toast } from "sonner";
import StatusButton from "../../_components/landloard/StatusButton";




const LandlordRequestsPage = async() => {
  
    const requests = await getAllRequests()
    // const statusButton = async(status:string, propertyId:string)=>{
    //     const result = await requestsDecision(status,propertyId)
    //     if(result.data.rentalStatus === "APPROVE"){
    //         toast.success("You have approved the request")
    //     }
    //     else if(result.data.rentalStatus === "REJECT"){
    //         toast.error("You have rejected the request")
    //     }
    // }
    
// console.log("44 line", requests)
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Rental Requests</h1>

        <p className="mt-1 text-muted-foreground">
          Manage rental requests from tenants
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.data.map((request) => (
              <TableRow key={request.id}>
                {/* Tenant */}
                <TableCell>
                  <div>
                    <p className="font-medium">
                      {request.tenant.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {request.tenant.email}
                    </p>
                  </div>
                </TableCell>

                {/* Property */}
                <TableCell>
                  {request.property.name}
                </TableCell>

                {/* Rent */}
                <TableCell>
                  ৳{request.property.rent}
                </TableCell>

                {/* Requested Date */}
                <TableCell>
                  {request.property.createdAt}
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

                {/* Actions */}
                <TableCell>
                  {request.rentalStatus === "PENDING" ? (
                    <div className="flex justify-end gap-2">
                      {/* <Button size="sm">
                        Accept
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={()=>statusButton("REJECT",request.id)}
                      >
                        Reject
                      </Button> */}
                      <StatusButton rentalId={request.id as string}></StatusButton>
                    </div>
                  ) : (
                    <div className="text-right text-sm text-muted-foreground">
                      No action
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LandlordRequestsPage;