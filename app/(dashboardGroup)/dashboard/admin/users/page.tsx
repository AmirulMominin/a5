"use client";
import { getAllUsers } from '@/app/(dashboardGroup)/_actions/adminActions';
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getAllUsers()
        console.log("14",users.data.user)

        // if (!res.ok) {
        //   throw new Error(`Server responded with ${res.status}`);
        // }

        // const data = await users.json();
        setUsers(users.data.user ?? users.data.user ?? []); // match whatever your API actually returns
        setTotalPages(Math.ceil((users.data.totalUser ?? 0) / 5)); // match whatever your API actually returns
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // empty dependency array = fetch once on mount

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      <div>
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;