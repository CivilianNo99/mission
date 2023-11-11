<script lang="ts">
  import TaskUi from "./Upcoming/Task.svelte";
  import { Task, tasks } from "/db/utility/indexed-db"

  
  async function moon() {
    // const _1 = Task.new({ description: "Wash your teeth" })
    // const _2 = Task.new({ description: "Dance with your cat" })
    // await tasks.add(_1)
    // await tasks.add(_2)
    // console.log(await tasks.get(_1.id))
    // console.log(await tasks.get(_2.id))
  }

  moon()
  // let description: string

  // async function create() {
  //   if (description) {
  //     await tasks.add(Task.new({ description }))
  //   }
  // }

  let ids = ["jk", "kjhkjh"]
  
  $: moon {
    
  }
</script>

<div>
  <h1>Upcoming Tasks</h1>
  <!-- <input type="text" bind:value={description}>
  <button on:click={create}>Create</button> -->
<!-- 
  <div class="tasks">
    {#if $tasks}
      {#each $tasks as task (task.id)}
        <TaskUi 
          description={task.description} 
          isComplete={task.isComplete} 
        />
      {/each}
    {/if}
  </div> -->
</div>

<style>
  .tasks {
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
  }
</style>