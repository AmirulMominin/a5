"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { banUnban, getAllUsers } from '@/app/(dashboardGroup)/_actions/adminActions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";


function UserList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  
  const page = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("searchTerm") || "";

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  
  
  const updateQueryParams = (newPage: number, newSearch?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    
    if (newSearch !== undefined) {
      if (newSearch) {
        params.set("searchTerm", newSearch);
      } else {
        params.delete("searchTerm");
      }
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Pass page & searchTerm to your server action!
        const response = await getAllUsers(page.toString(), searchTerm);
        console.log(response,"61")
        setUsers(response?.data?.user ?? []);
        
        const limit = 5; 
        const total = response?.data?.totalUser ?? 0;
        setTotalPages(Math.ceil(total / 5) || 1);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, searchTerm]); // 


  const ban = async(uid:string,data:string)=>{
    const user = await banUnban(uid,data)
    console.log(user,"32")
    if(user.success){
      toast.success("User status updated")
      setUsers((prev) =>
      prev.map((u) => (u.id === uid ? { ...u, status: data } : u))
    );
    }else(
      toast.error("Error")
    )
  }

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by email..."
        defaultValue={searchTerm}
        onChange={(e) => updateQueryParams(1, e.target.value)} 
        style={{ padding: '8px', marginBottom: '16px' }}
      />

      {loading ? (
        <p>Loading...</p>
      ) :<div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>
                <Badge variant="outline">
                  {user.role}
                </Badge>
              </TableCell>

              <TableCell>
                {user.status === "ACTIVE" ? (
                  <Badge>Active</Badge>
                ) : (
                  <Badge variant="destructive">
                    Banned
                  </Badge>
                )}
              </TableCell>

              <TableCell className="text-right">
                {user.status === "ACTIVE" ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={()=>ban(user.id,"BANNED")}
                  >
                    Ban
                  </Button>
                ) : (
                  <Button size="sm"
                  onClick={()=>ban(user.id,"ACTIVE")}
                  >
                    Unban
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>}

      {/* Pagination Controls */}
      {/* <div>
        <button
          disabled={page <= 1}
          onClick={() => updateQueryParams(page - 1)}
        >
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          disabled={page >= totalPages}
          onClick={() => updateQueryParams(page + 1)}
        >
          Next
        </button>
      </div> */}

        <div className="flex items-center justify-between border-t px-4 py-4">
    
    <p className="text-sm text-muted-foreground">
      Page{" "}
      <span className="font-medium text-foreground">
        {page}
      </span>{" "}
      of{" "}
      <span className="font-medium text-foreground">
        {totalPages}
      </span>
    </p>

    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => updateQueryParams(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => updateQueryParams(page + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>

  </div>
</div>

   
  );
}

export default UserList;