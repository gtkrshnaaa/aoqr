// frontend/app/admin/objects/page.jsx

'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";

const ObjectsListPage = () => {
  const [objects, setObjects] = useState([]);
  const baseURL = 'http://localhost:9977';

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/objects/get-all`);
        setObjects(response.data);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    };

    fetchObjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/objects/delete/${id}`);
      const response = await axios.get(`${baseURL}/api/objects/get-all`);
      setObjects(response.data);
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/admin/objects/edit/${id}`;
  };

  const handleView = (id) => {
    window.location.href = `/admin/objects/${id}`;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-5">
        <button
          onClick={() => {
            window.location.href = '/admin/objects/create';
          }}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Add Object
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {objects.map((object) => {
            const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];
            const firstImageUrl = imageUrls[0];

            return (
              <div key={object.id} className="border p-4 rounded-lg shadow-md">
                {firstImageUrl && (
                  <img
                    src={`${baseURL}${firstImageUrl}`}
                    alt={`Image 1`}
                    className="w-full h-40 object-cover mt-2 rounded"
                  />
                )}
                <p className="text-lg pt-4"># {object.id}</p>
                <h3 className="text-lg font-semibold ">{object.name_english}</h3>
                <div className="mt-2">
                  <button
                    onClick={() => handleView(object.id)}
                    className="bg-gray-200 text-green-500 px-4 py-2 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(object.id)}
                    className="bg-gray-200 text-blue-500 px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(object.id)}
                    className="bg-gray-200 text-red-500 px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ObjectsListPage;










// // frontend/app/admin/objects/page.jsx

// 'use client'
// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Sidebar from "../components/sidebar";

// const ObjectsPage = () => {
//   const [objects, setObjects] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     category_id: '',
//     description: '',
//     images: null,
//   });
//   const [editObject, setEditObject] = useState(null);

//   const descriptionRef = useRef(null);  // Reference for description element

//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     const fetchObjects = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/objects/get-all`);
//         setObjects(response.data);
//       } catch (error) {
//         console.error('Error fetching objects:', error);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/categories/get-all`);
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchObjects();
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     if (descriptionRef.current && formData.description) {
//       descriptionRef.current.innerHTML = formData.description;
//       moveCursorToEnd(descriptionRef.current); // Memindahkan kursor ke akhir teks
//     }
//   }, [formData.description]);

//   const handleFileChange = (e, index) => {
//     const file = e.target.files[0];
//     const updatedImages = [...(formData.images || [])];
//     updatedImages[index] = file;
//     setFormData({
//       ...formData,
//       images: updatedImages,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('name', formData.name);
//     form.append('location', formData.location);
//     form.append('category_id', formData.category_id);
//     form.append('description', formData.description);

//     if (formData.images) {
//       formData.images.forEach((image) => {
//         if (image) {
//           form.append('images', image);
//         }
//       });
//     }

//     try {
//       if (editObject) {
//         await axios.put(`${baseURL}/api/objects/update/${editObject.id}`, form, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setEditObject(null);
//       } else {
//         await axios.post(`${baseURL}/api/objects/create`, form, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       }
//       setShowModal(false);
//       setFormData({ name: '', location: '', category_id: '', description: '', images: null });
//       const response = await axios.get(`${baseURL}/api/objects/get-all`);
//       setObjects(response.data);
//     } catch (error) {
//       console.error('Error creating or updating object:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${baseURL}/api/objects/delete/${id}`);
//       const response = await axios.get(`${baseURL}/api/objects/get-all`);
//       setObjects(response.data);
//     } catch (error) {
//       console.error('Error deleting object:', error);
//     }
//   };

//   const handleEdit = (object) => {
//     setEditObject(object);
//     setFormData({
//       name: object.name,
//       location: object.location,
//       category_id: object.category_id,
//       description: object.description,
//       images: null,
//     });
//     setShowModal(true);
//   };

//   const handleView = (id) => {
//     window.location.href = `/admin/objects/${id}`;
//   };

//   const handleTextAreaChange = () => {
//     if (descriptionRef.current) {
//       setFormData({
//         ...formData,
//         description: descriptionRef.current.innerHTML,  // Update description with innerHTML
//       });
//     }
//   };

//   const handleBold = () => {
//     document.execCommand('bold');
//     handleTextAreaChange();
//   };

//   const handleItalic = () => {
//     document.execCommand('italic');
//     handleTextAreaChange();
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//     setEditObject(null);
//     setFormData({
//       name: '',
//       location: '',
//       category_id: '',
//       description: '',
//       images: null,
//     });
//   };

//   const moveCursorToEnd = (element) => {
//     if (element && document.createRange && window.getSelection) {
//       const range = document.createRange();
//       range.selectNodeContents(element);
//       range.collapse(false);
//       const selection = window.getSelection();
//       selection.removeAllRanges();
//       selection.addRange(range);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="m-5">
//         <button
//           onClick={() => {
//             setShowModal(true);
//             setEditObject(null);
//           }}
//           className="bg-blue-500 text-white p-2 rounded mb-4"
//         >
//           Add Object
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {objects.map((object) => {
//             const imageUrls = object.image_url ? JSON.parse(object.image_url) : [];
//             const firstImageUrl = imageUrls[0];

//             return (
//               <div key={object.id} className="border p-4 rounded-lg shadow-md">
//                 {firstImageUrl && (
//                   <img
//                     src={`${baseURL}${firstImageUrl}`}
//                     alt={`Image 1`}
//                     className="w-full h-40 object-cover mt-2 rounded"
//                   />
//                 )}
//                 <h3 className="text-lg font-semibold pt-4">{object.name}</h3>
//                 <div className="mt-2">
//                   <button
//                     onClick={() => handleView(object.id)}
//                     className="bg-gray-200 text-green-500 px-4 py-2 rounded mr-2"
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={() => handleEdit(object)}
//                     className="bg-gray-200 text-blue-500 px-4 py-2 rounded mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(object.id)}
//                     className="bg-gray-200 text-red-500 px-4 py-2 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {showModal && (
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white rounded-lg max-h-[90vh] overflow-hidden w-[70%] max-w-[1200px]">
//               <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
//                 <h2 className="text-xl font-semibold">
//                   {editObject ? 'Edit Object' : 'Add New Object'}
//                 </h2>
//                 <div className="flex space-x-2">
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="bg-gray-500 text-white px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     form="modalForm"
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     {editObject ? 'Update' : 'Add'}
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 max-h-[80vh] overflow-y-auto">
//                 <form id="modalForm" onSubmit={handleSubmit}>
//                   <div className="flex mb-6 space-x-2">
//                     {[...Array(5)].map((_, index) => (
//                       <div key={index} className="relative w-20 h-20 border-dashed border-2 border-gray-400 rounded-md overflow-hidden">
//                         <input
//                           type="file"
//                           onChange={(e) => handleFileChange(e, index)}
//                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                         />
//                         {formData.images?.[index] ? (
//                           <img
//                             src={URL.createObjectURL(formData.images[index])}
//                             alt={`Preview ${index + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center w-full h-full bg-gray-200">
//                             <span className="text-sm text-gray-500">Select</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mb-4">
//                     <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
//                       Category
//                     </label>
//                     <select
//                       name="category_id"
//                       id="category_id"
//                       value={formData.category_id}
//                       onChange={handleChange}
//                       className="mt-2 p-2 w-full border rounded"
//                       required
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="mt-2 p-2 w-full border rounded"
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//                       Location
//                     </label>
//                     <input
//                       type="text"
//                       id="location"
//                       name="location"
//                       value={formData.location}
//                       onChange={handleChange}
//                       className="mt-2 p-2 w-full border rounded"
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                        Description
//                      </label>
//                      <div className="mb-2">
//                        <button
//                         type="button"
//                         onClick={handleBold}
//                         className="bg-gray-200 p-2 rounded mx-1"
//                       >
//                         B
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleItalic}
//                         className="bg-gray-200 p-2 rounded mx-1"
//                       >
//                         I
//                       </button>
//                     </div>
//                     <div
//                       contentEditable
//                       ref={descriptionRef}
//                       className="mt-2 p-2 w-full border rounded min-h-[150px]"
//                       onInput={handleTextAreaChange}
//                       defaultValue={formData.description}
//                     />
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ObjectsPage;



