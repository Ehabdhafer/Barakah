import React from "react";
import partner from "../assets/partner.png";

const Partners = () => {
  return (
    <div className="bg-blue h-screen w-full relative ">
      <div className="text-white text-4xl font-semibold text-center pt-20">
        Our Partners
      </div>
      <div className="bg-gray h-[23%] absolute top-40 flex justify-around w-full">
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
        <img src={partner} alt="" className="p-8" />
      </div>
      <div className="text-white text-4xl font-semibold text-center pt-60">
        Testimonial
      </div>
      <div className="absolute top-[70%] w-full h-[60%] flex  ">
        <div className="w-[30%] bg-white h-[35%] mx-10 flex flex-col p-8 text-blue font-medium">
          Username
          <div>Random Dummy Text, I Like your website</div>
        </div>
        <div className="w-[30%] bg-white h-[35%] mx-10 flex flex-col p-8 text-blue font-medium">
          Username
          <div>Random Dummy Text, I Like your website</div>
        </div>
        <div className="w-[30%] bg-white h-[35%] mx-10 flex flex-col p-8 text-blue font-medium">
          Username
          <div>Random Dummy Text, I Like your website</div>
        </div>
      </div>
    </div>
  );
};

export default Partners;

// --------------------------------------------------------------------

// import React, { useState, useEffect } from "react";

// const Partners = () => {
//   const [partnerImages, setPartnerImages] = useState([]);

//   useEffect(() => {
//     const fetchPartnerImages = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/partners");
//         const data = await response.json();
//         console.log(`dd`, data.imageurl);
//         setPartnerImages(data || []); // Provide an empty array as default if data.images is undefined
//       } catch (error) {
//         console.error("Error fetching partner images:", error);
//         setPartnerImages([]); // Set an empty array in case of an error
//       }
//     };

//     fetchPartnerImages();
//   }, []);
//   console.log(`pp`, partnerImages);
//   return (
//     <div className="bg-blue h-screen w-full relative">
//       <div className="text-white text-4xl font-semibold text-center pt-20">
//         Our Partners
//       </div>
//       <div className="bg-gray h-[23%] absolute top-40 flex justify-around w-full">
//         {partnerImages.map((imageurl, index) => (
//           <img
//             key={index}
//             src={partnerImages[0]?.imageurl}
//             alt={`Partner ${index + 1}`}
//             className="p-8"
//           />
//         ))}
//       </div>
//       {/* The rest of your component remains unchanged */}
//     </div>
//   );
// };

// export default Partners;
