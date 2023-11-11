<script lang="ts">
  // import { Input } from "sveltestrap/src"

  export let description: string
  export let isComplete: boolean

</script>

<div class="task">
  <input type="checkbox" value="true" />
  <div>{description}</div>
</div>

<style>
  .task {
    display: flex;
    flex-flow: row nowrap;
    padding: 1rem;
    /* box-shadow: #0000003d 2px 3px 0; */
    border: 1px solid;
  }
</style>