
export function deleteItem(index, arr, set, dispatch, type) {
    let newArray = [...arr];
    newArray.splice(index, 1);
    dispatch(set('product',type, newArray));
}
