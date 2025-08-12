// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { ArrowUp } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// export function ScrollToTop() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.scrollY > 500) {
//         setIsVisible(true)
//       } else {
//         setIsVisible(false)
//       }
//     }

//     window.addEventListener("scroll", toggleVisibility)
//     return () => window.removeEventListener("scroll", toggleVisibility)
//   }, [])

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     })
//   }

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           className="fixed bottom-8 right-8 z-50"
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Button
//             onClick={scrollToTop}
//             size="icon"
//             className="h-10 w-10 rounded-full shadow-lg"
//             aria-label="Scroll to top"
//           >
//             <ArrowUp className="h-5 w-5" />
//           </Button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }
