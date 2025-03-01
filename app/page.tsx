"use client";
import DirectionAwareScrollComponent from "@/components/Header";
import Hero from "@/components/hero";
import { ScrollLock } from "@/components/scrollLock";
// import { useStore } from "@/hooks/store/store";
// import { motion, useReducedMotion } from "framer-motion";
import { Geiger } from "react-geiger";
// import { useMemo, ReactNode, Suspense } from "react";
import React from "react";

// // Memoized motion component for better performance
// const MotionContent = React.memo(({ isLocked, children, animationSettings }: { isLocked: boolean, children: ReactNode, animationSettings?: { duration: number, stiffness: number, damping: number } }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 100 }}
//     animate={{ 
//       opacity: isLocked ? 1 : 0, 
//       y: isLocked ? 0 : 100,
//       display: isLocked ? 'block' : 'none'
//     }}
//     transition={{
//       opacity: {
//         duration: animationSettings?.duration || 0.8,
//         ease: "easeOut",
//       },
//       y: {
//         type: "spring",
//         stiffness: animationSettings?.stiffness || 500,
//         damping: animationSettings?.damping || 90,
//       },
//       display: {
//         delay: isLocked ? 0 : 0.8 // Delay display:none when hiding
//       }
//     }}
//     style={{
//       willChange: "opacity, transform",
//       pointerEvents: isLocked ? 'auto' : 'none',
//       // Add hardware acceleration
//       transform: isLocked ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)'
//     }}
//     className="relative w-full"
//   >
//     {children}
//   </motion.div>
// ));

// MotionContent.displayName = "MotionContent";

// // Optimize loading of testimonials section which is below the fold
// const TestimonialsSection = React.memo(() => (
//   <section className="min-h-[100vh] bg-gray-900 text-white relative z-[1000]">
//     <div className="container mx-auto py-24 px-6">
//       <div className="max-w-4xl mx-auto text-center mb-16">
//         <h2 className="text-5xl font-bold mb-6">
//           Join Thousands of Satisfied Users
//         </h2>
//         <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//           Our platform is trusted by professionals across industries to
//           manage their work and life more effectively. See what users
//           are saying about their experience.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {/* Testimonial cards */}
//         {[
//           {
//             initials: "JD",
//             name: "Jane Doe",
//             role: "Product Designer",
//             bgColor: "blue",
//             quote: "This tool has completely transformed how I organize my day. The seamless integration between todos and calendar is exactly what I've been looking for."
//           },
//           {
//             initials: "JS",
//             name: "John Smith",
//             role: "Software Developer",
//             bgColor: "green",
//             quote: "The email integration is stellar. I love how it automatically suggests tasks based on my communications and keeps everything in one place."
//           },
//           {
//             initials: "AR",
//             name: "Alex Rodriguez",
//             role: "Marketing Director",
//             bgColor: "purple",
//             quote: "Since adopting this platform, my team's productivity has increased by 35%. The collaboration features are unmatched in any other tool we've tried."
//           }
//         ].map((testimonial, i) => (
//           <div key={i} className="bg-gray-800 p-8 rounded-xl">
//             <div className="flex items-center mb-4">
//               <div className={`w-12 h-12 bg-${testimonial.bgColor}-600 rounded-full flex items-center justify-center text-xl font-bold`}>
//                 {testimonial.initials}
//               </div>
//               <div className="ml-4">
//                 <h3 className="font-semibold text-lg">{testimonial.name}</h3>
//                 <p className="text-gray-400 text-sm">{testimonial.role}</p>
//               </div>
//             </div>
//             <p className="text-gray-300">&quot;{testimonial.quote}&quot;</p>
//             <div className="mt-4 flex text-yellow-400">
//               {/* Instead of 5 separate SVGs, we can use a repeated component */}
//               {[...Array(5)].map((_, i) => (
//                 <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                 </svg>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-16 text-center">
//         <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg">
//           Get Started Today
//         </button>
//         <p className="text-gray-400 mt-4">
//           No credit card required. Free 14-day trial.
//         </p>
//       </div>
//     </div>
//   </section>
// ));

// TestimonialsSection.displayName = "TestimonialsSection";

export default function Page() {
  // const { isLocked } = useStore();
//   const prefersReducedMotion = useReducedMotion();
  
//   // Adapt animations if user prefers reduced motion
//   const animationSettings = useMemo(() => (
//     prefersReducedMotion 
//       ? { duration: 0.3, stiffness: 200, damping: 40 }
//       : { duration: 0.8, stiffness: 500, damping: 90 }
//   ), [prefersReducedMotion]);
  
//   // Memoize the content that appears after scrolling
//   const postScrollContent = useMemo(() => {
//     if (!isLocked) return null; // Don't even render if not locked
    
//     return (
//       <MotionContent 
//         isLocked={isLocked}
//         animationSettings={animationSettings}
//       >
//         {/* First section that will appear on top */}
//         <section className="min-h-[100vh] bg-white relative z-[1000] mt-[-100vh]">
//           <div className="container mx-auto py-24 px-6">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Streamline Your Workflow
//               </h2>
//               <p className="text-xl text-gray-700 mb-8 leading-relaxed">
//                 Experience a revolutionary approach to productivity that
//                 combines task management, communications, and scheduling into
//                 one seamless interface. Our platform eliminates
//                 context-switching, helping you stay focused on what matters
//                 most.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//                 {/* Feature cards */}
//                 {[
//                   {
//                     icon: (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 text-blue-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                         />
//                       </svg>
//                     ),
//                     color: "blue",
//                     title: "Smart Task Management",
//                     description: "Organize projects with AI-powered priority suggestions and automatic scheduling."
//                   },
//                   {
//                     icon: (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 text-purple-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                     ),
//                     color: "purple",
//                     title: "Unified Calendar",
//                     description: "View and manage all your commitments in one place with intuitive scheduling tools."
//                   },
//                   {
//                     icon: (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 text-green-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                         />
//                       </svg>
//                     ),
//                     color: "green",
//                     title: "Intelligent Inbox",
//                     description: "Prioritize communications with smart filtering and automated response suggestions."
//                   }
//                 ].map((feature, i) => (
//                   <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                     <div className={`w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4`}>
//                       {feature.icon}
//                     </div>
//                     <h3 className="text-xl font-semibold mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-600">
//                       {feature.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-12 text-center">
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg">
//                   Start Your Journey
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Second section */}
//         <section className="min-h-[100vh] bg-gradient-to-b from-gray-50 to-gray-100 relative z-[1000]">
//           <div className="container mx-auto py-24 px-6">
//             {/* Content for second section */}
//             <div className="max-w-5xl mx-auto">
//               <div className="flex flex-col md:flex-row items-center gap-12">
//                 <div className="md:w-1/2">
//                   <h2 className="text-4xl font-bold mb-6 text-gray-800">
//                     Designed for Deep Work
//                   </h2>
//                   <p className="text-lg text-gray-700 mb-6 leading-relaxed">
//                     Our interface is meticulously crafted to eliminate
//                     distractions and promote focused work. The clean,
//                     intuitive design helps you maintain flow state and
//                     accomplish more in less time.
//                   </p>

//                   <ul className="space-y-4 mb-8">
//                     {["Distraction-free writing environment with focus mode", 
//                       "Time-blocking tools to schedule dedicated work sessions",
//                       "Progress tracking that motivates without overwhelming"
//                     ].map((feature, i) => (
//                       <li key={i} className="flex items-start">
//                         <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
//                           <svg
//                             className="w-4 h-4 text-blue-600"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M5 13l4 4L19 7"
//                             ></path>
//                           </svg>
//                         </div>
//                         <p className="ml-3 text-gray-700">{feature}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="md:w-1/2">
//                   <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//                     <div className="bg-gray-800 py-2 px-4">
//                       <div className="flex space-x-2">
//                         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                         <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
//                         <p className="text-gray-500 text-sm">
//                           Interface preview image
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <Suspense fallback={<div className="min-h-[100vh]" />}>
//           <TestimonialsSection />
//         </Suspense>
//       </MotionContent>
//     );
//   }, [isLocked, animationSettings]);
// console.log(postScrollContent)
  return (
    <Geiger 
      renderTimeThreshold={1.0} // Increased from 0.5 to 1.0 to reduce noise
      enabled={process.env.NODE_ENV === 'development'}
    >
      <main className="relative w-full overscroll-none">
        <DirectionAwareScrollComponent />

        <div className="w-full bg-[#BFBFBF]">
          <ScrollLock />
          <Hero />
          <section className="relative z-0 bg-none min-h-[100vh]"></section>
        </div>
        
        {/* Post-scroll content */}
        {/* {postScrollContent} */}
      </main>
    </Geiger>
  );
}
