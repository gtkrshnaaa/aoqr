"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import axios from "axios"; // Pastikan axios sudah diimpor

export default function Dashboard() {
  const [objects, setObjects] = useState([]); // Menambahkan state untuk objek
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Jika token tidak ada, redirect ke halaman login
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const baseURL = 'http://localhost:9977';

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/objects/get-all`);
        setObjects(response.data); // Set data objek ke state
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    };

    fetchObjects();
  }, []);

  if (objects.length === 0) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-5">
          <h1 className="text-3xl">Admin Dashboard</h1>
          <p>Loading objects...</p>
        </div>
      </div>
    );
  }

  // Urutkan objek berdasarkan view_count (descending)
  const sortedObjects = objects.sort((a, b) => b.view_count - a.view_count);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <h1 className="text-3xl">Admin Dashboard</h1>
        <p className="mb-20">Selamat datang di halaman dashboard admin.</p>

        <hr />
        <hr />
        <hr />
        <hr />
        <hr />

        <h1 className="text-xl font-bold">Object View Rank</h1>
        <p>Daftar ranking object dengan urutan dilihat paling banyak ke paling sedikit</p>
        <table className="min-w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2 w-16">Rank</th> {/* Ukuran kolom Rank */}
              <th className="border px-4 py-2 w-[200px]">ID</th> {/* Ukuran kolom ID */}
              <th className="border px-1 py-2 w-20">Image</th> {/* Ukuran kolom Gambar */}
              <th className="border px-4 py-2 w-[300px]">Name</th> {/* Ukuran kolom Nama */}
              <th className="border px-4 py-2 w-[200px]">Views</th> {/* Ukuran kolom Views */}
            </tr>
          </thead>
          <tbody>
            {sortedObjects.map((object) => {
              const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];
              const firstImageUrl = imageUrls[0];

              return (
                <tr key={object.id}>
                  <td className="border px-4 py-2 w-16">{sortedObjects.indexOf(object) + 1}</td>
                  <td className="border px-4 py-2 w-[200px]">{object.id}</td>
                  <td className="border px-1 py-2 w-20">
                    {firstImageUrl && (
                      <img
                        src={`${baseURL}${firstImageUrl}`}
                        alt={`Image 1`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2 w-[300px]">{object.name_english}</td>
                  <td className="border px-4 py-2 w-[200px]">{object.view_count / 2}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}













// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "../components/sidebar";
// import axios from "axios"; // Pastikan axios sudah diimpor

// export default function Dashboard() {
//   const [objects, setObjects] = useState([]); // Menambahkan state untuk objek
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     // Jika token tidak ada, redirect ke halaman login
//     if (!token) {
//       router.push("/admin/login");
//     }
//   }, [router]);

//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     const fetchObjects = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/objects/get-all`);
//         setObjects(response.data); // Set data objek ke state
//       } catch (error) {
//         console.error('Error fetching objects:', error);
//       }
//     };

//     fetchObjects();
//   }, []);

//   if (objects.length === 0) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 p-5">
//           <h1 className="text-3xl">Admin Dashboard</h1>
//           <p>Loading objects...</p>
//         </div>
//       </div>
//     );
//   }

//   // Urutkan objek berdasarkan view_count (descending)
//   const sortedObjects = objects.sort((a, b) => b.view_count - a.view_count);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-5">
//         <h1 className="text-3xl">Admin Dashboard</h1>
//         <p>Selamat datang di halaman dashboard admin.</p>

//         <table className="min-w-full border-collapse mt-4">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Rank</th>
//               <th className="border px-4 py-2">ID</th>
//               <th className="border px-1 py-2">Image</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Views</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedObjects.map((object) => {
//               const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];
//               const firstImageUrl = imageUrls[0];

//               return (
//                 <tr key={object.id}>
//                   <td className="border px-4 py-2">{sortedObjects.indexOf(object) + 1}</td> {/* Menambahkan nomor urut */}
//                   <td className="border px-4 py-2">{object.id}</td>
//                   <td className="border px-1 py-2">
//                     {firstImageUrl && (
//                       <img
//                         src={`${baseURL}${firstImageUrl}`}
//                         alt={`Image 1`}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     )}
//                   </td>
//                   <td className="border px-4 py-2">{object.name_english}</td>
//                   <td className="border px-4 py-2">{object.view_count / 2}</td> {/* Menampilkan view_count */}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
