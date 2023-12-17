<template>
  <main class="main-content  mt-0">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
              <div class="card card-plain">
                <div class="card-header pb-0 text-start">
                  <h4 class="font-weight-bolder">Đăng Nhập</h4>
                  <p class="mb-0">Nhập Tài Khoản và Mật khẩu Để Đăng Nhập</p>
                </div>
                <div class="card-body">
                  <form role="form" v-on:submit.prevent="signIn">
                    <div class="mb-3">
                      <input v-model="email" type="text" autofocus class="form-control form-control-lg" required placeholder="Tài Khoản">
                    </div>
                    <div class="mb-3">
                      <input v-model="password" type="password" required placeholder="Mật Khẩu" class="form-control form-control-lg">
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="rememberMe">
                      <label class="form-check-label" for="rememberMe">Remember me</label>
                    </div>
                    <div class="text-center">
                      <button type="submit" rou class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Đăng Nhập</button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-lg-2 px-1">
                  <p class="mb-4 text-sm mx-auto">
                    Don't have an account?
                    <RouterLink to="/auth/signup" class="text-primary text-gradient font-weight-bold">Đăng Ký
                    </RouterLink>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                            background-size: cover;">
                <span class="mask bg-gradient-primary opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">Cuộc Đời Là Những Cuộc Vui</h4>
                <p class="text-white position-relative">Trải Nghiệm Và Thưởng Thức.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
  
<script>
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies'
import instance from '@/Unilities/axios';

export default {
  name: "sign-in",
  components: { RouterLink },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  methods: {
    async signIn() {
      const self = this;
      const baseUrl = "users/login";
      const data = {
        name: self.email,
        password: self.password
      }
      var result = await instance.post(baseUrl, data);
      if (result.data) {
        self.cookies.set("access_token", result.data.token);
        self.cookies.set("user", JSON.stringify(result.data));
        self.$router.push({ path: '/' });
      }
    }
  }
}
</script>
  
<style></style>
  