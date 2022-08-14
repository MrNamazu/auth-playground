<script lang="ts">
	import { session } from "$app/stores";
	import NotifyWindow from "$lib/comps/userControlPanel/notifyWindow.svelte";
	import defAvatar from '$lib/img/defAvatar.png';
	import { clickOutside } from '$lib/scripts/clickOutside';
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

  const avatar = getContext('avatar');
  let notifyWindow: boolean = false;
  let ucpWindow: boolean = false;
</script>

<div class="ucp">
  <div class="ucpMiscButton">
    <i class="fa-solid fa-screwdriver-wrench"></i>
  </div>
  
  <div class="ucpMiscButton">
    <i class="fa-solid fa-flag-usa"></i>
  </div> 

  <div class="usrPanel" on:mouseleave={() => ucpWindow = false}>

    <div class="username" on:mouseenter={() => ucpWindow = true}>
      <span>Eingeloggt als</span>
      <span class="usr">{$session.user?.ffchar ? $session.user?.ffchar : $session.user?.email}</span>
    </div>
    
    {#if ucpWindow}
      <div class="ucpDropdown" transition:fly="{{ y: -50, duration: 200 }}">
        <a href="/"><i class="fa-solid fa-list-check"></i><span>Craftinglists</span></a>
        <a href="/profile-settings"><i class="fa-solid fa-list-check"></i><span>Profile Settings</span></a>
        <a href="/auth/logout"><i class="fa-solid fa-list-check"></i><span>Logout</span></a>
      </div>
    {/if}
    

    <div class="avatar" on:mouseenter={() => ucpWindow = false} use:clickOutside on:click_outside={() => notifyWindow = false} on:click={() => notifyWindow = !notifyWindow} style={notifyWindow ? "border: 5px solid #eaac16 !important" : ''}>
      <div class="notifications">3</div>
      <div class="avatarContainer">
        <img src={$session?.user?.ffchar ? `${avatar}` : `${defAvatar}`} alt="Profile_Picture" />
      </div>
    </div>
    {#if notifyWindow}
      <NotifyWindow />
    {/if}
  </div>
  
</div>
<style lang="scss">
  .ucpDropdown {
    background-color: #0c0d1073;
    width: calc(100% - 20px);
    top: 48px;
    left: 2px;
    position: absolute;
    z-index: 3;
    transition: .2s all;
    border-radius: 3px;
    overflow: hidden;
    margin-top: 3px;
    box-shadow: 0 0 2px #000;
    display: flex;
    flex-direction: column;
    a {
      color: #fff;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      font-size: 14px;
      font-weight: 600;
      transition: .2s all;
      &:hover {
        background-color: $yellow;
        color: $dark;
        transition: .2s all;
      }
      i {
        margin-right: 5px;
      }
    }
  }


  .ucp {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ucpMiscButton {
    background-color: $transparent;
    border-radius: $radius;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s all;
    cursor: pointer;
    &:hover {
      background-color: $yellow;
      color: $dark;
      transition: .2s all;
    }
  }
  .usrPanel {
    display: flex;
    align-items: center;
    position: relative;
  }
  .username {
    background-color: $transparent;
    display: inline-flex;
    border-radius: $radius;
    height: 40px;
    align-items: center;
    padding: 0 30px 0 15px;
    .usr {
      font-weight: 600;
      color: $yellow;
      margin-left: 5px;
    }
  }
  .avatar {
    width: 55px;
    height: 55px;
    position: relative;
    border: 5px solid $fulldark;
    border-radius: 50%;
    transition: .2s all;
    margin-left: -25px;
    z-index: 3;
    cursor: pointer;
    &:hover {
      border: 5px solid $yellow;
      transition: .2s all;
    }
    .notifications {
      position: absolute;
      right: 0;
      top: -5px;
      background-color: $red;
      border-radius: 50%;
      height: 18px;
      width: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 11px;
      z-index: 1;
    }
    .avatarContainer {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      img {
        width: 55px;
        height: 55px;
      }
    }
  }
</style>