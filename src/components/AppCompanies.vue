<script>
export default {
  name: "AppCompanies",
  components: {},
  data() {
    return {
      cards: [
        {
          id: 1,
          name: "Name company/user",
          type: "Individual Entrepreneur",
          contacts: "mail@gmail.com",
          more: false,
        },
        {
          id: 2,
          name: "Name company/user",
          type: "Individual Entrepreneur",
          contacts: "mail@gmail.com",
          more: false,
        },
        {
          id: 3,
          name: "Name company/user",
          type: "Individual Entrepreneur",
          contacts: "mail@gmail.com",
          more: false,
        },
        {
          id: 4,
          name: "Name company/user",
          type: "Individual Entrepreneur",
          contacts: "mail@gmail.com",
          more: false,
        },
        {
          id: 5,
          name: "Name company/user",
          type: "Individual Entrepreneur",
          contacts: "mail@gmail.com",
          more: false,
        },
      ],
    };
  },
  methods: {},
};
</script>
<template>
  <div class="fields">
    <span>Name</span>
    <span>Type</span>
    <span>Contacts</span>
    <span class="options-field"></span>
  </div>
  <div class="cards">
    <div class="card" v-for="card in cards" :key="card.id">
      <div class="wrap-card-item">
        <span class="card-item">Name:</span>
        <span class="card-value">{{ card.name }}</span>
      </div>
      <div class="wrap-card-item">
        <span class="card-item">Type:</span>
        <span class="card-value">{{ card.type }}</span>
      </div>
      <div class="wrap-card-item">
        <span class="card-item">Contacts:</span>
        <span class="card-value">{{ card.contacts }}</span>
      </div>
      <div class="more">
        <img @click="card.more = !card.more" src="../assets/more.svg" alt="" />
      </div>
      <div class="options" v-if="card.more">
        <button>Edit</button>
        <button class="delete">Delete</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.fields span {
  width: 25%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(140, 147, 166, 1);
}
.cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrap-card-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-item {
  display: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(140, 147, 166, 1);
}
.card-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(20, 23, 31, 1);
}

.wrap-card-item {
  width: 25%;
}

.more {
  width: 30px;
  cursor: pointer;
  padding: 5px;
}

.options-field {
  width: 30px !important;
}

.options {
  width: 108px;
  position: absolute;
  right: 20px;
  top: 50px;
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

.delete {
  color: rgba(223, 58, 68, 1) !important;
}

@media (max-width: 550px) {
  .fields {
    display: none;
  }

  .card {
    flex-direction: column;
    gap: 10px;
    align-items: start;
    position: relative;
  }

  .wrap-card-item {
    width: 100%;
  }

  .card-item {
    display: block;
  }

  .more {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
