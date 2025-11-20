import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-vistaar-black flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-20 h-20 border-4 border-vistaar-gold/30 border-t-vistaar-gold rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          className="text-2xl font-serif font-bold text-vistaar-gold gold-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          VISTAAR
        </motion.h2>
      </div>
    </div>
  )
}

export default LoadingScreen

