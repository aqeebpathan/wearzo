import { Link } from "react-router-dom"

import CountdownTimer from "./components/CountdownTimer"

const Topbar = () => {
  return (
    <div className="bg-[#101010] px-4 py-2.5 lg:px-12">
      <div className="mx-auto flex flex-col-reverse justify-between gap-0.5 text-[#fcfcfc] sm:flex-row 2xl:container">
        <p className="text-center text-sm sm:text-start">
          Get 25% Off This Summer Sale.{" "}
          <Link to="/collections" className="underline underline-offset-2">
            Grab It Now!
          </Link>
        </p>

        <CountdownTimer />
      </div>
    </div>
  )
}

export default Topbar
