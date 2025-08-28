export const addTotalProductPrices = (cart) => ({
  ...(cart.toObject?.() || cart),
  products: cart.products.map((item) => ({
    ...(item.toObject?.() || item),
    totalProductPrice: item.price * item.quantity,
  })),
});
