<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useChatStore } from "@/stores/chatStore.ts";
import { useAccountStore } from "@/stores/accountStore.ts";
import { useMenuStore } from "@/stores/menuStore.ts";

const chatStore = useChatStore();
const menuStore = useMenuStore();
const accountStore = useAccountStore();
const router = useRouter();
const route = useRoute();

chatStore.getChats();

const footer = ref([
  {
    name: "Legal Information",
    active: false,
    img: "legal-info",
    route: "legalInfo",
  },
  {
    name: "Support",
    active: false,
    img: "support",
    route: "support",
  },
]);
// const isLoading = ref(true);
const more = ref(false);
const goProfile = () => {
  try {
    router.push({ name: "personal" });
  } catch (err) {
    console.log(err);
  }
};
const navClick = (name, s) => {
  try {
    if (s == "footer") {
      for (let i = 0; i < footer.value.length; i++) {
        let item = footer.value[i];
        item.active = false;
        if (item.route == name) {
          item.active = true;
        } else {
          item.active = false;
        }
        footer.value[i] = item;
      }
      router.push({ name: name });
    } else {
      chatStore.selectedChat = name;
      menuStore.menu = false;
      router.push({ name: "chat" });
    }
  } catch (err) {
    router.push({ name: "404" });
  }
};

const checkRoute = () => {
  let name = route.name;
  // for (let i = 0; i < today.value.length; i++) {
  //   let card = today.value[i];
  //   if (card.route == name) {
  //     card.active = true;
  //     today.value[i] = card;
  //   }
  // }
  for (let i = 0; i < footer.value.length; i++) {
    let card = footer.value[i];
    if (card.route == name) {
      card.active = true;
      footer.value[i] = card;
    }
  }
};

// Следим за изменениями маршрута
watch(
  () => route.name,
  (newName) => {
    if (!newName) {
      return;
    }
    checkRoute();
  }
);
</script>
<template>
  <div class="panel">
    <div class="main">
      <div class="wrap-logo">
        <img class="logo" src="../assets/logo-panel.svg" alt="" />
      </div>
      <div class="actions">
        <img src="../assets/search.svg" alt="" />
        <button class="btn addChat" @click="chatStore.addChat">
          <span class="text-addChat">Add New Chat</span>
          <img src="../assets/chat-add.svg" alt="" />
        </button>
      </div>
      <div class="wrap-group-nav">
        <nav
          class="group-nav"
          v-for="(chats, date, i) in chatStore.chats"
          :key="i"
        >
          <h2>{{ date }}</h2>
          <li
            class="nav-item"
            @click="navClick(item.id)"
            v-for="item in chats"
            :key="item"
            :class="{ active: item.id == chatStore.selectedChat }"
          >
            <div class="nav-item-info">
              <img
                v-if="item.id == chatStore.selectedChat"
                src="../assets/message-menu-active.svg"
                alt=""
              />
              <img v-else src="../assets/message-menu.svg" alt="" />
              <span :class="{ blue: item.id == chatStore.selectedChat }"
                >Chat {{ item.id }}</span
              >
            </div>
            <div class="more">
              <img
                src="../assets/more-chat.svg"
                v-if="item.id == chatStore.selectedChat"
                @click="item.more = !item.more"
                alt=""
              />
              <div class="options" :class="{ show: item.more }">
                <button>Edit</button>
                <button class="delete" @click="chatStore.deleteChat">
                  Delete
                </button>
              </div>
            </div>
          </li>
        </nav>
      </div>
    </div>
    <div class="footer">
      <div class="hr"></div>
      <nav class="group-nav">
        <li
          class="nav-item"
          @click="navClick(item.route, 'footer')"
          v-for="item in footer"
          :key="item.name"
          :class="{ active: item.active }"
        >
          <div class="nav-item-info">
            <img :src="`/assets/${item.img}.svg`" v-if="!item.active" alt="" />
            <img
              :src="`/assets/${item.img}-active.svg`"
              v-if="item.active"
              alt=""
            />
            <span :class="{ blue: item.active }">{{ item.name }}</span>
          </div>
        </li>
      </nav>
      <div class="miniHR"></div>
      <div class="wrap-profile">
        <div class="profile" @click="$router.push({ name: 'personal' })">
          <div class="avatar">
            <img src="../assets/image.png" alt="" />
          </div>
          <div class="profile-info">
            <span class="name">{{ accountStore.fullname }}</span>
            <span class="email">{{ accountStore.email }}</span>
          </div>
        </div>
        <div class="more">
          <img @click="more = !more" src="../assets/more.svg" alt="" />
          <div class="options" :class="{ show: more }">
            <button @click="goProfile()">Account</button>
            <button class="delete" @click="accountStore.logOut">Log out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  transition: all 500ms ease;
}
.panel {
  width: 25%;
  max-width: 310px;
  background-color: #fff;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.wrap-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(115, 122, 140, 0.1);
  padding-bottom: 10px;
}

.logo {
  width: 112px;
  height: 55px;
}

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.actions,
.group-nav,
.wrap-profile {
  padding: 0 20px;
}

.actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions img {
  cursor: pointer;
}

.group-img {
  display: flex;
  align-items: center;
  gap: 5px;
}

.wrap-group-nav {
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.group-nav {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group-nav h2 {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #14171f;
}

.nav-item {
  width: 100%;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 12px 6px 12px 12px;
  transition: all 500ms ease;
}
.nav-item-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #8c93a6;
}

.blue {
  color: #005eff !important;
}

.active {
  background-color: #e6eefe;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrap-profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.avatar img {
  height: 44px;
  width: 44px;
  border-radius: 12px;
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.name {
  font-weight: 600;
  font-size: 14px;
  line-height: 19.12px;
  color: #14171f;
}

.email {
  font-weight: 500;
  font-size: 12px;
  line-height: 16.39px;
  color: #8c93a6;
}

.more {
  padding: 5px;
  position: relative;
  cursor: pointer;
}

.options {
  width: 108px;
  position: absolute;
  right: 1%;
  top: -90px;
  padding: 5px 6px;
  border-radius: 8px;
  border: 1px solid rgba(223, 227, 236, 1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: -1;
  opacity: 0;
}

.options:first-child {
  top: 30px;
}

.show {
  opacity: 1;
  z-index: 2;
}

.options button {
  width: 100%;
  padding: 10px 10px 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(20, 23, 31, 1);
  text-align: left;
}

.delete {
  color: rgba(223, 58, 68, 1) !important;
}

.addChat {
  background-color: #1233ea;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14.5px 20px;
  border-radius: 8px;
}

.text-addChat {
  color: #fff;
  font-weight: 500;
}

@media (max-width: 1440px) {
  .profile {
    flex-direction: column;
    align-items: start;
  }
}

@media (max-width: 1300px) {
  .text-addChat {
    display: none;
  }

  .addChat {
    padding: 8px;
  }
}

@media (max-width: 768px) {
  .panel {
    width: 100%;
    max-width: auto;
  }

  .wrap-logo {
    display: none;
  }
}
</style>
