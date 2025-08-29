import heroBG from "@/assets/images/hero-bg.webp"

const HeroBanner = () => {
  return (
    <section className="px-4 md:px-6 lg:px-12">
      <div className="mx-auto 2xl:container">
        <div className="my-4 md:my-6 lg:my-12">
          <h1 className="text-4xl leading-snug font-medium md:text-left md:text-5xl lg:text-6xl">
            STEP INTO STYLE : INTRODUCING{" "}
            <br className="hidden sm:inline-block" />
            WEARZO — YOUR FASHION HAVEN
          </h1>
        </div>
        <div className="relative mb-12 w-full overflow-hidden shadow-2xl">
          <img
            src={heroBG}
            alt="Hero Image"
            className="aspect-video h-[450px] w-full object-cover"
          />

          {/* Main WEARZO Text */}
          <div className="absolute right-0 bottom-0 left-0">
            <h2 className="text-center text-[6rem] leading-[0.7] font-normal tracking-tighter text-white drop-shadow-2xl sm:text-[8rem] sm:tracking-normal md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[12rem]">
              WEARZO
            </h2>
          </div>

          {/* Bottom to top fade effect - Over the text */}
          <div className="absolute right-0 bottom-0 left-0 h-[150px] bg-gradient-to-t from-black/90 to-transparent sm:h-[170px] md:h-[200px] lg:h-[250px] xl:h-[280px]"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
