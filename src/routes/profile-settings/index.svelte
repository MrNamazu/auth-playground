<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	

export const load: Load = async ({session}) => {
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
      fftoken: session.user.fftoken
    }
  };
}
</script>

<script lang="ts">
import { send } from '$lib/api';
import FormInput from './../../lib/comps/modules/formInput.svelte';

export let user: string
export let fftoken: string
export let error: string | undefined
export let success: string | undefined

const changeProfile = async (event: SubmitEvent) => {
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
{#if error} <div class="error">{error}</div>{/if}
{#if success} <div class="success">{success}</div>{/if}

<div class="container">
  <h2>FF Connect</h2>
  <p>Your Token: <span>{fftoken}</span></p>
  <form action="/profile-settings/confirm-character" method="post" on:submit|preventDefault={changeProfile}>
    <FormInput type="text" name="characterid" label="Character ID" placeholder="123456789" />
    <input type="hidden" name="mail" bind:value={user} />
    <input type="hidden" name="fftoken" bind:value={fftoken} />
    <button type="submit" class="btn">Change</button>
  </form>
</div>
<br>
<div class="container">
  <h2>Your E-Mail</h2>
  <p>Current E-Mail Adress: {user}</p>

  <form action="/profile-settings/change-email" method="post" on:submit|preventDefault={changeProfile}>
    <FormInput label="New E-Mail" type="email" name="email" placeholder="New E-Mail" />
    <FormInput label="Password" type="password" name="password" placeholder="Password" />
    <input type="hidden" id="mail" name="oldmail" bind:value={user} />
    <input type="submit" class="btn" value="Submit">
  </form>
</div>
<br>
<div class="container">
  <h2>Edit Password</h2>

  <form action="/profile-settings/change-password" on:submit|preventDefault={changeProfile} method="post">

    <FormInput name="oldpassword" type="password" label="Old Password" placeholder="Password"  />
    <FormInput name="newpassword" type="password" label="New password" placeholder="Password"  />
    <FormInput name="newpasswordrp" type="password" label="Repeat new password" placeholder="Password"  />

    <input type="hidden" id="mail" name="mail" bind:value={user} />
    <input type="submit" class="btn" value="Submit">
  </form>
  
</div>


<style lang="scss">
  .container {
    width: 800px;
    border: 2px solid rgb(61, 61, 68);
    padding: 20px;
    border-radius: 10px;
  }
    form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .btn {
      margin-top: 20px
    }
  }
</style>