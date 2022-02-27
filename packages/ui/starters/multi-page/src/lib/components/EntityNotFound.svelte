<script type="ts">
  export let type: string
  export let name: string
</script>

<h1>Not Found :(</h1>
<div class="content-wrapper">
  <img src="/logo.png" alt="Magidoc" class="logo" />
  <h4>
    Could not find any {type} named '{name}'
  </h4>
</div>

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
      width: 15rem
  }
</style>
