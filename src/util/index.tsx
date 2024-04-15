interface ObjectWithValues {
  [key: string]: string | number | boolean | null | undefined;
}

// ======Check if any key of an object is empty======
export const objectValidator = (
  obj: ObjectWithValues | null | undefined
): string | undefined => {
  if (obj) {
    for (let key in obj) {
      if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
        return `Fields are not allowed to be empty`;
      }
    }
  }
};
