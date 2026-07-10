import { useEffect, useState } from 'react'
import { useProjectStore } from './store/projectStore'
import { ToastContainer } from './components/ui/Toast'
import { EditorPanel } from './components/editor/EditorPanel'
import { PreviewPanel } from './components/preview/PreviewPanel'
import { ThemePanel } from './components/theme/ThemePanel'

function App() {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor')
  const [showSettings, setShowSettings] = useState(false)
  const { createProject, getCurrentProject, isDarkMode } = useProjectStore()

  useEffect(() => {
    const state = useProjectStore.getState()
    if (!state.currentProjectId || state.projects.length === 0) {
      createProject('صفحه من')
    }
  }, [createProject])

  const project = getCurrentProject()

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm md:hidden">
        <h1 className="text-sm font-bold text-gray-800 dark:text-white">maddyBio 🌸</h1>
        <div className="flex gap-1">
          <button onClick={() => setMobileTab('editor')} className={`px-3 py-1.5 rounded-lg text-xs ${mobileTab === 'editor' ? 'bg-pink-pastel text-white' : 'text-gray-500'}`}>بلوک‌ها</button>
          <button onClick={() => setMobileTab('preview')} className={`px-3 py-1.5 rounded-lg text-xs ${mobileTab === 'preview' ? 'bg-pink-pastel text-white' : 'text-gray-500'}`}>پیش‌نمایش</button>
          <button onClick={() => setShowSettings(!showSettings)} className="px-3 py-1.5 rounded-lg text-xs hover:bg-gray-100">⚙️</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className={`w-full md:w-72 lg:w-80 overflow-y-auto border-l border-gray-200 dark:border-white/10 bg-white/30 dark:bg-dark-bg/50 ${mobileTab === 'editor' ? 'block' : 'hidden'} md:block`}>
          {showSettings ? <ThemePanel /> : <EditorPanel />}
        </div>

        <div className={`flex-1 overflow-hidden ${mobileTab === 'preview' ? 'block' : 'hidden'} md:block`}>
          {project ? <PreviewPanel /> : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <button onClick={() => createProject('صفحه جدید')} className="px-6 py-3 rounded-2xl bg-pink-pastel text-white font-bold">✨ ساخت صفحه جدید</button>
            </div>
          )}
        </div>

        <div className="hidden lg:block w-80 overflow-y-auto border-r border-gray-200 dark:border-white/10 bg-white/30 dark:bg-dark-bg/50">
          {showSettings ? <EditorPanel /> : <ThemePanel />}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={() => setShowSettings(!showSettings)} className="hidden md:block px-4 py-2 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            {showSettings ? '✏️ بلوک‌ها' : '🎨 تم'}
          </button>
        </div>
        <DownloadButton />
      </div>
      <ToastContainer />
    </div>
  )
}

function DownloadButton() {
  const { getCurrentProject, addToast } = useProjectStore()
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    const project = getCurrentProject()
    if (!project) return
    setLoading(true)

    try {
      const { generateHtml } = await import('./exporters/htmlExporter')
      const html = generateHtml(project.blocks, project.theme, project.name)
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'index.html'; a.click()
      URL.revokeObjectURL(url)
      addToast('فایل با موفقیت ساخته شد! 🎉', 'success')

      const confetti = (await import('canvas-confetti')).default
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#FDA4AF', '#C4B5FD', '#FED7AA'] })
    } catch { addToast('خطا در ساخت فایل', 'error') }
    setLoading(false)
  }

  return (
    <button onClick={handleDownload} disabled={loading}
      className="px-6 py-2 rounded-xl bg-gradient-to-l from-pink-pastel to-purple-pastel text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
      {loading ? '⏳...' : '🚀 دانلود HTML'}
    </button>
  )
}

export default App
