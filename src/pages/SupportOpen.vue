<script>
export default {
  name: "SupportOpen",
  components: {},
  data() {
    return {};
  },
  methods: {
    goBack() {
      try {
        this.$router.go(-1);
      } catch (err) {
        console.log(err);
        messageStore.message = err.response.data.detail;
        setTimeout(() => {
          messageStore.message = "";
        }, 5000);
      }
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <h1>Support</h1>
    <div class="wrap-back" @click="goBack()">
      <img src="../assets/arrow-left.svg" alt="" />
      <span>Back</span>
    </div>
    <div class="card">
      <h2>How do I disable chat history and model training? [Web]</h2>
      <div class="desc">
        If you switch this option to "disabled", the new messages will not be
        used to train and improve our models. New messages will also not be
        displayed in the history sidebar. Please note that this setting is not
        synchronized between browsers or devices. You will have to disable the
        history on each device. Learn more about data control. Note: To track
        cases of abuse, we store all messages for 30 days before permanently
        deleting them.
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
}
.wrap-back {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.wrap-back img {
  height: 20px;
  width: 20px;
}

.wrap-back span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: #8c93a6;
}

.card {
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border: 1px solid rgba(115, 122, 140, 0.1);
  border-radius: 10px;
}

h2 {
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #14171f;
}

.desc {
  font-size: 16px;
  line-height: 24px;
  color: #262d40;
}
</style>
