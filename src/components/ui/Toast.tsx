import { motion, AnimatePresence } from 'framer-motion'
import { useProjectStore } from '../../store/projectStore'

const styles: Record<string, string> = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  info: 'bg-purple-pastel/50 text-purple-900 border-purple-pastel',
}
const icons: Record<string, string> = {
  success: '✅', error: '❌', info: '💡',
}

export function ToastContainer() {
  const toasts = useProjectStore(s => s.toasts)
  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`px-5 py-3 rounded-2xl border shadow-lg backdrop-blur-sm flex items-center gap-2 min-w-[200px] ${styles[t.type]}`}>
            <span>{icons[t.type]}</span>
            <span className="text-sm">{t.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
