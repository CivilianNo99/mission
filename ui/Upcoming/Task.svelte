<script lang="ts">
  import { tasks } from "../../utility/indexed-db"
  import { Container, Row, Col, Icon } from "sveltestrap"
  import MdDeleteForever from 'svelte-icons/md/MdDeleteForever.svelte'

  export let id: string

  let task = tasks.rxOne(id)

  function writeIsComplete(event: { currentTarget: HTMLInputElement }) {
    tasks.put({
      ...$task!,
      isComplete: event.currentTarget.checked,
    })
  }

  function destroy() {
    tasks.delete(id)
  }

</script>

<div class="task">
  {#if $task === null}
    <div>Task not found</div>
  {:else}

    <input 
      type="checkbox"
      checked={$task.isComplete}
      on:change|self={writeIsComplete}
    />

    <div>{$task.description}</div>
    <button on:click={destroy} class="icon">
      <MdDeleteForever />
    </button>
  {/if}

</div>

<style>
  .task {
    display: flex;
    flex-flow: row nowrap;
    padding: 1rem;
    box-shadow: #0000003d 5px 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.397);
    gap: .5rem;
  }

  .task :nth-child(1) {
    display: block;
    width: 1rem;
  }

  .task :nth-child(2) {
    display: block;
    flex-grow: 1;
  }

  .task :nth-child(3) {
    display: block;
    width: 3rem;
  }
</style>