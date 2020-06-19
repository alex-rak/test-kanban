<template>
  <form class="login-form">
    <v-input
      v-model="login"
      label="Введите имя пользователя" />
    <v-input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :error-message="errorMessage"
      label="Введите пароль">
      <template v-slot:append-icon>
        <img
          :src="iconPath"
          @click="showPassword = !showPassword">
      </template>
    </v-input>
    <div class="buttons">
      <v-button>Войти</v-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      showPassword: false,
      login: "",
      password: "",
      errorMessage: "",
    };
  },
  computed: {
    iconPath() {
      return this.showPassword ? require("@/statics/eye.svg") : require("@/statics/close-eye.svg");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
