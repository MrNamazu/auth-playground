<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  
  export const load: Load = ({session}) => {
    if (session.user) {
      return {
        status: 302,
        redirect: '/auth/signin/success',
      };
    }
  }
</script>
<script lang="ts">
import { send } from '$lib/api';
import { passwordStrength } from 'check-password-strength';

export let error: string | undefined
export let success: string | undefined

let password: string;
let strength: any;


const checkPassword = (password:string) => {
  strength = passwordStrength(password);
}
$: checkPassword(password)

const register = async (event: SubmitEvent) => {
  error = ''
  const formContent = event.target as HTMLFormElement
  const response = await send(formContent)

  if (response.error) {
    error = response.error
  } else {
    success = response.success
  }
  formContent.reset()
}

</script>

<h2>Signup</h2>

{#if error} <div class="error">{error}</div>{/if}
{#if success} <div class="success">Success</div>{/if}


<form on:submit|preventDefault={register} method="post">
  <div>
    <label for="mail">E-Mail</label>
    <input class="input" type="email" id="mail" name="mail">
  </div>
  <div>
    <label for="mail">Password (At least 8 Signs)</label>
    <input class="input" bind:value={password} type="password" id="password" name="password">
    {#if password}
      <div class="passwordCheck">
        <p>{strength.value}</p>
        <div class="valueBar" class:weak={strength.id === 0} class:low={strength.id === 1} class:medium={strength.id === 2} class:strong={strength.id === 3}></div>
      </div>
    {/if}
    
  </div>
  <div>
    <label for="mail">Repeat password</label>
    <input class="input" type="password" id="passwordrp" name="passwordrp">
  </div>
  <input class="btn" type="submit" value="Signup">
</form>


<style lang="scss">
  .passwordCheck {
    height: 35px;
    width: 100%;
    p {
      margin: 0;
    }
    .valueBar {
      height: 5px;
    }
    .weak {
      background-color: #ff0000;
    }
    .low {
      background-color: #ffa500;
    }
    .medium {
      background-color: #eeff00;
    }
    .strong {
      background-color: #00ff00;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    div {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .btn {
      margin-top: 20px
    }
  }
</style>