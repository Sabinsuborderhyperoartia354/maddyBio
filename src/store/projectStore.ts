import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Block, BlockType, Project, ThemeConfig, ToastMessage } from '../types'
import { generateId } from '../lib/utils'
import { palettes } from '../themes/palettes'

// Clear old-format localStorage before persist hydrates
try {
  const raw = localStorage.getItem('maddybio-storage')
  if (raw) {
    const parsed = JSON.parse(raw)
    const s = parsed?.state || parsed
    if (s?.projects?.[0]?.theme && !s.projects[0].theme.colors) {
      localStorage.removeItem('maddybio-storage')
    }
  }
} catch { localStorage.removeItem('maddybio-storage') }

interface UndoEntry {
  blocks: Block[]
  theme: ThemeConfig
}

interface ProjectState {
  projects: Project[]
  currentProjectId: string | null
  toasts: ToastMessage[]
  isDarkMode: boolean
  undoStack: UndoEntry[]
  redoStack: UndoEntry[]

  createProject: (name?: string) => string
  deleteProject: (id: string) => void
  switchProject: (id: string) => void
  renameProject: (id: string, name: string) => void
  getCurrentProject: () => Project | null

  addBlock: (type: BlockType) => void
  removeBlock: (id: string) => void
  duplicateBlock: (id: string) => void
  toggleBlock: (id: string) => void
  updateBlock: (id: string, data: Partial<Block>) => void
  reorderBlocks: (fromIndex: number, toIndex: number) => void

  updateTheme: (data: Partial<ThemeConfig>) => void
  applyPalette: (paletteId: string) => void

  exportProject: () => string
  importProject: (json: string) => boolean

  undo: () => void
  redo: () => void

  addToast: (text: string, type?: ToastMessage['type']) => void
  removeToast: (id: string) => void
  toggleDarkMode: () => void
}

const DEFAULT_THEME: ThemeConfig = palettes[0].config

function getDefaultTheme(): ThemeConfig {
  return JSON.parse(JSON.stringify(DEFAULT_THEME))
}

function createDefaultBlocks(): Block[] {
  return [
    {
      id: generateId(),
      type: 'profile',
      enabled: true,
      avatar: '',
      avatarShape: 'circle',
      name: '',
      title: '',
      bio: '',
      showBadge: false,
    },
  ]
}

function now(): string {
  return new Date().toLocaleDateString('fa-IR')
}

function createDefaultProject(name?: string): Project {
  return {
    id: generateId(),
    name: name || 'صفحه جدید',
    lastModified: now(),
    theme: getDefaultTheme(),
    blocks: createDefaultBlocks(),
  }
}

function pushUndo(state: ProjectState): Partial<ProjectState> {
  const project = state.getCurrentProject()
  if (!project) return {}
  const entry: UndoEntry = {
    blocks: JSON.parse(JSON.stringify(project.blocks)),
    theme: JSON.parse(JSON.stringify(project.theme)),
  }
  return {
    undoStack: [...state.undoStack, entry].slice(-30),
    redoStack: [],
  }
}

function buildBlock(type: BlockType): Block {
  const base = { id: generateId(), type, enabled: true }

  switch (type) {
    case 'profile':
      return { ...base, type: 'profile', avatar: '', avatarShape: 'circle', name: '', title: '', bio: '', showBadge: false }
    case 'link':
      return { ...base, type: 'link', title: 'لینک من', url: 'https://', icon: '🔗', badge: '', highlight: false, newTab: false, style: 'fill' }
    case 'social':
      return { ...base, type: 'social', platforms: {} }
    case 'card':
      return { ...base, type: 'card', cardNumber: '', shaba: '', accountHolder: '', bankName: '' }
    case 'text':
      return { ...base, type: 'text', content: '', variant: 'body', fontSize: 'md', alignment: 'right' }
    case 'divider':
      return { ...base, type: 'divider', style: 'line', emoji: '🌸' }
    case 'video':
      return { ...base, type: 'video', platform: 'aparat', url: '' }
    case 'contact':
      return { ...base, type: 'contact', phone: '', whatsapp: '', whatsappText: '', telegram: '' }
    case 'email':
      return { ...base, type: 'email', email: '', subject: '' }
    case 'product':
      return { ...base, type: 'product', items: [], layout: 'single' }
    case 'hours':
      return {
        ...base, type: 'hours',
        schedule: Array.from({ length: 7 }, (_, i) => ({
          day: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'][i],
          open: '09:00',
          close: '18:00',
          isOff: i === 6,
        })),
      }
    case 'map':
      return { ...base, type: 'map', address: '', lat: 35.6892, lng: 51.3890 }
    case 'faq':
      return { ...base, type: 'faq', items: [] }
    case 'testimonial':
      return { ...base, type: 'testimonial', items: [] }
    case 'vcard':
      return { ...base, type: 'vcard', fullName: '', phone: '', email: '', org: '', title: '', address: '' }
    case 'gallery':
      return { ...base, type: 'gallery', images: [], columns: 3 }
  }
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      toasts: [],
      isDarkMode: false,
      undoStack: [],
      redoStack: [],

      createProject: (name?: string) => {
        const project = createDefaultProject(name)
        set(s => ({
          projects: [...s.projects, project],
          currentProjectId: project.id,
          undoStack: [],
          redoStack: [],
        }))
        return project.id
      },

      deleteProject: (id: string) => {
        set(s => {
          const projects = s.projects.filter(p => p.id !== id)
          const currentProjectId = s.currentProjectId === id
            ? (projects[0]?.id || null)
            : s.currentProjectId
          return { projects, currentProjectId, undoStack: [], redoStack: [] }
        })
      },

      switchProject: (id: string) => {
        set({ currentProjectId: id, undoStack: [], redoStack: [] })
      },

      renameProject: (id: string, name: string) => {
        set(s => ({
          projects: s.projects.map(p =>
            p.id === id ? { ...p, name, lastModified: now() } : p
          ),
        }))
      },

      getCurrentProject: () => {
        const s = get()
        return s.projects.find(p => p.id === s.currentProjectId) || null
      },

      addBlock: (type: BlockType) => {
        const block = buildBlock(type)
        set(s => {
          const undo = pushUndo(s)
          return {
            projects: s.projects.map(p =>
              p.id === s.currentProjectId
                ? { ...p, blocks: [...p.blocks, block], lastModified: now() }
                : p
            ),
            ...undo,
          }
        })
      },

      removeBlock: (id: string) => {
        set(s => {
          const undo = pushUndo(s)
          return {
            projects: s.projects.map(p =>
              p.id === s.currentProjectId
                ? { ...p, blocks: p.blocks.filter(b => b.id !== id), lastModified: now() }
                : p
            ),
            ...undo,
          }
        })
      },

      duplicateBlock: (id: string) => {
        set(s => {
          const undo = pushUndo(s)
          return {
            projects: s.projects.map(p => {
              if (p.id !== s.currentProjectId) return p
              const idx = p.blocks.findIndex(b => b.id === id)
              if (idx === -1) return p
              const dup = JSON.parse(JSON.stringify(p.blocks[idx])) as Block
              dup.id = generateId()
              const blocks = [...p.blocks]
              blocks.splice(idx + 1, 0, dup)
              return { ...p, blocks, lastModified: now() }
            }),
            ...undo,
          }
        })
      },

      toggleBlock: (id: string) => {
        set(s => ({
          projects: s.projects.map(p =>
            p.id === s.currentProjectId
              ? { ...p, blocks: p.blocks.map(b => b.id === id ? { ...b, enabled: !b.enabled } as Block : b), lastModified: now() }
              : p
          ),
        }))
      },

      updateBlock: (id: string, data: Partial<Block>) => {
        set(s => ({
          projects: s.projects.map(p =>
            p.id === s.currentProjectId
              ? { ...p, blocks: p.blocks.map(b => b.id === id ? { ...b, ...data } as Block : b), lastModified: now() }
              : p
          ),
        }))
      },

      reorderBlocks: (fromIndex: number, toIndex: number) => {
        set(s => {
          const undo = pushUndo(s)
          return {
            projects: s.projects.map(p => {
              if (p.id !== s.currentProjectId) return p
              const blocks = [...p.blocks]
              const [moved] = blocks.splice(fromIndex, 1)
              blocks.splice(toIndex, 0, moved)
              return { ...p, blocks, lastModified: now() }
            }),
            ...undo,
          }
        })
      },

      updateTheme: (data: Partial<ThemeConfig>) => {
        set(s => ({
          projects: s.projects.map(p =>
            p.id === s.currentProjectId
              ? { ...p, theme: { ...p.theme, ...data }, lastModified: now() }
              : p
          ),
        }))
      },

      applyPalette: (paletteId: string) => {
        const palette = palettes.find(p => p.id === paletteId)
        if (!palette) return
        set(s => ({
          projects: s.projects.map(p =>
            p.id === s.currentProjectId
              ? { ...p, theme: JSON.parse(JSON.stringify(palette.config)), lastModified: now() }
              : p
          ),
        }))
      },

      exportProject: () => {
        const project = get().getCurrentProject()
        return JSON.stringify(project, null, 2)
      },

      importProject: (json: string) => {
        try {
          const data = JSON.parse(json) as Project
          if (!data.blocks || !data.theme) return false
          data.id = generateId()
          data.lastModified = now()
          set(s => ({
            projects: [...s.projects, data],
            currentProjectId: data.id,
            undoStack: [],
            redoStack: [],
          }))
          return true
        } catch {
          return false
        }
      },

      undo: () => {
        const state = get()
        if (state.undoStack.length === 0) return
        const project = state.getCurrentProject()
        if (!project) return
        const current: UndoEntry = {
          blocks: JSON.parse(JSON.stringify(project.blocks)),
          theme: JSON.parse(JSON.stringify(project.theme)),
        }
        const prev = state.undoStack[state.undoStack.length - 1]
        set(s => ({
          undoStack: state.undoStack.slice(0, -1),
          redoStack: [...state.redoStack, current],
          projects: s.projects.map(p =>
            p.id === s.currentProjectId
              ? { ...p, blocks: prev.blocks, theme: prev.theme }
              : p
          ),
        }))
      },

      redo: () => {
        const state = get()
        if (state.redoStack.length === 0) return
        const project = state.getCurrentProject()
        if (!project) return
        const current: UndoEntry = {
          blocks: JSON.parse(JSON.stringify(project.blocks)),
          theme: JSON.parse(JSON.stringify(project.theme)),
        }
        const next = state.redoStack[state.redoStack.length - 1]
        set(s => ({
          redoStack: state.redoStack.slice(0, -1),
          undoStack: [...state.undoStack, current],
          projects: s.projects.map(p =>
            p.id === s.currentProjectId
              ? { ...p, blocks: next.blocks, theme: next.theme }
              : p
          ),
        }))
      },

      addToast: (text: string, type: ToastMessage['type'] = 'success') => {
        const id = generateId()
        set(s => ({ toasts: [...s.toasts, { id, text, type }] }))
        setTimeout(() => get().removeToast(id), 3000)
      },

      removeToast: (id: string) => {
        set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }))
      },

      toggleDarkMode: () => {
        set(s => ({ isDarkMode: !s.isDarkMode }))
      },
    }),
    {
      name: 'maddybio-storage',
      version: 2,
      migrate: (persistedState, version) => {
        if (version !== 2) {
          return { projects: [], currentProjectId: null, isDarkMode: false, undoStack: [], redoStack: [] }
        }
        return persistedState as ProjectState
      },
      partialize: (state) => ({
        projects: state.projects,
        currentProjectId: state.currentProjectId,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
)

// Auto-create default project on first load
const store = useProjectStore.getState()
if (store.projects.length === 0) {
  store.createProject()
}
