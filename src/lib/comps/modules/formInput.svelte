<script lang="ts">
let showPassword = false;

export let label: string;
export let type: string;
export let name: string;
export let placeholder: string;

let visType = type;
let visType2 = type;

$: {
  if (!showPassword) {
    visType2 = "password";
  } else {
    visType2 = "text";
  }
}
</script>

<div class="inputWrapper">
  <label for={name}>{label}</label>
  <div class="inputContainer">
    {#if visType !== "password"}
      <input class="input" {type} {name} {placeholder}> 
    {/if}
    {#if visType === "password"}
      <input class="input" type={visType2} {name} {placeholder}> 
      <div class="passwordvis" on:click={() => showPassword = !showPassword} ><i class="fa-solid fa-eye"></i></div>
    {/if}
  </div>
</div>


<style lang="scss">
  label {
    font-weight: 600;
    margin: 5px 3px;
  }
  .inputWrapper {
    display: flex;
    flex-direction: column;
  }
  .inputContainer {
    background-color: rgb(39, 39, 44);
    border-radius: 5px;
    border: 3px solid rgb(25, 24, 27);
    display: flex;
  }
  .passwordvis {
    background-color: rgba(0,0,0,0);
    border: 0px solid;
    color: #FFF;
    padding: 15px;
    cursor: pointer;
    &:hover {
      color: $blue;
    }
  }
  .input {
    background-color: rgba(0,0,0,0);
    border: 0px solid;
    width: 100%;
    color: #FFF;
    padding: 15px;
    font-weight: 500;
    font-family: 'Prompt', sans-serif;
  }
</style>