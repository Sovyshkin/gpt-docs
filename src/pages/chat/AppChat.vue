<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import DocPanel from "./DocPanel.vue";
import { useChatStore } from "@/stores/chatStore.ts";
import AppLoader from "@/components/AppLoader.vue";
import ChatLoader from "@/components/ChatLoader.vue";
import AppEmpty from "@/components/AppEmpty.vue";

const chatStore = useChatStore();
// chatStore.getMessages();

const messagesContainer = ref(null); // Создаем ref для контейнера сообщений

const handleEnter = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatStore.addMessage();
  }
};

// Функция для прокрутки к последнему сообщению
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      console.log(messagesContainer.value);
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  });
};

watch(
    () => chatStore.messages,
    () => {
      console.log('новое сообщение');
      chatStore.isLoading = false
      scrollToBottom();
    },
    { deep: true, immediate: true }
);

// Прокручиваем к последнему сообщению при монтировании компонента
onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="wrapper">
    <DocPanel />
    <div class="chat">
      <div class="messages" v-if="!chatStore.empty && !chatStore.isLoading" ref="messagesContainer">
        <div
          class="wrap-message"
          v-for="message in chatStore.messages"
          :key="message.id"
          :class="{ user: message.role == 'user' }"
        >
          <div
            class="group-message"
            :class="{ userGroupMessage: message.role == 'user' }"
          >
            <div
              class="message"
              v-if="!message.file_id"
              v-html="message.content"
              :class="{ userMessage: message.role == 'user' }"
            >
            </div>
            <a
              class="message doc"
              v-if="message.file_id"
              :key="message.id"
              :class="{ userMessage: message.role == 'user' }"
              :href="`http://38.180.137.72:9000/files/${message.content}`"
              target="_blank"
            >
              <img src="../../assets/message-file.svg" alt="" />
                <span class="name">{{ message.content }}</span>
            </a>
            <div class="avatar">
              <img
                src="../../assets/image.png"
                alt=""
                v-if="message.role == 'user'"
              />
              <img
                src="../../assets/gpt.svg"
                alt=""
                v-else
              />
            </div>
          </div>
        </div>
      </div>
      <AppEmpty v-if="chatStore.empty && !chatStore.isLoading" />
      <ChatLoader class="left" v-if="chatStore.chatLoader"/>
      <div class="group-send">
        <div class="group-file">
          <input
            type="file"
            id="file"
            @change="chatStore.handleFileChange"
            accept=".pdf,.doc,.docx,.txt"
          />
          <label class="select-img" for="file">
            <img class="photo" src="../../assets/folder-add.svg" alt="" />
          </label>
        </div>
        <input
          type="text"
          class="group-item"
          v-model="chatStore.message"
          @keydown.enter="handleEnter"
          placeholder="start writing..."
        />
        <img
          class="send"
          src="../../assets/send.svg"
          @click="chatStore.addMessage"
          alt=""
          v-if="!chatStore.isLoadingSend"
        />
        <AppLoader v-if="chatStore.isLoadingSend" />
        <div class="doc-file" v-if="chatStore.selectedFile.size">
          <img class="doc-img" src="@/assets/doc.svg" alt="" />
          <div class="doc-info">
            <span class="doc-name">{{ chatStore.selectedFile.name }}</span>
            <span class="doc-size"
              >{{ (chatStore.selectedFile.size / 1024).toFixed(2) }} KB</span
            >
          </div>
          <img
            src="@/assets/delete.png"
            class="delete"
            @click="chatStore.clearFile"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.chat {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

input[type="file"] {
  border: none;
  display: none;
}

.group-file {
  display: flex;
  align-items: center;
  justify-content: center;
}

label {
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.messages {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  height: 82vh;
  background-color: #f8f9fc;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.messages::-webkit-scrollbar {
  width: 0;
}

.wrap-message {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.user {
  justify-content: flex-end;
}

.group-message {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 10px;
  flex-direction: row-reverse;
  padding-right: 38px;
  padding-left: 0;
}

.userGroupMessage {
  flex-direction: row;
  padding-left: 38px;
  padding-right: 0;
  justify-content: end;
}

.message {
  max-width: 600px;
  width: fit-content;
  background-color: #e6eefe;
  padding: 20px;
  border-radius: 4px 12px 12px 12px;
}
.userMessage {
  background-color: #fff;
  border-radius: 12px 4px 12px 12px;
}

.group-item {
  line-height: 22px;
  font-size: 14px;
  width: 100%;
}

.group-send {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 13px 16px;
  border-radius: 8px;
  border: 1px solid #dfe3ec;
  background-color: #fff;
}

.send {
  cursor: pointer;
  transition: all 500ms ease;
  width: 30px;
  width: 30px;
}

.send:hover {
  transform: translateY(-3px);
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  overflow: hidden; /* Обрезает изображение, если оно выходит за пределы блока */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* Фон на случай, если изображение не загрузится */
  box-sizing: border-box;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block; /* Убирает лишние пробелы */
  border: none; /* Убирает возможные границы */
  padding: 0; /* Убирает возможные отступы */
  margin: 0;
}

.doc {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 500;
  font-size: 12px;
  line-height: 16.8px;
}

.size {
  color: #a7adbe;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
}

.doc-file {
  position: absolute;
  bottom: -60px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #f1f2f4;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
}

.doc-info {
  display: flex;
  flex-direction: column;
}

.doc-name {
  font-size: 12px;
  line-height: 16.4px;
  font-weight: 500;
  letter-spacing: 0em;
}

.doc-size {
  opacity: 70%;
  font-size: 10px;
  line-height: 16.8px;
  letter-spacing: 0em;
}

.doc-img {
  width: 24px;
  height: 24px;
}

.delete {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.left {
  width: 100%;
  display: flex;
  justify-content: start;
  padding-left: 20px;
}
</style>
