import { useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { useProjectStore } from '../../store/projectStore'
import type { Block, BlockType } from '../../types'
import { BlockEditor } from './BlockEditor'

const BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: 'profile', label: 'پروفایل', icon: '👤' },
  { type: 'link', label: 'لینک', icon: '🔗' },
  { type: 'social', label: 'شبکه‌های اجتماعی', icon: '📱' },
  { type: 'card', label: 'کارت بانکی', icon: '💳' },
  { type: 'text', label: 'متن', icon: '📝' },
  { type: 'divider', label: 'جداکننده', icon: '➖' },
  { type: 'video', label: 'ویدئو', icon: '🎬' },
  { type: 'contact', label: 'تماس', icon: '📞' },
  { type: 'email', label: 'ایمیل', icon: '✉️' },
  { type: 'product', label: 'محصول', icon: '🛍️' },
  { type: 'hours', label: 'ساعت کاری', icon: '🕐' },
  { type: 'map', label: 'نقشه', icon: '🗺️' },
  { type: 'faq', label: 'سوالات متداول', icon: '❓' },
  { type: 'testimonial', label: 'نظرات', icon: '⭐' },
  { type: 'vcard', label: 'کارت ویزیت', icon: '🆔' },
  { type: 'gallery', label: 'گالری', icon: '🖼️' },
]

export function EditorPanel() {
  const project = useProjectStore(s => s.getCurrentProject())
  const reorderBlocks = useProjectStore(s => s.reorderBlocks)
  const addBlock = useProjectStore(s => s.addBlock)
  const [showMenu, setShowMenu] = useState(false)
  const blocks = project?.blocks ?? []

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = blocks.findIndex(b => b.id === active.id)
    const to = blocks.findIndex(b => b.id === over.id)
    if (from !== -1 && to !== -1) reorderBlocks(from, to)
  }

  return (
    <div className="p-4 space-y-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map(block => (
            <BlockCard key={block.id} block={block} />
          ))}
        </SortableContext>
      </DndContext>

      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:border-pink-300 hover:text-pink-400 transition-all text-sm">
          + افزودن بلوک جدید
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute bottom-full left-0 right-0 mb-2 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 z-20">
              {BLOCK_TYPES.map(({ type, label, icon }) => (
                <button key={type} onClick={() => { addBlock(type); setShowMenu(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-right text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-white/5 transition-colors">
                  <span className="text-lg">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function BlockCard({ block }: { block: Block }) {
  const { removeBlock, duplicateBlock, toggleBlock } = useProjectStore()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: transition ?? undefined,
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 50 : undefined,
  } : undefined

  const iconMap: Record<string, string> = {
    profile: '👤', link: '🔗', social: '📱', card: '💳', text: '📝',
    divider: '➖', video: '🎬', contact: '📞', email: '✉️', product: '🛍️',
    hours: '🕐', map: '🗺️', faq: '❓', testimonial: '⭐', vcard: '🆔', gallery: '🖼️',
  }
  const titleMap: Record<string, string> = {
    profile: 'پروفایل', link: 'لینک', social: 'شبکه‌های اجتماعی', card: 'کارت بانکی',
    text: 'متن', divider: 'جداکننده', video: 'ویدئو', contact: 'تماس', email: 'ایمیل',
    product: 'محصول', hours: 'ساعت کاری', map: 'نقشه', faq: 'سوالات متداول',
    testimonial: 'نظرات', vcard: 'کارت ویزیت', gallery: 'گالری',
  }

  return (
    <div ref={setNodeRef} style={style} className={`bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden ${!block.enabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-50 dark:border-white/5">
        <div className="flex items-center gap-2" {...attributes} {...listeners}>
          <span className="text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing">⠿</span>
          <span className="text-lg">{iconMap[block.type]}</span>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{titleMap[block.type]}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => toggleBlock(block.id)} className="px-2 py-1 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">{block.enabled ? '🙈' : '👁️'}</button>
          <button onClick={() => duplicateBlock(block.id)} className="px-2 py-1 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">📋</button>
          <button onClick={() => removeBlock(block.id)} className="px-2 py-1 text-xs rounded-lg hover:bg-red-50 text-red-400">🗑️</button>
        </div>
      </div>
      <div className="p-3">
        <BlockEditor block={block} />
      </div>
    </div>
  )
}
