// export default function SecondScrollOverlay() {
//   return (
//     <section className="relative w-full min-h-[220vh] bg-violet-800 pointer-events-none z-[60] flex items-center justify-center">
//       {/* <div className=""/> */}
//       <div className="min-h-screen w-[80%] sticky top-0 bg-blue-500 flex items-center justify-center">
//        <div className="h-[30vh]">
//        adhfjaidfhasdbfasdjv
//        jidnvpwdigjwvsudfh9wupbesuhwjsdahsdfjvasidfvjwasdyvb9ub
//        </div>
//        <div className="bg-black h-[50vh]"/>
//       </div>
//     </section>





// afaksdfk;asdkfa

     {/* Fixed blue container at top */}
  //    <div className="absolute min-h-screen w-1/2 top-0 bg-blue-500">
  //    <div className="sticky top-5 h-[35vh] bg-green-500 w-[80%]">
       
  //    <div className="h-[50%] pt-20">
  //      adhfjaidfhasdbfasdjv
  //      jidnvpwdigjwvsudfh9wupbesuhwjsdahsdfjvasidfvjwasdyvb9ub
  //    </div>
  //  </div>

  //  {/* Black container that scrolls up into blue area */}
  //  <div className="w-[80%] h-[50%] bg-black relative -top-[40vh] mt-[100vh] mx-auto" />
  //    </div>



// a;dshfkaj;dsfjasdlkfjsdajf



//   );
// }

// import { motion } from "framer-motion";

// // export default function SecondScrollOverlay() {
// //   return (
// //     <section className="relative w-full min-h-[200vh] bg-violet-800 pointer-events-none z-[60]">
// //       <div className="h-[10vh]"/>
// //       <div className="min-h-screen w-[80%] sticky top-5 bg-blue-500">
// //         {/* Content container with scroll-linked animation */}
// //         <div className="h-[30vh] pt-20">
// //           adhfjaidfhasdbfasdjv
// //           jidnvpwdigjwvsudfh9wupbesuhwjsdahsdfjvasidfvjwasdyvb9ub
// //         </div>
// //         <div className="bg-black h-[50vh]" />
// //       </div>

// //       {/* Add second sticky block for 2x scroll effect */}
// //       <div className="min-h-screen w-[80%] sticky top-0 bg-blue-500 mt-[100vh]">
// //         <div className="h-[30vh] pt-20">
// //           Second sticky section Scroll continues...
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// export default function SecondScrollOverlay() {
//   return (
//     <section className="relative w-full min-h-[200vh] bg-violet-800 pointer-events-none z-[60]">
//       {/* Blue container with sticky behavior */}
//       <div className="min-h-screen w-[80%] sticky top-5 bg-blue-500">
//         <div className="h-[30vh] pt-20">
//           adhfjaidfhasdbfasdjv
//           jidnvpwdigjwvsudfh9wupbesuhwjsdahsdfjvasidfvjwasdyvb9ub
//         </div>
//       </div>

//       {/* Animated black container */}
//       <motion.div
//         className="w-[80%] h-[50vh] bg-black sticky top-[80vh] mx-auto"
//         initial={{
//           opacity: 0,
//           y: 100,
//           scale: 0.8,
//           rotateX: 45
//         }}
//         whileInView={{
//           opacity: 1,
//           y: -50,
//           scale: 1,
//           rotateX: 0,
//           transition: {
//             duration: 0.8,
//             type: "spring",
//             bounce: 0.4
//           }
//         }}
//         viewport={{ margin: "-30% 0%", once: true }}
//       />
//     </section>
//   );
// }
import { motion } from "framer-motion";
export default function SecondScrollOverlay() {
  return (
    <section className="relative w-full min-h-[300vh] bg-violet-800 pointer-events-none z-[60] flex flex-col">
      {/* First sticky container */}
      <div className="w-[80%] min-h-[50vh] sticky top-5 bg-blue-500 z-10 flex flex-col items-center justify-center">
        <div className="h-[30vh] w-full p-5">
          <h2 className="text-white text-2xl font-bold">First Container</h2>
          <p className="text-white mt-4">
            This container sticks to the top-5 position as you scroll down.
          </p>
        </div>
      </div>

      {/* Second container that meets the first one */}
      <motion.div 
        className="w-[80%] min-h-[50vh] bg-emerald-600 sticky top-5 z-20 mt-[100vh] flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, delay: 0.2 }
        }}
        viewport={{ once: true }}
      >
        <div className="h-[30vh] w-full p-5">
          <h2 className="text-white text-2xl font-bold">Second Container</h2>
          <p className="text-white mt-4">
            This container meets the first one at the top-5 position.
          </p>
        </div>
      </motion.div>

      {/* Third container that meets the previous ones */}
      <motion.div 
        className="w-[80%] min-h-[50vh] bg-amber-500 sticky top-5 z-30 mt-[100vh] flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, delay: 0.2 }
        }}
        viewport={{ once: true }}
      >
        <div className="h-[30vh] w-full p-5">
          <h2 className="text-white text-2xl font-bold">Third Container</h2>
          <p className="text-white mt-4">
            This container meets the previous ones at the top-5 position.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
