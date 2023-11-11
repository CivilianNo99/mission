<script lang="ts">
  import TaskUi from "./Upcoming/Task.svelte";
  import { Task, tasks } from "../utility/indexed-db"

  const all = tasks.allR()

  let description: string
  function create() {
    if (description) {
      tasks.add(Task.new({ description }))
      description = ''
    }
  }
</script>

<div class="self">
  <h1>Upcoming Tasks</h1>

  <div>
    <input type="text" bind:value={description}>
    <button on:click={create}>Create</button>
  </div>

  <div class="tasks">
    {#if $all}
      {#each $all as task (task.id)}
        <TaskUi id={task.id} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .self {
    gap: 2rem;
    display: flex;
    flex-flow: column nowrap;
    padding: 2rem;
  }

  .tasks {
    gap: 1.1rem;
    display: flex;
    flex-flow: column nowrap;

    max-width: 500px;
  }
</style>