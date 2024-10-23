import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
     name: string;
     catchPhrase: string;
     bs: string;
  }
}

async function fetchUser(): Promise<User[]> {
     const response = await fetch(import.meta.env.VITE_URL_USER);
     const data = await response.json();
     return data;
}

const UserList = () => {
     const [users, setUsers] = useState<User[]>([]);
     const [error, setError] = useState<string | null >(null);
     const [loading, setLoading] = useState<boolean>(true);

     useEffect(() => {
          async function fetchData() {
               try {
                    // Loading
                    setLoading(true);

                    const data = await fetchUser();
                    setUsers(data);
               } catch (error: unknown) {
                    if(error instanceof Error) {
                         setError(error.message);
                    } else {
                         setError('An unknown error occurred');
                    }
               } finally {
                    setLoading(false);
               }
          }
          fetchData();
     }, []);

     if (loading) {
          return <div className="min-h-screen text-2xl font-bold flex justify-center items-center">Loading...</div>
     }

     if (error) {
          return <div>{error}</div>
     }

     return (
          <div className="max-w-[80%] min-h-screen border-2 border-black flex flex-wrap flex-row gap-10 justify-center items-center mx-auto py-10 my-10">
               {users.map((user) => (
                    <div key={user.id} className="p-10 border border-gray-500">
                         <h1>Name: {user.name}</h1>
                         <p>Email: {user.email}</p>
                         <p>Address: {user.address.street}</p>
                    </div>
               ))}
          </div>
     )
};

export default UserList;
