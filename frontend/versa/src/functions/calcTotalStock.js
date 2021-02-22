export const calcTotalStock = (item) => {
    return item.stock.reduce((total, curr) => {
        total += curr.quantity;
        return total;
    }, 0);
};
