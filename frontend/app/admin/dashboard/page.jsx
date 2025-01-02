"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar"; // Pastikan Sidebar diimpor
import axios from "axios"; // Pastikan axios sudah diimpor

export default function Dashboard() {
  const [categories, setCategories] = useState([]); // State untuk kategori
  const [objects, setObjects] = useState([]); // State untuk objek
  const router = useRouter();

  // Base URL API
  const baseURL = "http://localhost:9977"; // Ganti dengan URL API yang sesuai

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Jika token tidak ada, redirect ke halaman login
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  // Fetch kategori terbaru
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/categories/get-all`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch objek terbaru
  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/objects/get-all`);
        setObjects(response.data);
      } catch (error) {
        console.error("Error fetching objects:", error);
      }
    };
    fetchObjects();
  }, []);

  // Urutkan objek berdasarkan view_count (descending)
  const sortedObjects = objects.sort((a, b) => b.view_count - a.view_count);

  // Ambil 3 kategori terbaru
  const latestCategories = categories.slice(0, 3);

  // Ambil 3 objek terbaru
  const latestObjects = objects.slice(0, 3);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 p-6">
        {/* Box atas: Salam dan tombol logout */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Welcome to your dashboard, dear admin.</h1>
            <p className="text-gray-500">Here you can manage everything with ease.</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              router.push("/admin/login");
            }}
            className="bg-[#AAA577] text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Box tengah: Latest Categories & Latest Objects */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Latest Categories */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Latest Categories</h2>
            <ul>
              {latestCategories.map((category) => (
                <li key={category.id} className="mb-4">
                  <p className="font-medium">{category.name}</p>
                  <p className="text-gray-500 text-sm">
                    Created: {new Date(category.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Objects */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Latest Objects</h2>
            <ul>
              {latestObjects.map((object) => (
                <li key={object.id} className="mb-4 flex gap-4">
                  <img
                    src={object.image_url ? `${baseURL}${JSON.parse(object.image_url)[0]}` : '/placeholder.jpg'}
                    alt={object.name_english}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{object.name_english}</p>
                    <p className="text-gray-500 text-sm">
                      Created: {new Date(object.created_at).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Box bawah: Ranking Object */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Object View Rank</h2>
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
//         <p className="mb-20">Welcome to your dashboard, dear admin.</p>

//         <hr />
//         <hr />
//         <hr />
//         <hr />
//         <hr />

//         <h1 className="text-xl font-bold">Object View Rank</h1>
//         <p>A ranking list of objects in order of most to least views.</p>
        // <table className="min-w-full border-collapse mt-4">
        //   <thead>
        //     <tr>
        //       <th className="border px-4 py-2 w-16">Rank</th> {/* Ukuran kolom Rank */}
        //       <th className="border px-4 py-2 w-[200px]">ID</th> {/* Ukuran kolom ID */}
        //       <th className="border px-1 py-2 w-20">Image</th> {/* Ukuran kolom Gambar */}
        //       <th className="border px-4 py-2 w-[300px]">Name</th> {/* Ukuran kolom Nama */}
        //       <th className="border px-4 py-2 w-[200px]">Views</th> {/* Ukuran kolom Views */}
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {sortedObjects.map((object) => {
        //       const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];
        //       const firstImageUrl = imageUrls[0];

        //       return (
        //         <tr key={object.id}>
        //           <td className="border px-4 py-2 w-16">{sortedObjects.indexOf(object) + 1}</td>
        //           <td className="border px-4 py-2 w-[200px]">{object.id}</td>
        //           <td className="border px-1 py-2 w-20">
        //             {firstImageUrl && (
        //               <img
        //                 src={`${baseURL}${firstImageUrl}`}
        //                 alt={`Image 1`}
        //                 className="w-16 h-16 object-cover rounded"
        //               />
        //             )}
        //           </td>
        //           <td className="border px-4 py-2 w-[300px]">{object.name_english}</td>
        //           <td className="border px-4 py-2 w-[200px]">{object.view_count / 2}</td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
//       </div>
//     </div>
//   );
// }
