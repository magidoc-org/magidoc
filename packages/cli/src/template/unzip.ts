import extract from 'extract-zip'

export type UnzipConfiguration = {
  zipLocation: string
  destination: string
}

export async function unzipTemplate(config: UnzipConfiguration) {
  await extract(config.zipLocation, {
    dir: config.destination,
  })
}
