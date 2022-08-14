<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="notificationWindow" transition:fly="{{ y: -50, duration: 200 }}">
  <ul>
    <div class="title"><i class="fa-solid fa-bell"></i> Benachrichtigungen</div>
    <li>
      <a href="/">
        <i class="fa-solid fa-comment"></i>
        <div class="notifyText">
          <span>Kthargas Nebius</span> hat auf deinen Kommentar in <span>Exarchen Rüstung der Verteidigung</span> geantwortet.
        </div>
      </a>
    </li>
    <li>
      <a href="/">
        <i class="fa-solid fa-comment"></i>
        <div class="notifyText">
          <span>Kthargas Nebius</span> hat auf deinen Kommentar in <span>Exarchen Rüstung der Verteidigung</span> geantwortet.
        </div>
      </a>
    </li>
    <li>
      <a href="/">
        <i class="fa-solid fa-comment"></i>
        <div class="notifyText">
          <span>Kthargas Nebius</span> hat auf deinen Kommentar in <span>Exarchen Rüstung der Verteidigung</span> geantwortet.
        </div>
      </a>
    </li>
    <li>
      <a href="/">
        <i class="fa-solid fa-comment"></i>
        <div class="notifyText">
          <span>Kthargas Nebius</span> hat auf deinen Kommentar in <span>Exarchen Rüstung der Verteidigung</span> geantwortet.
        </div>
      </a>
    </li>
    <li>
      <a href="/">
        <i class="fa-solid fa-comment"></i>
        <div class="notifyText">
          <span>Kthargas Nebius</span> hat auf deinen Kommentar in <span>Exarchen Rüstung der Verteidigung</span> geantwortet.
        </div>
      </a>
    </li>
  </ul>
</div>

<style lang="scss">
  .notificationWindow {
    position: absolute;
    z-index: 1;
    top: 50px;
    right: 10px;
    width: 300px;
    background: $transparent;
    border-radius: $radius;
    max-height: 300px;
    overflow-y: auto;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      .title {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 8px 10px;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        text-transform: uppercase;
      }
      li {
        transition: .2s all;
        &:nth-child(2n) {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:hover {
          background-color: $yellow;
          transition: .2s all;
          a {
            color: $light;
            .notifyText{
              span {
                color: $fulldark;
              }
            }
          }
        }
        a {
          display: flex;
          align-items: center;
          padding: 10px 10px;
          gap: 10px;
          color: #FFF;
          text-decoration: none;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid $yellow
        }
        .notifyText {
          font-weight: 500;
          font-size: 13px;
          span {
            font-weight: 600;
            color: $yellow;
          }
        }
      }
    }
  }
</style>