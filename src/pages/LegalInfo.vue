<script>
export default {
  name: "LegalInfo",
  components: {},
  data() {
    return {
      cards: [
        {
          id: 1,
          title: "Terms of Use",
        },
        {
          id: 2,
          title: "Privacy Policy",
        },
        {
          id: 3,
          title: "Data Processing Addendum",
        },
        {
          id: 4,
          title: "Our Approach to Patents",
        },
        {
          id: 5,
          title: "Business Terms of Use",
        },
        {
          id: 6,
          title: "Corporate Privacy",
        },
      ],
    };
  },
  methods: {
    open(id) {
      try {
        this.$router.push({ name: "supportOpen", query: { id } });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <h1>Legal Information</h1>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Search" />
      <button class="btn">Find</button>
    </div>
    <div class="cards">
      <div
        class="card"
        v-for="card in cards"
        :key="card.id"
        @click="open(card.id)"
      >
        <h2 class="card-title">{{ card.title }}</h2>
        <img src="../assets/arrow-right.svg" alt="" />
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

.wrap-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrap-title span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  text-decoration: underline;
  color: #8c93a6;
}

.actions {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-img {
  position: absolute;
  left: 16px;
}

.search {
  width: 95%;
  border-radius: 8px;
  border: 1px solid #dfe3ec;
  background-color: #fff;
  padding: 12px 16px 12px 46px;
}

.search::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8c93a6;
}

.btn {
  border-radius: 8px;
  padding: 14.5px 20px;
  background-color: #005eff;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
}

.cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 500ms ease;
  border: 1px solid #fff;
}

.card:hover {
  border: 1px solid #dfe3ec;
}

.card-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #14171f;
}

.card-desc {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #262d40;
}

.more {
  width: 30px;
  cursor: pointer;
  padding: 5px;
}
</style>
