<script>
export default {
  name: "DocPanel",
  components: {},
  data() {
    return {
      docs: [
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: true,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
        {
          id: 1,
          name: "Deal Panel",
          version: "3.10",
          active: false,
        },
      ],
      isLoading: false,
      more: false,
    };
  },
  methods: {
    scrollRight() {
      const docsContainer = this.$refs.docs;
      docsContainer.scrollBy({
        left: 250, // Прокрутка вправо
        behavior: "smooth", // Плавная прокрутка
      });
    },
    scrollLeft() {
      const docsContainer = this.$refs.docs;
      docsContainer.scrollBy({
        left: -250, // Прокрутка влево
        behavior: "smooth", // Плавная прокрутка
      });
    },
  },
  mounted() {},
};
</script>

<template>
  <div class="panel-docs">
    <div class="docs" ref="docs">
      <div
        class="doc"
        v-for="item in docs"
        :key="item.id"
        :class="{ active: item.active }"
      >
        <img
          src="../../assets/document-text-active.svg"
          v-if="item.active"
          alt=""
        />
        <img src="../../assets/document-text.svg" v-if="!item.active" alt="" />
        <div class="info">
          <span class="name" :class="{ blue: item.active }">{{
            item.name
          }}</span>
          <span class="version" :class="{ blue: item.active }"
            >V{{ item.version }}</span
          >
        </div>
      </div>
    </div>
    <div class="panel-actions">
      <img @click="scrollLeft" src="../../assets/arrow-left-panel.svg" alt="" />
      <img
        @click="scrollRight"
        src="../../assets/arrow-right-panel.svg"
        alt=""
      />
      <div class="more">
        <img @click="more = !more" src="../../assets/more.svg" alt="" />
        <div class="options" v-if="more">
          <button>Deal Panel History</button>
          <button>Document’s</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-docs {
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-left: 1px solid rgba(115, 122, 140, 0.1);
}

.docs::-webkit-scrollbar {
  display: none; /* Для Chrome, Safari и Opera */
}

.docs {
  width: 90%;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-y: hidden;
  overflow-x: scroll;
}

.doc {
  min-width: 103px;
  display: flex;
  gap: 5px;
  background-color: #f8f9fc;
  border-radius: 10px;
  padding: 10px;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #8c93a6;
}

.version {
  font-weight: 500;
  font-size: 8px;
  line-height: 11.2px;
  color: #8c93a6;
}

.blue {
  color: #005eff !important;
}

.active {
  background-color: #e6eefe;
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

img:hover {
  cursor: pointer;
}

.more {
  padding: 5px;
  position: relative;
  cursor: pointer;
}

.options {
  width: 170px;
  position: absolute;
  right: 5%;
  top: 30px;
  padding: 5px 6px;
  border-radius: 8px;
  border: 1px solid rgba(223, 227, 236, 1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
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
</style>
