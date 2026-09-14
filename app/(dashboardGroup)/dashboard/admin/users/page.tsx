"use client";

import { getAllUsers } from '@/app/(dashboardGroup)/_actions/adminActions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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
      ) : (
        <ul>
          {users.map((item: any) => (
            <li key={item.id}>{item.name || item.email}</li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div>
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
      </div>
    </div>
  );
}

export default UserList;