export interface ImageData {
	url: string,
	width: number,
  height: number
}

export function parseImage(file: any) {
  let res = {
    url: '',
    width: 0,
    height: 0,
  }

  if (file) {
    res = {
      url: 'https:' + file.url,
      width: file.details.image.width,
      height: file.details.image.height,
    }
  }

  return res
}