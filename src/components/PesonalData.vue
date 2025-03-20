<script setup>
import { useAccountStore } from "@/stores/accountStore.ts";
import { onMounted } from "vue";
import { ref } from "vue";
import AppLoader from "./AppLoader.vue";

const accountStore = useAccountStore();

onMounted(() => {
  accountStore.getUser();
});
const password = ref("");
const passOpen = ref(false);
const passOpen2 = ref(false);
const passOpen3 = ref(false);
const passInvalid = ref(false);
const passInvalid2 = ref(false);
const passInvalid3 = ref(false);
const openPass = (n) => {
  try {
    if (n == 1) {
      passOpen.value = true;
      let passNode = document.querySelector(`#password`);
      passNode.type = "text";
    } else if (n == 2) {
      passOpen2.value = true;
      let passNode = document.querySelector(`#password2`);
      passNode.type = "text";
    } else if (n == 3) {
      passOpen3.value = true;
      let passNode = document.querySelector(`#password3`);
      passNode.type = "text";
    }
  } catch (err) {
    console.log(err);
  }
};

const closePass = (n) => {
  try {
    if (n == 1) {
      passOpen.value = false;
      let passNode = document.querySelector(`#password`);
      passNode.type = "password";
    } else if (n == 2) {
      passOpen2.value = false;
      let passNode = document.querySelector(`#password2`);
      passNode.type = "password";
    } else if (n == 3) {
      passOpen3.value = false;
      let passNode = document.querySelector(`#password3`);
      passNode.type = "password";
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <AppLoader class="center" v-if="accountStore.isLoading" />
  <div class="cards" v-else>
    <div class="card">
      <h2>My data</h2>
      <div class="group-avatar">
        <div class="avatar">
          <img src="../assets/image.png" alt="" />
        </div>
        <span>Edit a photo</span>
      </div>
      <div class="group">
        <label for="name" class="group-value">Full name</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="accountStore.fullname"
          class="group-item"
          placeholder="Enter your full name"
        />
      </div>
      <div class="group">
        <label for="email" class="group-value">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="accountStore.email"
          class="group-item"
          placeholder="Enter your email"
        />
      </div>
      <button
        class="btn"
        @click="accountStore.updateUser()"
        v-if="!accountStore.isLoading3"
      >
        Save
      </button>
      <AppLoader class="center" v-else />
      <!-- <div class="group">
        <label for="lan" class="group-value">Language</label>
        <input
          type="text"
          id="lan"
          name="lan"
          v-model="lan"
          class="group-item"
        />
      </div> -->
    </div>
    <div class="card">
      <h2>Change password</h2>
      <div class="group">
        <label for="password" class="group-value">Current password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="group-item"
          :class="{ invalid: passInvalid }"
          placeholder="Enter your current password"
        />
        <img
          src="../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen"
          @click="openPass(1)"
        />
        <img
          src="../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen"
          @click="closePass(1)"
        />
      </div>
      <div class="group">
        <label for="password2" class="group-value">New password</label>
        <input
          type="password"
          id="password2"
          name="password"
          v-model="accountStore.new_password1"
          class="group-item"
          :class="{ invalid: passInvalid2 }"
          placeholder="Enter a new password"
        />
        <img
          src="../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen2"
          @click="openPass(2)"
        />
        <img
          src="../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen2"
          @click="closePass(2)"
        />
      </div>
      <div class="group">
        <label for="password3" class="group-value"
          >Repeat the new password</label
        >
        <input
          type="password"
          id="password3"
          name="password"
          v-model="accountStore.new_password2"
          class="group-item"
          :class="{ invalid: passInvalid3 }"
          placeholder="Repeat the new password"
        />
        <img
          src="../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen3"
          @click="openPass(3)"
        />
        <img
          src="../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen3"
          @click="closePass(3)"
        />
      </div>
      <button
        class="btn"
        @click="accountStore.changePassword()"
        v-if="!accountStore.isLoading2"
      >
        Change password
      </button>
      <AppLoader class="center" v-else />
    </div>
  </div>
</template>
<style scoped>
.cards {
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 20px;
}
.card {
  width: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  background-color: #fff;
  border: 1px solid rgba(115, 122, 140, 0.1);
  border-radius: 10px;
}

h2 {
  font-weight: 400;
  font-size: 16px;
  line-height: 19.84px;
  color: #8c93a6;
}

.group-avatar {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar img {
  height: 48px;
  width: 48px;
  border-radius: 12px;
  overflow: hidden;
  object-fit: cover;
}

.group-avatar span {
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  text-decoration: underline;
  color: rgba(0, 94, 255, 1);
}

.group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #dfe3ec;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item::placeholder {
  color: #8c93a6;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}
.password-img {
  position: absolute;
  height: 16px;
  width: 16px;
  cursor: pointer;
  right: 3%;
  top: 55%;
}

.btn {
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
  padding: 14.5px 20px;
  border-radius: 8px;
  background-color: rgba(0, 94, 255, 1);
}

@media (max-width: 1180px) {
  .cards {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }
}
</style>
