<template>
  <div class="auth-wrapper">
    <div class="auth-form">
      <div class="tabs">
        <div
          class="tab"
          :class="{
            'active' : type === 'auth'
          }"
          @click="type='auth'">
          Вход
        </div>
        <div
          class="tab"
          :class="{
            'active' : type !== 'auth'
          }"
          @click="type='registration'">
          Регистрация
        </div>
      </div>
      <keep-alive v-if="type==='auth'">
        <login-form />
      </keep-alive>
      <keep-alive v-else>
        <registration-form />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
export default {
  name: "Auth",
  components: {
    LoginForm,
    RegistrationForm,
  },
  data() {
    return {
      type: "auth",
    };
  },
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .auth-form {
    display: flex;
    flex-direction: column;
    padding: 15px 15px;
    width: 100%;
    max-width: 500px;
    background: #646464;
    border: 1px solid #9c9c9c;
    border-radius: 10px 10px 0  0;
    border-top: 0;
    .tabs {
      display: flex;
      justify-content: space-between;
      margin: -15px -15px 15px;
      .tab {
        cursor: pointer;
        border-right: 1px solid #9c9c9c;
        border-bottom: 1px solid #9c9c9c;
        border-top: 1px solid #9c9c9c;
        flex-basis: 50%;
        text-align: center;
        font-size: 20px;
        padding: 10px 10px;
        border-radius: 10px 10px 0  0;
        &:last-child {
          border-right: 0;
          border-left: 1px solid #9c9c9c;
          border-radius: 10px 10px 0  0;
        }
        &.active {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
