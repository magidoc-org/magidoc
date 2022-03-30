<script lang="ts">
  export let status: number
</script>

<section>
  <h1>
    {#if status === 404}
      Not Found :(
    {:else}
      Invalid Response From Server :(
    {/if}
  </h1>
  <div class="content-wrapper">
    <img src="/logo.png" alt="Magidoc" class="logo" />
    <h4>
      {#if status === 404}
        Could not find the requested page. Do you have the right URL?
      {:else}
        Server returned an invalid status {status} :(
      {/if}
    </h4>
  </div>
</section>

<style>
  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 75vh;
    justify-content: center;
    justify-items: center;
    align-items: center;
    text-align: center;
  }

  .logo {
    width: 15rem;
  }
</style>
