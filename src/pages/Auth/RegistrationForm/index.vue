<template>
  <form class="registration-form">
    <v-input
      v-model="login"
      label="Придумайте имя пользователя" />
    <v-input
      v-model="email"
      label="Введите Email(Поле не обязательно)" />
    <v-input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :error-message="errorMessage"
      label="Придумайте пароль">
      <template v-slot:append-icon>
        <img
          :src="iconPath"
          @click="showPassword = !showPassword">
      </template>
    </v-input>
    <div class="buttons">
      <v-button>Зарегестрироваться</v-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegistrationForm",
  data() {
    return {
      showPassword: false,
      login: "",
      password: "",
      errorMessage: "",
      email: "",
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
.registration-form {
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
