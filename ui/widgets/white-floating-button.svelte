<script lang="ts">
  export let onClick: () => void = () => {}
  export let class_: string  = ''
</script>

<button class="btn" class:class_ on:click={onclick}>
  <slot />
</button>

<style>
  .btn {
    background-color: white;
    border: 0;
    /* padding: .7rem; */
    /* color: rgba(214, 214, 214, 0.637); */
    border: 2px solid rgba(0, 0, 0, 0.411);
    /* padding: .2rem .9rem; */
    border-radius: 0;

    
    padding: .2rem 1rem;
    box-shadow: #0000003d 5px 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.397);
  }

</style>