export const validateDiscountPrice = (body) => {
  return !(body.discountPrice && body.discountPrice > body.price);
};

export const buildProductQuery = (queryParams) => {
  let query = {};
  let sortOptions = {};
  let {
    collection,
    size,
    colors,
    gender,
    minPrice,
    maxPrice,
    sort,
    search,
    category,
    material,
    brand,
    limit,
  } = queryParams;

  if (collection && collection.toLowerCase() !== "all")
    query.collections = collection.toLowerCase();
  if (category && category.toLowerCase() !== "all")
    query.category = category.toLowerCase();
  if (material)
    query.material = { $in: material.split(",").map((m) => m.toLowerCase()) };
  if (brand)
    query.brand = { $in: brand.split(",").map((b) => b.toLowerCase()) };
  if (size) query.sizes = { $in: size.split(",") };
  if (colors) {
    query.colors = {
      $in: colors
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean),
    };
  }
  if (gender) query.gender = gender.toLowerCase();
  if (search)
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  if (minPrice || maxPrice)
    query.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };

  // Sorting Logic
  const validSortOptions = {
    price_asc: { price: 1 },
    price_dsc: { price: -1 },
    popularity: { rating: -1 },
    new_arrivals: { createdAt: -1 },
  };

  sortOptions = validSortOptions[sort?.toLowerCase()] || {};

  return { query, sortOptions, limit: Number(limit) || 0 };
};
