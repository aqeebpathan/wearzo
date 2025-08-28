import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, FormProvider, useForm } from "react-hook-form"

import {
  ProductFormInput,
  ProductFormOutput,
  productSchema,
} from "../schemas/createProduct.schema"
import CustomRadioGroup from "./CustomRadio"
import Input from "@/shared/components/Input"
import Button from "@/shared/components/Button"
import ProductImageInput from "./ProductImageInput"

interface ProductFormProps {
  onSubmit: (data: ProductFormOutput) => void
  initialValues?: Partial<ProductFormInput>
  submitButtonLabel: string
  loading?: boolean
}

const ProductForm = ({
  onSubmit,
  initialValues,
  submitButtonLabel,
  loading = false,
}: ProductFormProps) => {
  const methods = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods

  const genderValue = watch("gender")
  const isFeaturedValue = watch("isFeatured")
  const isPublishedValue = watch("isPublished")

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          {/* Left Column */}
          <div className="w-full space-y-6 md:w-3/5">
            {/* 01/ General Information */}
            <Section title="01/ General Information">
              <Input
                id="name"
                label="Product Name"
                {...register("name")}
                error={errors.name}
              />
              <Input
                id="description"
                label="Description"
                {...register("description")}
                error={errors.description}
              />

              <div className="flex flex-col justify-center gap-6 lg:flex-row">
                <CustomRadioGroup
                  id="gender"
                  label="Gender"
                  options={[
                    { label: "Men", value: "men" },
                    { label: "Women", value: "women" },
                    { label: "Unisex", value: "unisex" },
                  ]}
                  error={errors.gender}
                  value={genderValue}
                  registration={register("gender")}
                />
                <Input
                  id="material"
                  label="Material"
                  {...register("material")}
                  error={errors.material}
                />
              </div>

              <div className="flex gap-6">
                <Input
                  id="brand"
                  label="Brand"
                  {...register("brand")}
                  error={errors.brand}
                />
                <Input
                  id="collections"
                  label="Collections"
                  {...register("collections")}
                  error={errors.collections}
                />
              </div>
            </Section>

            {/* 02/ Pricing */}
            <Section title="02/ Pricing">
              <div className="flex gap-6">
                <Input
                  id="price"
                  label="Base Price"
                  {...register("price")}
                  error={errors.price as FieldError}
                />
                <Input
                  id="discountPrice"
                  label="Discount Price"
                  {...register("discountPrice")}
                  error={errors.discountPrice as FieldError}
                />
              </div>
            </Section>

            {/* 03/ Inventory */}
            <Section title="03/ Inventory">
              <div className="flex gap-6">
                <Input
                  id="sku"
                  label="SKU"
                  {...register("sku")}
                  error={errors.sku}
                />
                <Input
                  id="countInStock"
                  label="Quantity in Stock"
                  {...register("countInStock")}
                  error={errors.countInStock as FieldError}
                />
              </div>
            </Section>

            {/* 04/ Variations */}
            <Section title="04/ Variations">
              <div className="flex gap-6">
                <Input
                  id="sizes"
                  label="Sizes"
                  {...register("sizes")}
                  error={errors.sizes}
                />
                <Input
                  id="colors"
                  label="Colors"
                  {...register("colors")}
                  error={errors.colors}
                />
              </div>
            </Section>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-6">
            {/* 05/ Images */}
            <Section title="05/ Product Images">
              <ProductImageInput
                name="productImages"
                error={errors.productImages?.message?.toString()}
              />
            </Section>

            {/* 06/ Category & Tags */}
            <Section title="06/ Category & Tags">
              <Input
                id="category"
                label="Category"
                {...register("category")}
                error={errors.category}
              />
              <Input
                id="tags"
                label="Tags"
                {...register("tags")}
                error={errors.tags}
              />
            </Section>

            {/* 07/ Visibility */}
            <Section title="07/ Visibility">
              <CustomRadioGroup
                id="isFeatured"
                label="Is Featured"
                registration={register("isFeatured")}
                error={errors.isFeatured}
                options={[
                  { label: "True", value: "true" },
                  { label: "False", value: "false" },
                ]}
                value={isFeaturedValue}
              />
              <CustomRadioGroup
                id="isPublished"
                label="Is Published"
                registration={register("isPublished")}
                error={errors.isPublished}
                options={[
                  { label: "True", value: "true" },
                  { label: "False", value: "false" },
                ]}
                value={isPublishedValue}
              />
            </Section>
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-8">
          <Button type="submit" disabled={loading}>
            {loading ? `${submitButtonLabel}...` : submitButtonLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProductForm

// Helper Component
const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="space-y-4">
    <h4 className="text-lg font-medium">{title}</h4>
    {children}
  </div>
)
