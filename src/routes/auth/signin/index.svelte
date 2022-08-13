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
import { session } from '$app/stores';
import { send } from '$lib/api';

export let error: string | undefined;

const login = async (event: SubmitEvent) => {
  error = ''
  const formContent = event.target as HTMLFormElement
  console.table(formContent)
  const response = await send(formContent)

  if (response.error) {
    error = response.error
  }

  $session.user = response.email
  
  formContent.reset()
}
</script>
  
<h2>Signin</h2>

{#if error} <div class="error">{error}</div>{/if}

<form on:submit|preventDefault={login} action="/auth/signin" method="post">
  <div>
    <label for="mail">E-Mail</label>
    <input class="input" type="email" id="mail" name="mail">
  </div>
  <div>
    <label for="mail">Password</label>
    <input class="input" type="password" id="password" name="password">
  </div>
  <input class="btn" type="submit" value="Signin">
</form>


<style lang="scss">
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