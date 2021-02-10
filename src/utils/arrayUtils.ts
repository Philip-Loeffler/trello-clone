interface Item {
  id: string;
}

//this is capturing the type of the arguement
//the T allows us to capture the type the user is providing, so that we can use that information later
//the generic is saying we can pass whatever type we would like to it
//this will allow us to get the item postion in the array knowings its id
export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  return items.findIndex((item: T) => item.id === id);
};

//defined a function that takes in an array, new item and target index
//then generate a new array where the object at index targetIndex is
//overriden with the newItem value
//using type variable T to represent the type of the item in the array
export function overrideItemAtIndex<T>(
  array: T[],
  newItem: T,
  targetIndex: number
) {
  return array.map((item, index) => {
    if (index !== targetIndex) {
      return item;
    }
    return newItem;
  });
}

//use the spread operator to generate a new array with a portion before,
//the index that we get using the slice method, and the portion after the index
//using the slice method with an index plus 1
export function removeItemAtIndex<T>(array: T[], index: number) {
  return [array.slice(0, index), ...array.slice(index + 1)];
}

export const moveItem = <T>(array: T[], from: number, to: number) => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
