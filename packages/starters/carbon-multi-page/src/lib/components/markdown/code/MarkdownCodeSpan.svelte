<script lang="ts">
import type { Tokens } from 'marked'

export let token: Tokens.Codespan
</script>

<code class="code-span">
    {token.raw.slice(1, token.raw.length - 1)}
</code>

<style>
    .code-span {
        background: #f0f0f0;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        border-radius: 0.1rem;
    }
</style>
