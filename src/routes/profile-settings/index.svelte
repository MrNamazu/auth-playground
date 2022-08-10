<script context="module" lang="ts">
import type { Load } from '@sveltejs/kit';

export const load: Load = ({session}) => {
    if (!session.user) {
        return {
          status: 302,
          redirect: '/auth/signin',
        };
    }
    return {
      status: 200,
      props: {
        user: session.user.email,
      }
    };
}
</script>

<script lang="ts">
import { send } from '$lib/api';

export let user: string
export let error: string | undefined
export let success: string | undefined

const changePassword = async (event: SubmitEvent) => {
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

<h2>Profile settings</h2>

<p>Your E-Mail: {user}</p>

<div class="container">
  <h2>Edit Password</h2>
  {#if error} <div class="error">{error}</div>{/if}
  {#if success} <div class="success">{success}</div>{/if}
  <form on:submit|preventDefault={changePassword} method="post">
    <div>
      <label for="oldpassword">Current password</label>
      <input type="password" id="oldpassword" name="oldpassword">
    </div>
    <div>
      <label for="newpassword">New password</label>
      <input type="password" id="newpassword" name="newpassword">
    </div>
    <div>
      <label for="newpasswordrp">Repeat new password</label>
      <input type="password" id="newpasswordrp" name="newpasswordrp">
    </div>
    <input type="hidden" id="mail" name="mail" bind:value={user} />
    <input type="submit" class="btn" value="Submit">
  </form>
  
</div>


<style lang="scss">
  .container {
    width: 500px;
    border: 1px solid #FFF;
    padding: 20px;
    border-radius: 10px;
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