import { twMerge } from "tailwind-merge"
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

type Section = {
  title: string
  content: React.ReactNode
}

interface ProductInfoAccordionProps {
  description: string
}

const ProductInfoAccordion = ({ description }: ProductInfoAccordionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)

  const sections: Section[] = useMemo(
    () => [
      {
        title: "Description",
        content: <p>{description}</p>,
      },
      {
        title: "Shipping & Returns",
        content: (
          <>
            <p>
              Enjoy free shipping on orders over $50. Orders arrive in 5–7
              business days.
            </p>
            <p>
              Need to return something? You’ve got 30 days — easy and
              hassle-free.
            </p>
          </>
        ),
      },
      {
        title: "Materials & Care",
        content: (
          <>
            <p>Made with high-quality, sustainably sourced materials.</p>
            <ul className="list-inside list-disc">
              <li>Machine wash cold or hand wash</li>
              <li>Tumble dry low or air dry</li>
              <li>Do not bleach</li>
              <li>Cool iron if needed</li>
            </ul>
          </>
        ),
      },
    ],
    [description],
  )

  const toggleSection = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section aria-label="Product information" className="flex flex-col gap-4">
      {sections.map(({ title, content }, index) => {
        const isExpanded = selectedIndex === index
        const contentId = `accordion-content-${index}`
        return (
          <article key={title} className="border-b border-black/20 pb-4">
            <h2>
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={contentId}
                onClick={() => toggleSection(index)}
                className="flex w-full items-center justify-between text-left font-semibold text-[#101010] focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
              >
                {title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={twMerge(
                    "shrink-0 transition-transform duration-300",
                  )}
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  {!isExpanded && <line x1="12" y1="5" x2="12" y2="19"></line>}
                </svg>
              </button>
            </h2>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={`accordion-header-${index}`}
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden text-[#101010]/70"
                >
                  {content}
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        )
      })}
    </section>
  )
}

export default ProductInfoAccordion
