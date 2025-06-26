"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2Icon, ZapIcon } from "lucide-react"

interface LoadingScreenProps {
  message?: string
}



// import Spline from '@splinetool/react-spline/next';

// export default function Home() {
//   return (
//     <main>
//       <Spline
//         scene="https://prod.spline.design/TKihsI947EWccyDP/scene.splinecode" 
//       />
//     </main>
//   );
// }


export default function LoadingScreen({ message = "Loading…" }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6",
          "bg-background/80 backdrop-blur-sm",
        )}
        role="status"
        aria-live="polite"
      >
        {/* Animated logo */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
          className="text-primary"
        >
          <ZapIcon size={48} className="animate-pulse" />
        </motion.div>

        {/* Spinner */}
        <Loader2Icon size={32} className="animate-spin text-muted-foreground" />

        {/* Message */}
        <p className="text-lg font-medium text-center text-foreground">{message}</p>
      </motion.div>
    </AnimatePresence>
  )
}
