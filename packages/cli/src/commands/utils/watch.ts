import chokidar from 'chokidar'

export function watchFiles(
  paths: (string | undefined)[],
  callback: () => Promise<void>,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const watcher = chokidar.watch(
      paths.filter((path): path is string => !!path),
      {
        persistent: true,
      },
    )

    const handler = debounce(() => {
      callback().catch((error) => reject(error))
    })

    watcher.on('add', handler)
    watcher.on('change', handler)
    watcher.on('unlink', handler)
  })
}

function debounce(func: () => void, timeout = 300) {
  let timer: NodeJS.Timeout
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func()
    }, timeout)
  }
}
