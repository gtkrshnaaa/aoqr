// app/admin/dashboard/sidebar.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("authToken");

    // Redirect ke halaman login
    router.push("/admin/login");
  };

  return (
    <div className="w-64 h-screen bg-[#AAA577] text-white p-5 sticky top-0">
      <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
      <ul>
        <li>
          <Link
            href="/admin/dashboard"
            className="block py-2 px-4 hover:bg-gray-100 hover:bg-opacity-10 hover:text-white rounded"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/categories"
            className="block py-2 px-4 hover:bg-gray-100 hover:bg-opacity-10 hover:text-white rounded"
          >
            Manage Category
          </Link>
        </li>
        <li>
          <Link
            href="/admin/objects"
            className="block py-2 px-4 hover:bg-gray-100 hover:bg-opacity-10 hover:text-white rounded"
          >
            Manage Object
          </Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-5 w-full py-2 px-4 bg-white rounded text-[#AAA577]"
      >
        Logout
      </button>
    </div>
  );
}






// // app/admin/dashboard/sidebar.jsx
// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function Sidebar() {
//   const router = useRouter();

//   const handleLogout = () => {
//     // Hapus token dari localStorage
//     localStorage.removeItem("authToken");

//     // Redirect ke halaman login
//     router.push("/admin/login");
//   };

//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-5">
//       <h2 className="text-2xl mb-5">Admin Dashboard</h2>
//       <ul>
//         <li>
//           <Link
//             href="/admin/dashboard"
//             className="block py-2 px-4 hover:bg-gray-700 rounded"
//           >
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/admin/categories"
//             className="block py-2 px-4 hover:bg-gray-700 rounded"
//           >
//             Pengelolaan Kategori
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/admin/objects"
//             className="block py-2 px-4 hover:bg-gray-700 rounded"
//           >
//             Pengelolaan Objek
//           </Link>
//         </li>
//       </ul>
//       <button
//         onClick={handleLogout}
//         className="mt-5 w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
