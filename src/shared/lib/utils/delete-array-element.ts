export const deleteElementById = <T>(
  array: Array<T & { id: string }>,
  id: string,
  newItem?: T & { id: string },
) => {
  const index = array.findIndex((item) => item.id === id);

  if (newItem) {
    array.splice(index, 1, newItem);
    return array;
  }

  array.splice(index, 1);
  return array;
};
