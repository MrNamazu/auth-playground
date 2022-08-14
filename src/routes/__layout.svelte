<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	

export const load: Load = async ({session}) => {
  const getAvatar = async () => {
		if (session?.user?.ffid !== undefined) {
			const fetchCharacter = await fetch(`https://xivapi.com/character/${session.user.ffid}`)
			const character = await fetchCharacter.json()
			return character.Character.Avatar
		}
	}
  return {
    status: 200,
    props: {
			avatar: session?.user?.ffid ? await getAvatar() : undefined,
    }
  };
}
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import Ucp from '$lib/comps/userControlPanel/ucp.svelte';
	import { setContext } from 'svelte';
	import '../app.scss';

	export let avatar: string | undefined;

	setContext('avatar', avatar);

</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
	</ul>
	{#if $session.user}
		<Ucp />
	{:else}
	<ul>
		<li><a href="/auth/signin">Signin</a></li>
		<li><a href="/auth/signup">Signup</a></li>
	</ul>
	{/if}
</nav>


<div class="container">
  <slot />
</div>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #181a1d;
		padding: 20px;
	}
  .container {
    padding: 30px;
  }
	ul {
		display: flex;
		list-style: none;
    margin: 0;
    padding: 0;
		li {
			margin-right: 10px;
			background-color: rgb(87, 145, 221);
			border-radius: 5px;
			display: flex;
			a {
				padding: 10px 15px;
				display: flex;
				align-items: center;
				color: #fff;
				text-decoration: none;
        font-weight: 600;
				text-transform: uppercase;
				font-size: 12px;
				img {
					margin-left: 5px;
				}
			}
		}
	}
	.profilepic {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
</style>
