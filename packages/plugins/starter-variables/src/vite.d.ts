/**
 * Copy of the ViteJS import meta interface
 */
interface MetaEnv {
  [key: string]: unknown
}

interface Meta {
  readonly env: MetaEnv
}
