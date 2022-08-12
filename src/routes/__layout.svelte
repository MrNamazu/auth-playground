<script lang="ts">
	import { session } from '$app/stores';
	import '../app.scss';
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
	</ul>
	{#if $session.user}
	<ul>
		<li><a href="/profile-settings">{$session.user?.email}</a></li>
		<li><a href="/auth/logout">Logout</a></li>
	</ul>
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
			a {
				padding: 10px 15px;
				display: block;
				color: #fff;
				text-decoration: none;
        font-weight: 600;
				text-transform: uppercase;
				font-size: 12px;
			}
		}
	}
</style>
