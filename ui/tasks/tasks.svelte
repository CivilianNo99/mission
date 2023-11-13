<script lang="ts">
  // import TaskUi from "./Upcoming/Task.svelte";
  import Creator from "./creator.svelte";
  import TaskUi from "./task.svelte";
  import { tasks as store } from "/db/tasks/store"

  const tasks = store.allR()

  // only show upcoming tasks
  
  // const all = tasks.allR()

  // let description: string
  // function create() {
  //   if (description) {
  //     tasks.add(Task.new({ description }))
  //     description = ''
  //   }
  // }
</script>

<div class="component">
  <Creator />
  {#each $tasks as task (task.id)}
    <TaskUi id={task.id} />
  {/each}
<!-- 
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
  </div> -->
</div>

<style>
  .component {
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