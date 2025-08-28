import { Link } from "react-router-dom"

import Logo from "@/assets/logo.svg?react"

const Footer = () => {
  return (
    <footer className="relative bg-[#101010] px-4 text-[#fcfcfc] md:px-12">
      <div className="mx-auto my-12 flex flex-col-reverse items-center gap-8 sm:flex-row md:my-24 lg:gap-10 2xl:container">
        <div className="flex items-center gap-2 sm:w-3/5 sm:gap-2 md:w-3/5 md:gap-3">
          <Logo className="aspect-square size-10 text-white sm:size-13 md:size-15 lg:size-20" />
          <div>
            <h1 className="text-5xl font-normal sm:text-6xl md:text-7xl lg:text-8xl">
              WEARZO
            </h1>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-4 sm:grid sm:grid-cols-3 sm:gap-4 lg:gap-8">
            {footerLinks.map(({ label, href }) => (
              <Link
                to={href}
                key={href + label}
                className="md:text-md w-fit text-sm font-medium text-neutral-400 transition-colors hover:text-[#fcfcfc]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="absolute right-0 bottom-0 left-0 hidden py-2 text-center text-sm tracking-tight text-neutral-700 md:block">
        Images and logos are for illustrative use only.
      </p>
    </footer>
  )
}

const footerLinks = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Shop", href: "/collections/all" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
]

export default Footer
