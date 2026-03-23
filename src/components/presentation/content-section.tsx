import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { Section, ContentBlock } from '@/data/uzbek-verbs'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { LightBulbIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ContentSectionProps {
  section: Section
}

export function ContentSection({ section }: ContentSectionProps) {
  return (
    <section id={section.id} className="scroll-mt-20 lg:scroll-mt-8">
      {/* Section Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 tracking-tight">
          {section.title}
        </h2>
        <div className="h-1 w-20 sm:w-24 gradient-lime rounded-full" />
      </div>

      <div className="space-y-4 sm:space-y-6">
        {section.subsections.map((subsection, index) => (
          <motion.div
            key={subsection.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card variant="glass" className="overflow-hidden group">
              <CardHeader className="border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent px-4 sm:px-6 py-4 sm:py-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1 h-6 sm:h-8 gradient-lime rounded-full" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                    {subsection.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4 sm:space-y-6">
                {subsection.content.map((block, blockIndex) => (
                  <ContentBlock key={blockIndex} block={block} index={blockIndex} />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ContentBlock({ block, index }: { block: ContentBlock; index: number }) {
  if (block.type === 'text') {
    return (
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="text-base sm:text-lg text-white/80 leading-relaxed font-light"
      >
        {block.content as string}
      </motion.p>
    )
  }

  if (block.type === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
      >
        {block.title && (
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-lime-500" />
            {block.title}
          </h4>
        )}
        <ul className="space-y-2 sm:space-y-3">
          {(block.content as string[]).map((item, itemIndex) => (
            <motion.li
              key={itemIndex}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: itemIndex * 0.05 }}
              className="flex items-start gap-3 text-white/70 group"
            >
              <span className="w-2 h-2 rounded-full bg-lime-500/50 mt-2 group-hover:bg-lime-500 transition-colors flex-shrink-0" />
              <span className="text-sm sm:text-base leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    )
  }

  if (block.type === 'table') {
    const table = block.content as any
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
      >
        {block.title && (
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 px-1">{block.title}</h4>
        )}
        
        {/* Desktop Table View */}
        <div className="hidden sm:block rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-lime-500/20 to-transparent">
                <th className="text-left py-4 px-5 text-lime-500 font-semibold text-sm uppercase tracking-wider">Shaxs</th>
                <th className="text-left py-4 px-5 text-lime-500 font-semibold text-sm uppercase tracking-wider">Shakl</th>
                {table.examples?.[0]?.translation && (
                  <th className="text-left py-4 px-5 text-lime-500 font-semibold text-sm uppercase tracking-wider">Izoh</th>
                )}
              </tr>
            </thead>
            <tbody>
              {table.examples?.map((example: any, rowIndex: number) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: rowIndex * 0.05 }}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-5 text-white font-medium text-base">{example.person}</td>
                  <td className="py-4 px-5">
                    <span className="inline-block px-4 py-2 rounded-xl bg-gradient-lime text-white font-semibold shadow-lg shadow-lime-500/20">
                      {example.form}
                    </span>
                  </td>
                  {example.translation && (
                    <td className="py-4 px-5 text-white/50 text-sm">{example.translation}</td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-3">
          {table.examples?.map((example: any, rowIndex: number) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: rowIndex * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs uppercase tracking-wider">Shaxs</span>
                <span className="text-white font-medium text-sm">{example.person}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs uppercase tracking-wider">Shakl</span>
                <span className="inline-block px-3 py-1.5 rounded-lg bg-gradient-lime text-white font-semibold text-sm shadow-lg shadow-lime-500/20">
                  {example.form}
                </span>
              </div>
              {example.translation && (
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs uppercase tracking-wider">Izoh</span>
                  <span className="text-white/70 text-sm text-right">{example.translation}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (block.type === 'example') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="rounded-2xl border border-lime-500/30 bg-gradient-to-br from-lime-500/10 to-lime-500/5 p-4 sm:p-6"
      >
        {block.title && (
          <h4 className="text-lime-500 font-semibold mb-3 sm:mb-4 flex items-center gap-2">
            <LightBulbIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {block.title}
          </h4>
        )}
        <div className="space-y-2">
          {(block.content as string[]).map((item, itemIndex) => (
            <motion.p
              key={itemIndex}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: itemIndex * 0.05 }}
              className="text-white/80 font-mono text-xs sm:text-sm bg-white/5 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 border border-white/10 break-all"
            >
              {item}
            </motion.p>
          ))}
        </div>
      </motion.div>
    )
  }

  if (block.type === 'warning') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-500/5 p-4 sm:p-6"
      >
        {block.title && (
          <h4 className="text-red-500 font-semibold mb-2 sm:mb-3 flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {block.title}
          </h4>
        )}
        <p className="text-white/70 text-sm sm:text-base leading-relaxed">{block.content as string}</p>
      </motion.div>
    )
  }

  return null
}
