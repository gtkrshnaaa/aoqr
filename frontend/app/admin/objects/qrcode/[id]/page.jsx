'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Sidebar from "../../../components/sidebar";

export default function QRCodePage() {
  const [object, setObject] = useState(null);
  const [qrCodeLoading, setQrCodeLoading] = useState(false);
  const { id } = useParams(); // Mendapatkan ID dari URL
  const baseURL = 'http://localhost:9977';

  useEffect(() => {
    if (id) {
      fetchObjectDetail(id);
    }
  }, [id]);

  const fetchObjectDetail = async (objectId) => {
    try {
      const response = await axios.get(`${baseURL}/api/objects/get-by-id/${objectId}`);
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

  const handleDownloadQRCode = async () => {
    if (!object?.qr_image_url) return;

    try {
      const response = await axios.get(`${baseURL}${object.qr_image_url}`, {
        responseType: 'blob', // Mendapatkan data sebagai Blob
      });

      // Buat URL sementara untuk Blob
      const blobUrl = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `qrcode_${object.name_english}.png`; // Nama file untuk diunduh
      link.click();

      // Hapus URL sementara setelah digunakan
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to download QR code', error);
    }
  };

  if (!object) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-4">QR Code</h1>
        <div className="mt-5">
          <h2 className="text-2xl font-semibold mb-2">{object.name_english}</h2>
          {object.qr_image_url ? (
            <>
              <img
                src={`${baseURL}${object.qr_image_url}`}
                alt="QR Code"
                className="w-90 h-90 object-contain mb-4"
              />
              {/* Tombol untuk mengunduh langsung QR Code */}
              <button
                onClick={handleDownloadQRCode}
                className="bg-gray-200 text-[#AAA577] px-4 py-2 rounded mb-4 mr-2"
              >
                Download QR Code
              </button>
            </>
          ) : (
            <p className="text-gray-500">QR Code is not yet available.</p>
          )}
          <button
            onClick={handleGenerateQRCode}
            disabled={qrCodeLoading}
            className={`px-4 py-2 mt-2 text-white ${qrCodeLoading ? 'bg-gray-500' : 'bg-[#AAA577]'} rounded`}
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
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Sidebar from "../../../components/sidebar";

// export default function QRCodePage() {
//   const [object, setObject] = useState(null);
//   const [qrCodeLoading, setQrCodeLoading] = useState(false);
//   const { id } = useParams(); // Mendapatkan ID dari URL
//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     if (id) {
//       fetchObjectDetail(id);
//     }
//   }, [id]);

//   const fetchObjectDetail = async (objectId) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/objects/get-by-id/${objectId}`);
//       setObject(response.data);
//     } catch (error) {
//       console.error('Failed to fetch object detail', error);
//     }
//   };

//   const handleGenerateQRCode = async () => {
//     if (!id) return;
//     setQrCodeLoading(true);
//     try {
//       const response = await axios.post(`${baseURL}/api/objects/generate-qr/${id}`);
//       setObject((prev) => ({ ...prev, qr_image_url: response.data.qr_image_url }));
//     } catch (error) {
//       console.error('Failed to generate QR code', error);
//     } finally {
//       setQrCodeLoading(false);
//     }
//   };

//   if (!object) return <p>Loading...</p>;

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="container mx-auto p-5">
//         <h1 className="text-3xl font-bold mb-4">QR Code for: {object.name_english}</h1>
//         <div className="mt-5">
//           <h2 className="text-2xl font-semibold mb-2">QR Code</h2>
//           {object.qr_image_url ? (
//             <img
//               src={`${baseURL}${object.qr_image_url}`}
//               alt="QR Code"
//               className="w-48 h-48 object-contain mb-4"
//             />
//           ) : (
//             <p className="text-gray-500">QR Code is not yet available.</p>
//           )}
//           <button
//             onClick={handleGenerateQRCode}
//             disabled={qrCodeLoading}
//             className={`px-4 py-2 mt-2 text-white ${qrCodeLoading ? 'bg-gray-500' : 'bg-[#AAA577]'} rounded`}
//           >
//             {qrCodeLoading ? 'Generating...' : 'Generate QR Code'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
