<script lang="ts">
  import { tasks } from "/db/tasks/store"
  import { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
    import { Temporal } from "@js-temporal/polyfill";
  // import { Input, InputGroup, InputGroupText } from "sveltestrap";

  let description: string
  let timeDue: number | undefined
  let timeStale: number | undefined

  function create(e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (description) {
        tasks.add(SomeActionOneTime.new({
          description: description,
          timeDue: timeDue === undefined 
            ? null 
            : new Temporal.Instant(BigInt(new Date(timeDue).getTime())),
          timeStale: timeStale === undefined 
            ? null 
            : new Temporal.Instant(BigInt(new Date(timeStale).getTime())),
        }))
  
        description = ''
      }
    }
  }
  
</script>

<div class="creator">
  <input 
    type="text" 
    placeholder="Description"
    bind:value={description}
    on:keydown={create}
  >

  <input 
    type="datetime-local" 
    placeholder="When is this task due"
    bind:value={timeDue} 
  />

  <input 
    type="datetime-local"
    placeholder="When is this task stale"
    bind:value={timeStale}
  />
</div>