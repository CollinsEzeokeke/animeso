// import { motion } from "framer-motion";
export default function SecondScrollOverlay() {
  return (
    <section className="relative w-full min-h-[200vh] bg-violet-800 pointer-events-none z-[60] flex flex-col items-center">
      <div className="h-[50vh]" />
      <div className="flex justify-center h-full w-full">
        <div className="relative bg-purple-950 w-5/6">
          <div className="min-h-screen sticky top-5 bg-green-500">
            <div className="h-[50vh] border-white border-8 bg-black"></div>
          </div>
          <div className="min-h-screen sticky top-5 bg-green-500">
            <div className="h-[50vh] border-white border-8 bg-black"></div>
          </div>
          <div className="min-h-screen sticky top-5 bg-green-500">
            <div className="h-[50vh] border-white border-8 bg-black"></div>
          </div>
          <div className="min-h-screen sticky top-5 bg-green-500">
            <div className="h-[50vh] border-white border-8 bg-black"></div>
          </div>
          <div className="min-h-screen sticky top-5 bg-green-500">
            <div className="h-[50vh] border-white border-8 bg-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// {/* First sticky container */}
// <div className="relative bg-green-500">
//   <div className="w-[80%] min-h-screen sticky top-5 bg-blue-500 flex flex-col items-center justify-center">
//     <div className="h-[30vh] w-full p-5">
//       <h2 className="text-white text-2xl font-bold">First Container</h2>
//       <p className="text-white mt-4">
//         This container sticks at the top while others join.
//       </p>
//     </div>
//   </div>

//   {/* Second container that meets the first one */}
//   <motion.div
//     className="w-[80%] min-h-screen sticky top-5 bg-emerald-600 flex flex-col items-center justify-center"
//     initial={{ opacity: 0, y: 50 }}
//     whileInView={{
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, delay: 0.2 },
//     }}
//     viewport={{ once: true }}
//   >
//     <div className="h-[30vh] w-full p-5">
//       <h2 className="text-white text-2xl font-bold">Second Container</h2>
//       <p className="text-white mt-4">
//         This container visibly stacks below the first one.
//       </p>
//     </div>
//   </motion.div>

//   {/* Third container that meets the previous ones */}
//   <motion.div
//     className="w-[80%] min-h-screen sticky top-5 bg-amber-500 flex flex-col items-center justify-center"
//     initial={{ opacity: 0, y: 50 }}
//     whileInView={{
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, delay: 0.2 },
//     }}
//     viewport={{ once: true }}
//   >
//     <div className="h-[30vh] w-full p-5">
//       <h2 className="text-white text-2xl font-bold">Third Container</h2>
//       <p className="text-white mt-4">
//         This container visibly stacks below the second one.
//       </p>
//     </div>
//   </motion.div>
// </div>
