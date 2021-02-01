
export function deleteItem(index, arr, set) {
    let newArray = [...arr];
    newArray.splice(index, 1);
    set(newArray);
}
