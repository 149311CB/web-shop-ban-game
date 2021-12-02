export const getProductPrice = (data: any) => {
    let total = 0;
    if (!data) return;
    data.products.forEach((product: any) => {
        if (product) {
            if (product.product) {
                total = total + product.product.sale_price * product.quantity;
            }
        }
    });
    return total;
};