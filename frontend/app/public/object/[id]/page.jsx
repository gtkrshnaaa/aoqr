// frontend/app/public/object/tryfe/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import jsPDF from 'jspdf';
import Image from 'next/image';

export default function DetailObjectPage() {
  const [object, setObject] = useState(null);
  const [language, setLanguage] = useState('en'); // Default bahasa Inggris
  const [isModalOpen, setModalOpen] = useState(false);
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
      const response = await axios.get(`${baseURL}/api/public/objects/get-by-id/${objectId}`);
      const data = response.data;
      console.log(response.data);

      // Update state dengan data sesuai bahasa yang dipilih
      setObject(data);
    } catch (error) {
      console.error('Failed to fetch object detail:', error.message);
    }
  };

  // Menampilkan nama, lokasi, dan deskripsi berdasarkan bahasa yang dipilih
  const getTranslatedField = (field) => {
    const languageMap = {
      en: `name_english`,
      id: `name_indonesian`,
      zh: `name_chinese_simp`,
      nl: `name_dutch`,
      ja: `name_japanese`,
      ko: `name_korean`,
      ru: `name_russian`,
      es: `name_spanish`
    };
    return object ? object[languageMap[language] || 'name_english'] : '';
  };

  const getTranslatedLocation = () => {
    const languageMap = {
      en: 'location_english',
      id: 'location_indonesian',
      zh: 'location_chinese_simp',
      nl: 'location_dutch',
      ja: 'location_japanese',
      ko: 'location_korean',
      ru: 'location_russian',
      es: 'location_spanish'
    };
    return object ? object[languageMap[language] || 'location_english'] : '';
  };

  const getTranslatedDescription = () => {
    const languageMap = {
      en: 'description_english',
      id: 'description_indonesian',
      zh: 'description_chinese_simp',
      nl: 'description_dutch',
      ja: 'description_japanese',
      ko: 'description_korean',
      ru: 'description_russian',
      es: 'description_spanish'
    };
    return object ? object[languageMap[language] || 'description_english'] : '';
  };

  if (!object) return <p>Loading...</p>;

  // Parse image_url yang berupa string JSON menjadi array
  const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];


  // Fungsi untuk scroll gambar ke kiri
  const scrollLeft = () => {
    const gallery = document.getElementById('image-gallery');
    const firstImage = gallery.querySelector('img');
    const imageWidth = firstImage ? firstImage.clientWidth : 400; // Default 400 jika tidak ada gambar
    const margin = 16; // Ubah sesuai dengan margin antar gambar (dalam piksel)
    gallery.scrollBy({
      left: -(imageWidth + margin), // Scroll sesuai lebar gambar + margin
      behavior: 'smooth',
    });
  };

  // Fungsi untuk scroll gambar ke kanan
  const scrollRight = () => {
    const gallery = document.getElementById('image-gallery');
    const firstImage = gallery.querySelector('img');
    const imageWidth = firstImage ? firstImage.clientWidth : 400; // Default 400 jika tidak ada gambar
    const margin = 16; // Ubah sesuai dengan margin antar gambar (dalam piksel)
    gallery.scrollBy({
      left: imageWidth + margin, // Scroll sesuai lebar gambar + margin
      behavior: 'smooth',
    });
  };





  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setModalOpen(false); // Tutup modal setelah memilih bahasa
  };

  const languageMap = {
    en: 'English',
    id: 'Bahasa Indonesia',
    es: 'Español',
    ru: 'Русский', // Russian
    nl: 'Nederlands',
    ja: '日本語',
    ko: '한국어',
    zh: '中文 (简体)', // Simplified Chinese
  };

  const exportToPDF = () => {
    const element = document.getElementById('export-content'); // Elemen HTML yang mau di-export
    
    // Tampilkan elemen sebelum export
    element.style.display = 'block';

    // Tunggu semua gambar selesai dimuat
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve; // Tetap resolve meskipun gagal load
          }
        })
    );

    Promise.all(imagePromises).then(() => {
      const pdf = new jsPDF({
        unit: 'px', // Satuan untuk ukuran
        format: 'a4', // Format kertas
      });

      pdf.html(element, {
        callback: (doc) => {
          doc.save(object.name_english);
          // doc.save(getTranslatedField('name'));

          // Sembunyikan elemen setelah export selesai
          element.style.display = 'none';

        },
        x: 20, // Margin kiri
        y: 20, // Margin atas
        html2canvas: {
          scale: 2 / window.devicePixelRatio, // Sesuaikan dengan rasio pixel
          useCORS: true,
          windowPadding: 20,
        },
        autoPaging: true, // Atur agar teks otomatis berpindah halaman
        margin: [20, 20, 40, 20], // [atas, kanan, bawah, kiri]
      });
    });
  };

  return (
    <div className="bg-[#F7EFE8]">
    <div className="bg-[#F7EFE8] mx-auto">
      {/* Navbar */}
      <div className="flex justify-between items-center z-20 top-0 sticky shadow px-5 py-4 border-b bg-white">
      {/* Logo di kiri */}
      <div className="text-2xl font-bold">
        <Image
          src="/assets/img/ambrlogo.png"
          alt="Facebook"
          className="h-12 object-contain"
          width={100} // tambahkan properti width
          height={80} // tambahkan properti height
        />
      </div>

      {/* Kontainer tombol di kanan, menggunakan flex untuk tombol berdekatan */}
      <div className="flex items-center space-x-4">
        {/* Tombol untuk export PDF */}
        <button
          onClick={exportToPDF}
          className="p-2 hover:text-gray-500 hover:bg-gray-100 text-[#AAA577] rounded-full"
        >
          Export to PDF
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <span className="material-icons cursor-pointer hover:text-gray-500 text-[#AAA577]">
            translate
          </span>
        </button>

      </div>
    </div>

    <div>
      {/* Popup Modal untuk ganti bahasa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Pilih Bahasa</h2>
            <div className="flex flex-col gap-4">
              {Object.keys(languageMap).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`p-2 border rounded ${
                    language === lang ? 'bg-[#AAA577] text-white' : 'bg-gray-100'
                  }`}
                >
                  {languageMap[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className='w-full'>
        {/* Gambar objek berjajar horizontal */}
        <div>
          {imageUrls.length > 0 ? (
              <div id="image-gallery" className="flex overflow-x-hidden space-x-4 py-[0px] mb-4">
                {imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={`${baseURL}${imageUrl}`}
                    alt={`Image ${index + 1}`}
                    className="max-w-100 max-h-80"
                    crossOrigin="anonymous"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images available.</p>
            )}

            {/* Tombol navigasi */}
            <div className="absolute sm:top-[200px] top-[140px] left-[10px] right-[10px] flex justify-between items-center z-10 py-2">
              <button
                onClick={scrollLeft}
                className="material-icons text-white text-4xl"
              >
                arrow_circle_left
              </button>
              <button
                onClick={scrollRight}
                className="material-icons text-white text-4xl"
              >
                arrow_circle_right
              </button>
            </div>
          </div>

        {/* Detail Objek */}
        <div className="object-detail-wrapper mb-4 mx-5">
          <h1 className="text-2xl font-poppins mb-4">{getTranslatedField('name')}</h1>
          {/* <p className="text-base font-poppins">Category: {object.category_name}</p> */}
          <p className="text-base font-poppins mb-4"><span className="material-icons mr-2">location_on</span> {getTranslatedLocation()}</p>

          <div
            id='object-description'
            className="desc-wrapper text-base mb-4 font-poppins font-light"
            dangerouslySetInnerHTML={{ __html: getTranslatedDescription() }}
          />
        </div>
      </div>
      </div>
    </div>


    {/* export pdf */}
    <div id='export-content' className="hidden break-inside-avoid break-after-page">
        
        {/* Gambar objek berjajar horizontal */}
        <div>
          {imageUrls.length > 0 ? (
              <div id="image-gallery" className="flex flex-wrap gap-3 mx-5 mb-4">
                {imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={`${baseURL}${imageUrl}`}
                    alt={`Image ${index + 1}`}
                    className="max-w-50 max-h-80"
                    crossOrigin="anonymous"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images available.</p>
            )}

          </div>

        {/* Detail Objek */}
        {/* <div className="object-detail-wrapper mb-4 mx-5">
          <h1 className="text-2xl font-poppins mb-4">{getTranslatedField('name')}</h1>

          <div
            id='object-description'
            className="desc-wrapper text-base mb-4 font-poppins font-light"
            dangerouslySetInnerHTML={{ __html: getTranslatedDescription() }}
          />
        </div> */}

        <div className="object-detail-wrapper mb-4 mx-5">
          <h1 className="text-2xl font-poppins mb-4">{object.name_english}</h1>

          <div
            id='object-description'
            className="desc-wrapper text-base mb-4 font-poppins font-light"
            dangerouslySetInnerHTML={{ __html: object.description_english }}
          />
        </div>

    </div>


    {/* footer */}

    <footer className="bg-[#9F9B6E] text-white p-4">
    <p className="text-center font-normal mb-3">ROYAL AMBARRUKMO YOGYAKARTA</p>
    <p className="text-center font-light mb-3">
      Jalan Laksada Adisucipto No. 81, <br />Yogyakarta 55281 - Indonesia
    </p>
    <p className="text-center font-light mb-3">Tel : +62 274 488 488</p>
    <p className="text-center font-light mb-3">
      Email : info@royalambarrukmo.com
    </p>
    <hr className="border-t-2 border-[#8F8B5E] mb-4" />

    <div className="flex justify-center space-x-6 mt-4 mb-4">
      <a href="#" aria-label="Facebook">
      <Image
        src="/assets/img/Facebook.png"
        alt="Facebook"
        className="h-8 w-8 hover:opacity-80"
        width={32} // tambahkan properti width
        height={32} // tambahkan properti height
      />
      </a>
      <a href="#" aria-label="Instagram">
        <Image
          src="/assets/img/Instagram.png"
          alt="Instagram"
          className="h-8 w-8 hover:opacity-80"
          width={32} // tambahkan properti width
          height={32} // tambahkan properti height
        />
      </a>
      <a href="#" aria-label="You Tube">
        <Image
          src="/assets/img/Youtube.png"
          alt="You Tube"
          className="h-8 w-8 hover:opacity-80"
          width={32} // tambahkan properti width
          height={32} // tambahkan properti height
        />
      </a>
    </div>
    <hr className="border-t-2 border-[#8F8B5E] mb-4" />
    <p className="text-center font-light size text-sm">
      © Royal Ambarrukmo Yogyakarta 2024
    </p>
    </footer>

  </div>
  );
}















// // frontend/app/public/object/tryfe/[id]/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import Image from 'next/image';

// export default function DetailObjectPage() {
//   const [object, setObject] = useState(null);
//   const [language, setLanguage] = useState('en'); // Default bahasa Inggris
//   const [isModalOpen, setModalOpen] = useState(false);
//   const { id } = useParams();
//   const router = useRouter();
//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     if (id) {
//       fetchObjectDetail(id);
//     }
//   }, [id]);

//   const fetchObjectDetail = async (objectId) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/public/objects/get-by-id/${objectId}`);
//       const data = response.data;
//       console.log(response.data);

//       // Update state dengan data sesuai bahasa yang dipilih
//       setObject(data);
//     } catch (error) {
//       console.error('Failed to fetch object detail:', error.message);
//     }
//   };

//   // Menampilkan nama, lokasi, dan deskripsi berdasarkan bahasa yang dipilih
//   const getTranslatedField = (field) => {
//     const languageMap = {
//       en: `name_english`,
//       id: `name_indonesian`,
//       zh: `name_chinese_simp`,
//       nl: `name_dutch`,
//       ja: `name_japanese`,
//       ko: `name_korean`,
//       ru: `name_russian`,
//       es: `name_spanish`
//     };
//     return object ? object[languageMap[language] || 'name_english'] : '';
//   };

//   const getTranslatedLocation = () => {
//     const languageMap = {
//       en: 'location_english',
//       id: 'location_indonesian',
//       zh: 'location_chinese_simp',
//       nl: 'location_dutch',
//       ja: 'location_japanese',
//       ko: 'location_korean',
//       ru: 'location_russian',
//       es: 'location_spanish'
//     };
//     return object ? object[languageMap[language] || 'location_english'] : '';
//   };

//   const getTranslatedDescription = () => {
//     const languageMap = {
//       en: 'description_english',
//       id: 'description_indonesian',
//       zh: 'description_chinese_simp',
//       nl: 'description_dutch',
//       ja: 'description_japanese',
//       ko: 'description_korean',
//       ru: 'description_russian',
//       es: 'description_spanish'
//     };
//     return object ? object[languageMap[language] || 'description_english'] : '';
//   };

//   if (!object) return <p>Loading...</p>;

//   // Parse image_url yang berupa string JSON menjadi array
//   const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];


//   // Fungsi untuk scroll gambar ke kiri
//   const scrollLeft = () => {
//     const gallery = document.getElementById('image-gallery');
//     const firstImage = gallery.querySelector('img');
//     const imageWidth = firstImage ? firstImage.clientWidth : 400; // Default 400 jika tidak ada gambar
//     const margin = 16; // Ubah sesuai dengan margin antar gambar (dalam piksel)
//     gallery.scrollBy({
//       left: -(imageWidth + margin), // Scroll sesuai lebar gambar + margin
//       behavior: 'smooth',
//     });
//   };

//   // Fungsi untuk scroll gambar ke kanan
//   const scrollRight = () => {
//     const gallery = document.getElementById('image-gallery');
//     const firstImage = gallery.querySelector('img');
//     const imageWidth = firstImage ? firstImage.clientWidth : 400; // Default 400 jika tidak ada gambar
//     const margin = 16; // Ubah sesuai dengan margin antar gambar (dalam piksel)
//     gallery.scrollBy({
//       left: imageWidth + margin, // Scroll sesuai lebar gambar + margin
//       behavior: 'smooth',
//     });
//   };





//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage);
//     setModalOpen(false); // Tutup modal setelah memilih bahasa
//   };

//   const languageMap = {
//     en: 'English',
//     id: 'Bahasa Indonesia',
//     es: 'Español',
//     ru: 'Русский', // Russian
//     nl: 'Nederlands',
//     ja: '日本語',
//     ko: '한국어',
//     zh: '中文 (简体)', // Simplified Chinese
//   };

//   const exportToPDF = () => {
//     const element = document.getElementById('export-content'); // Elemen HTML yang mau di-export
    
//     // Tampilkan elemen sebelum export
//     element.style.display = 'block';

//     // Tunggu semua gambar selesai dimuat
//     const images = element.querySelectorAll('img');
//     const imagePromises = Array.from(images).map(
//       (img) =>
//         new Promise((resolve) => {
//           if (img.complete) {
//             resolve();
//           } else {
//             img.onload = resolve;
//             img.onerror = resolve; // Tetap resolve meskipun gagal load
//           }
//         })
//     );

//     Promise.all(imagePromises).then(() => {
//       const pdf = new jsPDF({
//         unit: 'px', // Satuan untuk ukuran
//         format: 'a4', // Format kertas
//       });

//       pdf.html(element, {
//         callback: (doc) => {
//           doc.save(getTranslatedField('name'));

//           // Sembunyikan elemen setelah export selesai
//           element.style.display = 'none';

//         },
//         x: 20, // Margin kiri
//         y: 20, // Margin atas
//         html2canvas: {
//           scale: 2 / window.devicePixelRatio, // Sesuaikan dengan rasio pixel
//           useCORS: true,
//           windowPadding: 20,
//         },
//         autoPaging: true, // Atur agar teks otomatis berpindah halaman
//         margin: [20, 20, 40, 20], // [atas, kanan, bawah, kiri]
//       });
//     });
//   };

//   return (
//     <div className="bg-[#F7EFE8]">
//     <div className="bg-[#F7EFE8] mx-auto">
//       {/* Navbar */}
//       <div className="flex justify-between items-center z-20 top-0 sticky shadow px-5 py-4 border-b bg-white">
//       {/* Logo di kiri */}
//       <div className="text-2xl font-bold">
//         <Image
//           src="/assets/img/ambrlogo.png"
//           alt="Facebook"
//           className="h-12 object-contain"
//           width={100} // tambahkan properti width
//           height={80} // tambahkan properti height
//         />
//       </div>

//       {/* Kontainer tombol di kanan, menggunakan flex untuk tombol berdekatan */}
//       <div className="flex items-center space-x-4">
//         {/* Tombol untuk export PDF */}
//         <button
//           onClick={exportToPDF}
//           className="p-2 hover:text-gray-500 hover:bg-gray-100 text-[#AAA577] rounded-full"
//         >
//           Export to PDF
//         </button>

//         <button
//           onClick={() => setModalOpen(true)}
//           className="p-1 rounded-full hover:bg-gray-100"
//         >
//           <span className="material-icons cursor-pointer hover:text-gray-500 text-[#AAA577]">
//             translate
//           </span>
//         </button>

//       </div>
//     </div>

//     <div>
//       {/* Popup Modal untuk ganti bahasa */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-5 rounded-lg w-full max-w-sm">
//             <h2 className="text-xl font-bold mb-4">Pilih Bahasa</h2>
//             <div className="flex flex-col gap-4">
//               {Object.keys(languageMap).map((lang) => (
//                 <button
//                   key={lang}
//                   onClick={() => handleLanguageChange(lang)}
//                   className={`p-2 border rounded ${
//                     language === lang ? 'bg-[#AAA577] text-white' : 'bg-gray-100'
//                   }`}
//                 >
//                   {languageMap[lang]}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className='w-full'>
//         {/* Gambar objek berjajar horizontal */}
//         <div>
//           {imageUrls.length > 0 ? (
//               <div id="image-gallery" className="flex overflow-x-hidden space-x-4 py-[0px] mb-4">
//                 {imageUrls.map((imageUrl, index) => (
//                   <img
//                     key={index}
//                     src={`${baseURL}${imageUrl}`}
//                     alt={`Image ${index + 1}`}
//                     className="max-w-100 max-h-80"
//                     crossOrigin="anonymous"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No images available.</p>
//             )}

//             {/* Tombol navigasi */}
//             <div className="absolute sm:top-[200px] top-[140px] left-[10px] right-[10px] flex justify-between items-center z-10 py-2">
//               <button
//                 onClick={scrollLeft}
//                 className="material-icons text-white text-4xl"
//               >
//                 arrow_circle_left
//               </button>
//               <button
//                 onClick={scrollRight}
//                 className="material-icons text-white text-4xl"
//               >
//                 arrow_circle_right
//               </button>
//             </div>
//           </div>

//         {/* Detail Objek */}
//         <div className="object-detail-wrapper mb-4 mx-5">
//           <h1 className="text-2xl font-poppins mb-4">{getTranslatedField('name')}</h1>
//           {/* <p className="text-base font-poppins">Category: {object.category_name}</p> */}
//           <p className="text-base font-poppins mb-4"><span className="material-icons mr-2">location_on</span> {getTranslatedLocation()}</p>

//           <div
//             id='object-description'
//             className="desc-wrapper text-base mb-4 font-poppins font-light"
//             dangerouslySetInnerHTML={{ __html: getTranslatedDescription() }}
//           />
//         </div>
//       </div>
//       </div>
//     </div>


//     {/* export pdf */}
//     <div id='export-content' className="hidden break-inside-avoid break-after-page">
        
//         {/* Gambar objek berjajar horizontal */}
//         <div>
//           {imageUrls.length > 0 ? (
//               <div id="image-gallery" className="flex flex-wrap gap-3 mx-5 mb-4">
//                 {imageUrls.map((imageUrl, index) => (
//                   <img
//                     key={index}
//                     src={`${baseURL}${imageUrl}`}
//                     alt={`Image ${index + 1}`}
//                     className="max-w-50 max-h-80"
//                     crossOrigin="anonymous"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No images available.</p>
//             )}

//           </div>

//         {/* Detail Objek */}
//         <div className="object-detail-wrapper mb-4 mx-5">
//           <h1 className="text-2xl font-poppins mb-4">{getTranslatedField('name')}</h1>
//           {/* <p className="text-base font-poppins">Category: {object.category_name}</p> */}

//           <div
//             id='object-description'
//             className="desc-wrapper text-base mb-4 font-poppins font-light"
//             dangerouslySetInnerHTML={{ __html: getTranslatedDescription() }}
//           />
//         </div>

//     </div>


//     {/* footer */}

//     <footer className="bg-[#9F9B6E] text-white p-4">
//     <p className="text-center font-normal mb-3">ROYAL AMBARRUKMO YOGYAKARTA</p>
//     <p className="text-center font-light mb-3">
//       Jalan Laksada Adisucipto No. 81, <br />Yogyakarta 55281 - Indonesia
//     </p>
//     <p className="text-center font-light mb-3">Tel : +62 274 488 488</p>
//     <p className="text-center font-light mb-3">
//       Email : info@royalambarrukmo.com
//     </p>
//     <hr className="border-t-2 border-[#8F8B5E] mb-4" />

//     <div className="flex justify-center space-x-6 mt-4 mb-4">
//       <a href="#" aria-label="Facebook">
//       <Image
//         src="/assets/img/Facebook.png"
//         alt="Facebook"
//         className="h-8 w-8 hover:opacity-80"
//         width={32} // tambahkan properti width
//         height={32} // tambahkan properti height
//       />
//       </a>
//       <a href="#" aria-label="Instagram">
//         <Image
//           src="/assets/img/Instagram.png"
//           alt="Instagram"
//           className="h-8 w-8 hover:opacity-80"
//           width={32} // tambahkan properti width
//           height={32} // tambahkan properti height
//         />
//       </a>
//       <a href="#" aria-label="You Tube">
//         <Image
//           src="/assets/img/Youtube.png"
//           alt="You Tube"
//           className="h-8 w-8 hover:opacity-80"
//           width={32} // tambahkan properti width
//           height={32} // tambahkan properti height
//         />
//       </a>
//     </div>
//     <hr className="border-t-2 border-[#8F8B5E] mb-4" />
//     <p className="text-center font-light size text-sm">
//       © Royal Ambarrukmo Yogyakarta 2024
//     </p>
//     </footer>

//   </div>
//   );
// }













// All working

// // frontend/app/public/object/tryfe/[id]/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import Image from 'next/image';

// export default function DetailObjectPage() {
//   const [object, setObject] = useState(null);
//   const [language, setLanguage] = useState('en'); // Default bahasa Inggris
//   const [isModalOpen, setModalOpen] = useState(false);
//   const { id } = useParams();
//   const router = useRouter();
//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     if (id) {
//       fetchObjectDetail(id);
//     }
//   }, [id]);

//   const fetchObjectDetail = async (objectId) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/public/objects/get-by-id/${objectId}`);
//       const data = response.data;
//       console.log(response.data);

//       // Update state dengan data sesuai bahasa yang dipilih
//       setObject(data);
//     } catch (error) {
//       console.error('Failed to fetch object detail:', error.message);
//     }
//   };

//   // Menampilkan nama, lokasi, dan deskripsi berdasarkan bahasa yang dipilih
//   const getTranslatedField = (field) => {
//     const languageMap = {
//       en: `name_english`,
//       id: `name_indonesian`,
//       zh: `name_chinese_simp`,
//       nl: `name_dutch`,
//       ja: `name_japanese`,
//       ko: `name_korean`,
//       ru: `name_russian`,
//       es: `name_spanish`
//     };
//     return object ? object[languageMap[language] || 'name_english'] : '';
//   };

//   const getTranslatedLocation = () => {
//     const languageMap = {
//       en: 'location_english',
//       id: 'location_indonesian',
//       zh: 'location_chinese_simp',
//       nl: 'location_dutch',
//       ja: 'location_japanese',
//       ko: 'location_korean',
//       ru: 'location_russian',
//       es: 'location_spanish'
//     };
//     return object ? object[languageMap[language] || 'location_english'] : '';
//   };

//   const getTranslatedDescription = () => {
//     const languageMap = {
//       en: 'description_english',
//       id: 'description_indonesian',
//       zh: 'description_chinese_simp',
//       nl: 'description_dutch',
//       ja: 'description_japanese',
//       ko: 'description_korean',
//       ru: 'description_russian',
//       es: 'description_spanish'
//     };
//     return object ? object[languageMap[language] || 'description_english'] : '';
//   };

//   if (!object) return <p>Loading...</p>;

//   // Parse image_url yang berupa string JSON menjadi array
//   const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];


//   // Fungsi untuk scroll gambar ke kiri
//   const scrollLeft = () => {
//     const gallery = document.getElementById('image-gallery');
//     gallery.scrollBy({
//       left: -400, // Scroll 300px ke kiri
//       behavior: 'smooth', // Animasi scroll
//     });
//   };

//   // Fungsi untuk scroll gambar ke kanan
//   const scrollRight = () => {
//     const gallery = document.getElementById('image-gallery');
//     gallery.scrollBy({
//       left: 400, // Scroll 300px ke kanan
//       behavior: 'smooth', // Animasi scroll
//     });
//   };



//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage);
//     setModalOpen(false); // Tutup modal setelah memilih bahasa
//   };

//   const languageMap = {
//     en: 'English',
//     id: 'Bahasa Indonesia',
//     es: 'Español',
//     nl: 'Nederlands',
//     ja: '日本語',
//     ko: '한국어',
//     zh: '中文 (简体)', // Simplified Chinese
//   };

//   const exportToPDF = () => {
//     const element = document.getElementById('export-content'); // Elemen HTML yang mau di-export
    
//     // Tampilkan elemen sebelum export
//     element.style.display = 'block';

//     // Tunggu semua gambar selesai dimuat
//     const images = element.querySelectorAll('img');
//     const imagePromises = Array.from(images).map(
//       (img) =>
//         new Promise((resolve) => {
//           if (img.complete) {
//             resolve();
//           } else {
//             img.onload = resolve;
//             img.onerror = resolve; // Tetap resolve meskipun gagal load
//           }
//         })
//     );

//     Promise.all(imagePromises).then(() => {
//       const pdf = new jsPDF({
//         unit: 'px', // Satuan untuk ukuran
//         format: 'a4', // Format kertas
//       });

//       pdf.html(element, {
//         callback: (doc) => {
//           doc.save(getTranslatedField('name'));

//           // Sembunyikan elemen setelah export selesai
//           element.style.display = 'none';

//         },
//         x: 20, // Margin kiri
//         y: 20, // Margin atas
//         html2canvas: {
//           scale: 2 / window.devicePixelRatio, // Sesuaikan dengan rasio pixel
//           useCORS: true,
//           windowPadding: 20,
//         },
//         autoPaging: true, // Atur agar teks otomatis berpindah halaman
//         margin: [20, 20, 40, 20], // [atas, kanan, bawah, kiri]
//       });
//     });
//   };

//   return (
//     <div className="bg-[#F7EFE8]">
//     <div className="bg-[#F7EFE8] mx-auto">
//       {/* Navbar */}
//       <div className="flex justify-between items-center z-20 top-0 sticky shadow px-5 py-4 border-b bg-white">
//       {/* Logo di kiri */}
//       <div className="text-2xl font-bold">
//         <Image
//           src="/assets/img/ambrlogo.png"
//           alt="Facebook"
//           className="h-12 object-contain"
//           width={100} // tambahkan properti width
//           height={80} // tambahkan properti height
//         />
//       </div>

//       {/* Kontainer tombol di kanan, menggunakan flex untuk tombol berdekatan */}
//       <div className="flex items-center space-x-4">
//         {/* Tombol untuk export PDF */}
//         <button
//           onClick={exportToPDF}
//           className="p-2 hover:text-gray-500 hover:bg-gray-100 text-[#AAA577] rounded-full"
//         >
//           Export to PDF
//         </button>

//         <button
//           onClick={() => setModalOpen(true)}
//           className="p-1 rounded-full hover:bg-gray-100"
//         >
//           <span className="material-icons cursor-pointer hover:text-gray-500 text-[#AAA577]">
//             translate
//           </span>
//         </button>

//       </div>
//     </div>

//     <div>
//       {/* Popup Modal untuk ganti bahasa */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-5 rounded-lg w-full max-w-sm">
//             <h2 className="text-xl font-bold mb-4">Pilih Bahasa</h2>
//             <div className="flex flex-col gap-4">
//               {Object.keys(languageMap).map((lang) => (
//                 <button
//                   key={lang}
//                   onClick={() => handleLanguageChange(lang)}
//                   className={`p-2 border rounded ${
//                     language === lang ? 'bg-[#AAA577] text-white' : 'bg-gray-100'
//                   }`}
//                 >
//                   {languageMap[lang]}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className='w-full'>
//         {/* Gambar objek berjajar horizontal */}
//         <div>
//           {imageUrls.length > 0 ? (
//               <div id="image-gallery" className="flex overflow-x-hidden space-x-4 py-[0px] mb-4">
//                 {imageUrls.map((imageUrl, index) => (
//                   <img
//                     key={index}
//                     src={`${baseURL}${imageUrl}`}
//                     alt={`Image ${index + 1}`}
//                     className="max-w-100 max-h-80"
//                     crossOrigin="anonymous"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No images available.</p>
//             )}

//             {/* Tombol navigasi */}
//             <div className="absolute sm:top-[200px] top-[140px] left-[10px] right-[10px] flex justify-between items-center z-10 py-2">
//               <button
//                 onClick={scrollLeft}
//                 className="material-icons text-white text-4xl"
//               >
//                 arrow_circle_left
//               </button>
//               <button
//                 onClick={scrollRight}
//                 className="material-icons text-white text-4xl"
//               >
//                 arrow_circle_right
//               </button>
//             </div>
//           </div>

//         {/* Detail Objek */}
//         <div className="object-detail-wrapper mb-4 mx-5">
//           <h1 className="text-2xl font-poppins mb-4">{getTranslatedField('name')}</h1>
//           {/* <p className="text-base font-poppins">Category: {object.category_name}</p> */}
//           <p className="text-base font-poppins mb-4"><span className="material-icons mr-2">location_on</span> {getTranslatedLocation()}</p>

//           <div
//             id='object-description'
//             className="desc-wrapper text-base mb-4 font-poppins font-light"
//             dangerouslySetInnerHTML={{ __html: getTranslatedDescription() }}
//           />
//         </div>
//       </div>
//       </div>
//     </div>


//     {/* export pdf */}
//     <div id='export-content' className="hidden break-inside-avoid break-after-page">
        
//         {/* Gambar objek berjajar horizontal */}
//         <div>
//           {imageUrls.length > 0 ? (
//               <div id="image-gallery" className="flex flex-wrap gap-3 mx-5 mb-4">
//                 {imageUrls.map((imageUrl, index) => (
//                   <img
//                     key={index}
//                     src={`${baseURL}${imageUrl}`}
//                     alt={`Image ${index + 1}`}
//                     className="max-w-50 max-h-80"
//                     crossOrigin="anonymous"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No images available.</p>
//             )}

//           </div>

//         {/* Detail Objek */}
//         <div className="object-detail-wrapper mb-4 mx-5">
//           <h1 className="text-2xl font-poppins mb-4">{getTranslatedField('name')}</h1>
//           {/* <p className="text-base font-poppins">Category: {object.category_name}</p> */}

//           <div
//             id='object-description'
//             className="desc-wrapper text-base mb-4 font-poppins font-light"
//             dangerouslySetInnerHTML={{ __html: getTranslatedDescription() }}
//           />
//         </div>

//     </div>


//     {/* footer */}

//     <footer className="bg-[#9F9B6E] text-white p-4">
//     <p className="text-center font-normal mb-3">ROYAL AMBARRUKMO YOGYAKARTA</p>
//     <p className="text-center font-light mb-3">
//       Jalan Laksada Adisucipto No. 81, <br />Yogyakarta 55281 - Indonesia
//     </p>
//     <p className="text-center font-light mb-3">Tel : +62 274 488 488</p>
//     <p className="text-center font-light mb-3">
//       Email : info@royalambarrukmo.com
//     </p>
//     <hr className="border-t-2 border-[#8F8B5E] mb-4" />

//     <div className="flex justify-center space-x-6 mt-4 mb-4">
//       <a href="#" aria-label="Facebook">
//       <Image
//         src="/assets/img/Facebook.png"
//         alt="Facebook"
//         className="h-8 w-8 hover:opacity-80"
//         width={32} // tambahkan properti width
//         height={32} // tambahkan properti height
//       />
//       </a>
//       <a href="#" aria-label="Instagram">
//         <Image
//           src="/assets/img/Instagram.png"
//           alt="Instagram"
//           className="h-8 w-8 hover:opacity-80"
//           width={32} // tambahkan properti width
//           height={32} // tambahkan properti height
//         />
//       </a>
//       <a href="#" aria-label="You Tube">
//         <Image
//           src="/assets/img/Youtube.png"
//           alt="You Tube"
//           className="h-8 w-8 hover:opacity-80"
//           width={32} // tambahkan properti width
//           height={32} // tambahkan properti height
//         />
//       </a>
//     </div>
//     <hr className="border-t-2 border-[#8F8B5E] mb-4" />
//     <p className="text-center font-light size text-sm">
//       © Royal Ambarrukmo Yogyakarta 2024
//     </p>
//     </footer>

//   </div>
//   );
// }


