export function validateSize(file: File, max: File['size']) {
  return file.size <= max;
}

export function validateExtension(file: File, allowedExtensions: File['type'][] = []) {
  return allowedExtensions.includes(file.type);
}

export function validateLength(files: FileList | Array<File>, max: number) {
  return files.length <= max;
}
