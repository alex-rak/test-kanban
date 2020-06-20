<template>
  <form
    class="login-form"
    @submit.prevent="auth">
    <v-input
      v-model="login"
      placeholder="Login"
      :error-message="loginErrorMessage"
      label="Введите имя пользователя" />
    <v-input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :error-message="passwordErrorMessage"
      placeholder="Password"
      label="Введите пароль">
      <template v-slot:append-icon>
        <img
          :src="iconPath"
          @click="showPassword = !showPassword">
      </template>
    </v-input>
    <div class="buttons">
      <v-button @click="auth">
        Войти
      </v-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      showPassword: false,
      login: "",
      password: "",
      passwordErrorMessage: "",
      loginErrorMessage: "",
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
    user() {
      return {
        username: this.login,
        password: this.password,
      };
    },
  },
  methods: {
    ...mapActions("users", ([
      "USER_AUTHORIZATION",
    ])),
    async auth() {
      if (!this.validLogin) {
        this.loginErrorMessage = "Логин должен состоять хотя бы из одного символа";
      }
      if (!this.validPassword) {
        this.passwordErrorMessage = "Пароль должен состоять минимум из 8 символов, содержать минимум 1 букву и 1 цифру";
      }
      if (this.validLogin && this.validPassword) {
        this.passwordErrorMessage = "";
        this.loginErrorMessage = "";
        const response = await this.USER_AUTHORIZATION(this.user);
        if (response.data.token) {
          window.location = "/";
        } else if (response.data.non_field_errors) {
          this.passwordErrorMessage = response.data.non_field_errors[0];
          this.password = "";
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
.login-form {
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
