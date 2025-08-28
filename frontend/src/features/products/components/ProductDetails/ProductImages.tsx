import "react-photo-view/dist/react-photo-view.css"
import { PhotoProvider, PhotoView } from "react-photo-view"

import MaximizeIcon from "@/assets/icons/maximize.svg?react"

interface ProductImage {
  url: string
  altText: string
}

interface ProductImagesProps {
  images: ProductImage[]
}

const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <PhotoProvider>
      {images?.map(({ url, altText }) => (
        <div
          key={url}
          className="group relative aspect-square h-[348px] w-full sm:aspect-auto lg:max-h-[348px] lg:max-w-[348px]"
        >
          <PhotoView src={url}>
            <div className="h-full w-full cursor-zoom-in">
              <img
                className="h-full w-full object-cover"
                src={url}
                alt={altText}
              />
              <MaximizeIcon className="absolute right-3 bottom-3 size-5 text-neutral-600 transition ease-in md:hidden md:group-hover:block" />
            </div>
          </PhotoView>
        </div>
      ))}
    </PhotoProvider>
  )
}

export default ProductImages
