export const fileToDataURL = async (file: File | string): Promise<string> => {
  // If 'file' is already a date URL string, return it directly
  if (typeof file === "string") {
    return file;
  }

  // If 'file' is a File object, convert it to data URL
  if (file instanceof File) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(file);
    });
  }

  // If 'file' is neither a File nor a string, return it as is
  return file;
};
