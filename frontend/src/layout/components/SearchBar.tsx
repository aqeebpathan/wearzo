import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import CloseIcon from "@/assets/icons/close.svg?react"
import SearchIcon from "@/assets/icons/search.svg?react"

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [openSearch, setOpenSearch] = useState<boolean>(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (searchTerm.trim() !== "") {
      params.set("search", searchTerm.trim())
    }

    navigate(`/collections/all?${params.toString()}`, { replace: true })
    setOpenSearch(false)
  }

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {openSearch && (
          <motion.div
            key="search-input"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 270, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search for product"
                autoFocus
                className="w-full border px-1.5 py-1.5 font-bold outline-none placeholder:font-medium placeholder:text-neutral-400"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpenSearch((prev) => !prev)}
        className="z-10 ml-2 cursor-pointer"
      >
        {openSearch ? (
          <CloseIcon className="icon" />
        ) : (
          <SearchIcon className="icon" />
        )}
      </button>
    </div>
  )
}

export default SearchBar
