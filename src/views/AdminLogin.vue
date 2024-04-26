<template>
  <div class="admin-login">
    <div class="bgdark"></div>
    <h2>BUENAVISTA, GUIMARAS</h2>
    <h1>PUBLIC CEMETERY MANAGEMENT SYSTEM</h1>
    <h3><i>(OLD POBLACION | EAST VALENCIA | BANBAN CEMETERY)</i></h3>

    <div style="margin-top: 70px; width: 30%">
      <form @submit.prevent="login">
        <div>
          <label for="email" class="title-field">Email</label>
          <input
            type="email"
            v-model="state.email"
            style="border-color: #fff !important" />
        </div>
        <div style="margin-top: 30px">
          <label for="password" class="title-field">Password</label>
          <input
            type="password"
            v-model="state.password"
            style="border-color: #fff !important" />
        </div>
        <div style="margin-top: 30px">
          <button class="button primary" type="submit" style="width: 100%">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import axios from "@/plugins/API";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
  email: "",
  password: "",
});

const login = async () => {
  const res = await axios.post("/login", state);
  if (res.status === 200) {
    localStorage.setItem("user.auth", JSON.stringify(res.data.user));
    router.push("/dashboard");
  }
};
</script>
<style>
.admin-login h1,
.admin-login h2,
.admin-login h3 {
  text-shadow: 0 0 3px #000;
}
.admin-login {
  position: relative;
  background-image: url("/src/assets/images/buenavista.jpg");
  height: 100vh;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.admin-login .bgdark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
}
.title-field {
  text-shadow: 0 0 3px #000;
}
</style>
