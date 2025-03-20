<script setup>
import { useMessageStore } from "@/stores/messageStore.ts";

const messageStore = useMessageStore();
</script>
<template>
  <div class="card" v-if="messageStore.message">
    <div
      class="icon-container"
      :class="{ err_container: messageStore.status != 200 }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        v-if="messageStore.status != 200"
        width="24"
        viewBox="0 0 24 24"
        height="24"
        fill="#dc2626"
      >
        <path
          fill="#dc2626"
          d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        stroke-width="0"
        fill="#259800"
        stroke="currentColor"
        class="icon"
        v-else
      >
        <path
          d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
        ></path>
      </svg>
    </div>
    <div class="message-text-container">
      <p class="message-text" :class="{ err: messageStore.status != 200 }">
        {{ messageStore.message }}
      </p>
      <p class="sub-text">{{ messageStore.desc }}</p>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 15"
      stroke-width="0"
      fill="none"
      stroke="currentColor"
      class="cross-icon"
      @click="messageStore.closeMessage"
    >
      <path
        fill="currentColor"
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
      ></path>
    </svg>
  </div>
</template>
<style scoped>
.card {
  position: fixed;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  width: 330px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
  z-index: 20;
}
.icon-container {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0feed;
  border-radius: 50%;
  margin-left: 8px;
}
.icon {
  width: 17px;
  height: 17px;
  color: #259800;
}

.err_container {
  background-color: #feeded;
}
.message-text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
}
.message-text,
.sub-text {
  margin: 0;
  cursor: default;
}
.message-text {
  color: #259800;
  font-size: 17px;
  font-weight: 700;
}

.err {
  color: #dc2626;
}
.sub-text {
  font-size: 14px;
  color: #555;
}
.cross-icon {
  width: 18px;
  height: 18px;
  color: #555;
  cursor: pointer;
}
</style>
