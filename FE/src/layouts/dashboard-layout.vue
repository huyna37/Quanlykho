<template>
    <div class="g-sidenav-show bg-gray-100">
        <sidenav :isShowNav="isShowNav" @setIsShowNav="setIsShowNav" />
        <main class="main-content position-relative border-radius-lg ">
            <navBarMain :isShowNav="isShowNav" @setIsShowNav="setIsShowNav" />
            <div class="container-fluid py-4">
                <router-view></router-view>
                <footerLayout />
            </div>
        </main>
    </div>
</template>
  
<script>

import sidenav from './components/sidenav.vue'
import navBarMain from './components/navbar.vue'
import { useCookies } from 'vue3-cookies';
import store from '@/store/store';
import footerLayout from './components/footer.vue';
import $ from "jquery";

export default {
    name: 'App',
    components: {
        sidenav,
        navBarMain,
        footerLayout,
    },
    data() {
        return {
            cookies: useCookies().cookies,
            isShowNav: false
        }
    },
    async created() {
        const user = this.cookies.get('user');
        if (user && user != "undefined") {
            store.dispatch('app/setAuth', !!user);
            store.dispatch('app/setUser');
        }
        this.onResize();
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    methods: {
        setIsShowNav(val) {
            this.isShowNav = val;
        },
        onResize() {
            let windowsize = $(window)?.width();
            if (windowsize <= 769) {
                store.dispatch('app/setIsMobileDevice', true);
            }
            else {
                store.dispatch('app/setIsMobileDevice', false);
            }
        },
    }

}
</script>
  
<style></style>
  