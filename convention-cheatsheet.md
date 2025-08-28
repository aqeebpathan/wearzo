# Naming Conventions & Project Structure Cheat Sheet

---

## **HOOKS (React Query)**

- `use<EntityPlural>Query` → fetch list
  _Example:_ `useProductsQuery`
- `use<Entity>Query` → fetch single item
  _Example:_ `useProductQuery`
- `use<Entity>ByIdQuery` → fetch item by ID
  _Example:_ `useProductByIdQuery`
- `useCreate<Entity>Mutation` → create action
  _Example:_ `useCreateProductMutation`
- `useUpdate<Entity>Mutation` → update action
  _Example:_ `useUpdateProductMutation`
- `useDelete<Entity>Mutation` → delete action
  _Example:_ `useDeleteProductMutation`
- `useSearch<EntityPlural>Query` → filtered or searched list
  _Example:_ `useSearchProductsQuery`

---

## **SERVICE API FUNCTIONS**

- `fetch<EntityPlural>` → get all
  _Example:_ `fetchProducts()`
- `fetch<Entity>ById` → get one by ID
  _Example:_ `fetchProductById(id)`
- `create<Entity>` → create new
  _Example:_ `createProduct(data)`
- `update<Entity>` → update existing
  _Example:_ `updateProduct(id, data)`
- `delete<Entity>` → delete item
  _Example:_ `deleteProduct(id)`
- `search<EntityPlural>` → search or filter
  _Example:_ `searchProducts(params)`

---

## **TYPES / INTERFACES**

- **Entity** → domain model
  _Example:_ `Product`
- **CreateEntityInput** → input for create
  _Example:_ `CreateProductInput`
- **UpdateEntityInput** → input for update
  _Example:_ `UpdateProductInput`
- **EntityResponse** → API response
  _Example:_ `ProductResponse`
- **Paginated<Entity>Response** → paginated list
  _Example:_ `PaginatedProductResponse`
- **EntityQueryParams** → query parameters
  _Example:_ `ProductQueryParams`

---

## **FILE NAMING**

- **`use<Entity>Query.ts`** → query hooks
  _Example:_ `useProductsQuery.ts`
- **`use<Entity>Mutation.ts`** → mutation hooks
  _Example:_ `useUpdateProductMutation.ts`
- **`<Entity>Api.ts`** → API service file
  _Example:_ `productApi.ts`
- **`<Entity>.types.ts`** → types file
  _Example:_ `product.types.ts`
- **`<Entity>.schema.ts`** → validation schema
  _Example:_ `createProduct.schema.ts`
- **`Create<Entity>Page.tsx`** → page component
  _Example:_ `CreateProductPage.tsx`
- **`Update<Entity>Page.tsx`** → page component
  _Example:_ `UpdateProductPage.tsx`
- **`<Entity>ManagementPage.tsx`** → page component
  _Example:_ `ProductManagementPage.tsx`

---

## **DIRECTORY STRUCTURE (per feature)**

- **hooks/** → React Query hooks
- **services/** → API functions
- **types/** → TypeScript types
- **schemas/** → validation schemas
- **pages/** → page-level components
- **components/** → UI components

---

## **CONSISTENT NAMING INSIDE HOOK FILES**

### Query Hook:

- `data` → rename to **response** or **rawData**
- Return domain data with specific name (**products**, **product**)
- Booleans: **isLoading**, **isError**
- Error object: **error**
- Return all in an object

_Example:_

```ts
const { data: response, isLoading, isError, error } = useQuery(...)

return {
  products: response ?? [],
  isLoading,
  isError,
  error,
}
```

### Mutation Hook:

- `mutate` → rename to **action name** (`createProduct`, `updateProduct`, etc.)
- Booleans: **isPending**, **isError**, **isSuccess**
- Error object: **error**
- Return all in an object

_Example:_

```ts
const { mutate: updateProduct, isLoading: isPending, isError, error } = useMutation(...)

return {
  updateProduct,
  isPending,
  isError,
  error,
}
```

## **React Query Settings**

- `queryKey` → `["products"]`, `["product", id]`
- `mutationFn` → `createProduct`, `updateProduct`, `deleteProduct`
- Use `queryClient.invalidateQueries()` for cache invalidation

## PROJECT FOLDER STRUCTURE EXAMPLE

```plaintext
src/
└── features/
    └── admin/
        └── productManagement/
            ├── components/
            │   ├── ProductForm.tsx
            │   ├── ProductTable.tsx
            │   └── ProductCard.tsx

            ├── hooks/
            │   ├── useProductsQuery.ts
            │   ├── useProductQuery.ts
            │   ├── useCreateProductMutation.ts
            │   ├── useUpdateProductMutation.ts
            │   ├── useDeleteProductMutation.ts
            │   └── useSearchProductsQuery.ts

            ├── services/
            │   └── productApi.ts

            ├── types/
            │   └── product.types.ts

            ├── schemas/
            │   ├── createProduct.schema.ts
            │   ├── updateProduct.schema.ts
            │   └── searchProducts.schema.ts

            ├── pages/
            │   ├── CreateProductPage.tsx
            │   ├── EditProductPage.tsx
            │   ├── ProductManagementPage.tsx
            │   └── ProductDetailsPage.tsx

            └── index.ts  (optional for barrel exports)
```

## EXAMPLE API SERVICE (productApi.ts)

```ts
export const fetchProducts = async () => { ... }
export const fetchProductById = async (id: string) => { ... }
export const createProduct = async (data: CreateProductInput) => { ... }
export const updateProduct = async (id: string, data: UpdateProductInput) => { ... }
export const deleteProduct = async (id: string) => { ... }
export const searchProducts = async (params: ProductQueryParams) => { ... }
```

## EXAMPLE QUERY HOOK (useProductsQuery.ts)

```ts
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productApi";
import { Product } from "../types/product.types";

export const useProductsQuery = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    products: response ?? [],
    isLoading,
    isError,
    error,
  };
};
```

## EXAMPLE TYPES (product.types.ts)

```ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  categoryId: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

export interface ProductQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}
```
