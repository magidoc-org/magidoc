export type GenerationConfig = {
  /**
   * The output target directory
   */
  output: string
}

export default function generate(config: GenerationConfig) {
    console.log(config)
}
