<script lang="ts">
export let text: string
export let indexes: ReadonlyArray<[number, number]>

const cropOffset = 30

let croppedText: string
let croppedIndexes: ReadonlyArray<[number, number]>
let croppedHtml: string

$: minIndex = Math.min(...indexes.map((index) => index[0]))
$: maxIndex = Math.max(...indexes.map((index) => index[1]))
$: cropMinIndex = Math.max(minIndex - cropOffset, 0)
$: cropMaxIndex = Math.min(maxIndex + cropOffset + 1, text.length)
$: {
  croppedText = text.slice(cropMinIndex, cropMaxIndex)
  croppedIndexes = indexes.map(([start, end]) => [start - cropMinIndex, end - cropMinIndex])
}
$: {
  const openings = new Set(croppedIndexes.map(([start]) => start))
  const closings = new Set(croppedIndexes.map(([, end]) => end))

  croppedHtml = ''
  let open = false

  for (let i = 0; i < croppedText.length; i++) {
    const char = croppedText[i]
    if (openings.has(i) && !open) {
      open = true
      croppedHtml += '<mark>'
      croppedHtml += char
    } else if (closings.has(i) && open) {
      open = false
      croppedHtml += char
      croppedHtml += '</mark>'
    } else {
      croppedHtml += char
    }
  }
}
</script>

{#if cropMinIndex > 0}...{/if}
{@html croppedHtml}
{#if cropMaxIndex < text.length}...{/if}
