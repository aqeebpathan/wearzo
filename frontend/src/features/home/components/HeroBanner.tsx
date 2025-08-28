import heroBG from "@/assets/images/hero-bg.png"

const HeroBanner = () => {
  return (
    <section className="px-4 md:px-6 lg:px-12">
      <div className="mx-auto 2xl:container">
        <div className="my-12">
          <h1 className="text-center text-2xl leading-snug font-medium sm:text-3xl md:text-left md:text-5xl lg:text-6xl">
            STEP INTO STYLE : INTRODUCING <br />
            WEARZO — YOUR FASHION HAVEN
          </h1>
        </div>

        <div className="relative mb-12 w-full overflow-hidden">
          <img
            src={heroBG}
            alt="Hero Image"
            className="aspect-video h-[450px] w-full object-cover"
          />
          <h2 className="absolute -bottom-18 left-1/2 flex w-full -translate-x-1/2 transform justify-center bg-gradient-to-b from-black/0 from-0% to-black/50 to-50% text-[calc(1vw+15rem)] leading-tight text-neutral-50">
            WEARZO
          </h2>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
