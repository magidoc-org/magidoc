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
    croppedIndexes = indexes.map(([start, end]) => [
      start - cropMinIndex,
      end - cropMinIndex,
    ])
  }
  $: {
    croppedHtml = croppedIndexes.reduceRight((acc, [start, end]) => {
      return (
        acc.substring(0, start) +
        '<mark>' +
        acc.substring(start, end + 1) +
        '</mark>' +
        acc.substring(end + 1)
      )
    }, croppedText)
  }
</script>

{#if cropMinIndex > 0}...{/if}
{@html croppedHtml}
{#if cropMaxIndex < text.length}...{/if}
