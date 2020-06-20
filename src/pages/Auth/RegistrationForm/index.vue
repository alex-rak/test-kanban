<template>
  <form
    class="registration-form"
    @submit.prevent="registration">
    <v-input
      v-model="login"
      :error-message="loginErrorMessage"
      placeholder="Login"
      label="Придумайте имя пользователя" />
    <v-input
      v-model="email"
      placeholder="Email"
      label="Введите Email(Поле не обязательно)" />
    <v-input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :error-message="passwordErrorMessage"
      placeholder="Password"
      label="Придумайте пароль">
      <template v-slot:append-icon>
        <img
          :src="iconPath"
          @click="showPassword = !showPassword">
      </template>
    </v-input>
    <div class="buttons">
      <v-button @click="registration">
        Зарегестрироваться
      </v-button>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "RegistrationForm",
  data() {
    return {
      showPassword: false,
      login: "",
      password: "",
      passwordErrorMessage: "",
      loginErrorMessage: "",
      email: "",
    };
  },
  computed: {
    iconPath() {
      return this.showPassword ? require("@/statics/eye.svg") : require("@/statics/close-eye.svg");
    },
    validLogin() {
      return this.login.length > 0;
    },
    validPassword() {
      const pattern = /(?=.*[0-9])(?=.*[a-zа-я])[0-9a-zA-ZА-Яа-я]{8,}/;
      return this.password.length > 7 && pattern.test(this.password);
    },
    validEmail() {
      const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return this.password.length > 7 && pattern.test(this.password);
    },
    user() {
      return {
        username: this.login,
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    ...mapActions("users", [
      "USER_REGISTRATION",
    ]),
    ...mapMutations("users", [
      "setToken",
    ]),
    async registration() {
      if (!this.validLogin) {
        this.loginErrorMessage = "Логин должен состоять хотя бы из одного символа";
      }
      if (!this.validPassword) {
        this.passwordErrorMessage = "Пароль должен состоять минимум из 8 символов, содержать минимум 1 букву и 1 цифру";
      }
      if (this.validLogin && this.validPassword) {
        this.passwordErrorMessage = "";
        this.loginErrorMessage = "";
        const response = await this.USER_REGISTRATION(this.user);
        if (response.data.token) {
          window.location = "/";
        } else {
          this.loginErrorMessage = response.data?.username ? response.data.username[0] : "";
          this.passwordErrorMessage = response.data?.password ? response.data.password[0] : "";
          this.password = "";
        }
      }
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
