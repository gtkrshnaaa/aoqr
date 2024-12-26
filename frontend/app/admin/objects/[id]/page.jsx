'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Sidebar from "../../components/sidebar";

export default function DetailObjectPage() {
  const [object, setObject] = useState(null);
  const [qrCodeLoading, setQrCodeLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const baseURL = 'http://localhost:9977';

  useEffect(() => {
    if (id) {
      fetchObjectDetail(id);
    }
  }, [id]);

  const fetchObjectDetail = async (objectId) => {
    try {
      const response = await axios.get(`${baseURL}/api/objects/get-by-id/${objectId}`);
      console.log(response.data);
      setObject(response.data);
    } catch (error) {
      console.error('Failed to fetch object detail', error);
    }
  };

  const handleGenerateQRCode = async () => {
    if (!id) return;
    setQrCodeLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/objects/generate-qr/${id}`);
      setObject((prev) => ({ ...prev, qr_image_url: response.data.qr_image_url }));
    } catch (error) {
      console.error('Failed to generate QR code', error);
    } finally {
      setQrCodeLoading(false);
    }
  };

  if (!object) return <p>Loading...</p>;

  // Parse image_url yang berupa string JSON menjadi array
  const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-5">

        {/* Render gambar-gambar dari imageUrls */}
        {imageUrls.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={`${baseURL}${imageUrl}`}
                alt={`Image ${index + 1}`}
                className="w-full h-64 object-cover rounded"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images available.</p>
        )}
        <p className="text-gray-700 mb-2">Kategori: {object.category_name}</p>

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: English</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_english}</h3>
        <p className="text-gray-500 mb-4">{object.location_english}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_english }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Chinese (Simplified)</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_chinese_simp}</h3>
        <p className="text-gray-500 mb-4">{object.location_chinese_simp}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_chinese_simp }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Dutch</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_dutch}</h3>
        <p className="text-gray-500 mb-4">{object.location_dutch}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_dutch }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Indonesian</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_indonesian}</h3>
        <p className="text-gray-500 mb-4">{object.location_indonesian}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_indonesian }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Japanese</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_japanese}</h3>
        <p className="text-gray-500 mb-4">{object.location_japanese}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_japanese }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Korean</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_korean}</h3>
        <p className="text-gray-500 mb-4">{object.location_korean}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_korean }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Russian</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_russian}</h3>
        <p className="text-gray-500 mb-4">{object.location_russian}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_russian }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Spanish</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_spanish}</h3>
        <p className="text-gray-500 mb-4">{object.location_spanish}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_spanish }} />

        <hr />
        <h1 className="text-3xl font-bold mb-4">Language: Dutch</h1>
        <h3 className="text-xl font-bold mb-4">Name: {object.name_dutch}</h3>
        <p className="text-gray-500 mb-4">{object.location_dutch}</p>
        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: object.description_dutch }} />
        <hr />

        
        <div className="mt-5">
          <h2 className="text-2xl font-semibold mb-2">QR Code</h2>
          {object.qr_image_url ? (
            <img
              src={`${baseURL}${object.qr_image_url}`}
              alt="QR Code"
              className="w-48 h-48 object-contain mb-4"
            />
          ) : (
            <p className="text-gray-500">QR Code belum tersedia.</p>
          )}
          <button
            onClick={handleGenerateQRCode}
            disabled={qrCodeLoading}
            className={`px-4 py-2 mt-2 text-white ${qrCodeLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} rounded`}
          >
            {qrCodeLoading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>
      </div>
    </div>
  );
}






// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import Sidebar from "../../components/sidebar";


// export default function DetailObjectPage() {
//   const [object, setObject] = useState(null);
//   const { id } = useParams(); // Gunakan useParams untuk mendapatkan id dari URL
//   const router = useRouter();
//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     if (id) {
//       fetchObjectDetail(id);
//     }
//   }, [id]);

//   const fetchObjectDetail = async (objectId) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/objects/get-by-id/${objectId}`);
//       console.log(response.data);
//       setObject(response.data);
//     } catch (error) {
//       console.error('Failed to fetch object detail', error);
//     }
//   };

//   if (!object) return <p>Loading...</p>;

//   return (
//     <div className="flex">
//       <Sidebar />
//         <div className="container mx-auto p-5">
//         <h1 className="text-3xl font-bold mb-4">{object.name}</h1>
//         <p className="text-gray-700 mb-2">Kategori: {object.category_name}</p>
//         <p className="text-gray-500 mb-4">{object.location}</p>
//         <img src={`${baseURL}${object.image_url}`} alt={object.name} className="w-full h-64 object-cover mb-4" />
//         <p className="text-gray-700">{object.description}</p>
//         </div>
//     </div>
//   );
// }
