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

export let error: string | undefined
export let success: string | undefined

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
    <input type="email" id="mail" name="mail">
  </div>
  <div>
    <label for="mail">Password</label>
    <input type="password" id="password" name="password">
  </div>
  <div>
    <label for="mail">Repeat password</label>
    <input type="password" id="passwordrp" name="passwordrp">
  </div>
  <input class="btn" type="submit" value="Signup">
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