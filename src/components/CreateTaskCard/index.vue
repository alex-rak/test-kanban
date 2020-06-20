<template>
  <div
    v-if="!visibleForm"
    class="create-button"
    @click="toggle">
    <img
      class="create-button__icon"
      src="@/statics/plus-icon.svg">
    <div class="create-button__text">
      Добавить карточку
    </div>
  </div>
  <div
    v-else
    class="create-form">
    <textarea
      ref="textarea"
      v-model="cardTitle"
      placeholder="Ввести заголовок для этой карточки"
      @input="autosize" />
    <div class="buttons">
      <button @click="createCard">
        Добавить карточку
      </button>
      <span @click="remove">
        <img src="@/statics/remove-icon.svg">
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateTaskCard",
  props: {
    row: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      visibleForm: false,
      cardTitle: "",
    };
  },
  methods: {
    ...mapActions("cards", [
      "CREATE_CARD",
    ]),
    async toggle() {
      this.visibleForm = true;
    },
    remove() {
      this.visibleForm = false;
      this.cardTitle = "";
    },
    async createCard() {
      if (this.cardTitle.length > 0) {
        const res = await this.CREATE_CARD({
          row: this.row,
          text: this.cardTitle,
        });
        if (res.status === 201) {
          this.visibleForm = false;
          this.cardTitle = "";
        } else if (res.status === 401) {
          window.localStorage.removeItem("token");
          window.location = "/auth";
          window.alert("Срок атворизации кончился, выполните вход");
        }
      }
    },
    autosize() {
      const el = this.$refs.textarea;
      setImmediate(() => {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.create-button {
  margin-top: 10px;
  padding: 10px 10px;
  display: flex;
  color: #9e9e9e;
  &:hover {
    transition: 0.5s;
    background: #27272D;
  }
  img {
    height: 20px;
    width: 20px;
  }
  &__text {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
}
.create-form {
  margin: 10px;
  textarea {
    color: #B3B4B7;
    padding: 5px 5px;
    min-height: 100px;
    resize: none;
    width: 100%;
    border-radius: 0px;
    outline: none;
    border: none;
    background: #515051;
    overflow: hidden;
    &::placeholder {
      color: #888888;
    }
  }
  .buttons {
    margin: 10px 0;
    display: flex;
    button {
      background: #606164;
      border: none;
      color: #B3B4B7;
      height: 30px;
      padding: 0 25px;

      &:focus {
        border: none;
        outline: none;
      }

      &:hover {
        transition: 0.3s;
        background: #494949;
        border: none;
        outline: none;
      }

      &:active {
        transition: 0.3s;
        border: none;
        outline: none;
        background: #383838;
      }
    }
    span {
      display: flex;
      align-items: center;
      margin-left: 20px;
      cursor: pointer;
      img {
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
