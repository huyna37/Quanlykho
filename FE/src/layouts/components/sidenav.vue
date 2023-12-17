<template>
    <div class="min-height-300 bg-primary position-absolute w-100"></div>
    <aside :style="{ transform: isShowNav ? 'none' : '' }"
        class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
        id="sidenav-main">
        <div class="sidenav-header">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true" id="iconSidenav"></i>
            <RouterLink class="fw-bold text-emphasis navbar-brand d-flex justify-content-center" to="/" target="_blank">
                Quản Lý Kho
            </RouterLink>
        </div>
        <hr class="horizontal dark mt-0">
        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main" v-if="listRoutesDashboard">
            <ul class="navbar-nav">
                <template v-for="route in areasPublic" v-bind:key="route">
                    <li class="nav-item" v-if="isShow(route.meta)">
                        <RouterLink class="nav-link " :to="isRequireAuth(route)" exact-active-class="active" @click="clickRedirect()">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="text-sm opacity-10" :class="route.meta.icon"></i>
                            </div>
                            <span class="nav-link-text ms-1">{{ route.meta.title }}</span>
                        </RouterLink>
                    </li>
                </template>

                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
                </li>
                <template v-if="isAuth">
                    <li class="nav-item" v-for="areaUser in areasUser" v-bind:key="areaUser.path">
                        <RouterLink class="nav-link" :to="areaUser.path" @click="clickRedirect()">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="text-sm opacity-10" :class="areaUser.meta.icon"></i>
                            </div>
                            <span class="nav-link-text ms-1">{{ areaUser.meta.title }}</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="isAuth">
                    <RouterLink class="nav-link " to="/auth">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-right-to-bracket text-warning text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Đăng Xuất</span>
                    </RouterLink>
                </li>
                </template>
                <li class="nav-item" v-if="!isAuth">
                    <RouterLink class="nav-link " to="/auth">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-right-to-bracket text-warning text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Đăng Nhập</span>
                    </RouterLink>
                </li>
                <li class="nav-item" v-if="!isAuth">
                    <RouterLink class="nav-link " to="/auth/signup">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-user-plus text-info text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Đăng Ký</span>
                    </RouterLink>
                </li>

                <li class="nav-item mt-3" v-if="isAuth && areasAdmin?.length != 0">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Admin pages</h6>
                </li>
                <template v-if="isAuth && areasAdmin?.length != 0">
                    <li class="nav-item" v-for="areaAdmin in areasAdmin" v-bind:key="areaAdmin.path">
                        <RouterLink class="nav-link" :to="areaAdmin.path" @click="clickRedirect()">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="text-sm opacity-10" :class="areaAdmin.meta.icon"></i>
                            </div>
                            <span class="nav-link-text ms-1">{{ areaAdmin.meta.title }}</span>
                        </RouterLink>
                    </li>
                </template>
            </ul>
        </div>
    </aside>
</template>
  
<script>
import { routerDashboard } from '@/routers';
import layout from '@/shared/mixins/layout';
import { RouterLink } from 'vue-router';
import { mapState } from 'vuex';


export default {
    name: "sideNav",
    components: { RouterLink },
    mixins: [layout],
    props: ['isShowNav'],
    emits: ['setIsShowNav'],
    data() {
        return {
            listRoutesDashboard: routerDashboard.children
        }
    },
    created() {
    },
    computed: {
        ...mapState({
            baseUrl: state => state.app.baseUrl,
            isAuth: state => state.app.isAuth,
            roles: state => state.app.roles
        }),
        areasUser() {
            return this.listRoutesDashboard.filter(x => x.meta?.area?.includes('user') && !x.meta?.role && !x.meta?.hidden);
        },
        areasAdmin() {
            return this.listRoutesDashboard.filter(x => x.meta?.area?.includes('admin') && this.roles?.includes(x.meta?.role));
        },
        showNotify() {
            return this.isShowOffer && sessionStorage.isClosed != 'true';
        },
        areasPublic() {
            return this.listRoutesDashboard.filter(x => !x.meta?.area && !x.meta?.requireAuth && !x.meta?.role);
        }
    },
    methods: {
        setIsShow(val) {
            this.$emit('setIsShowNav', val);
        },
        isShow(val) {
            if (val.area && val.area.includes('user')) {
                return false;
            }
            if (val.requireAuth && !this.isAuth) {
                return false;
            }
            const role = val.role;
            if (!role) return true;
            return this.roles && this.roles.includes(role);
        },
        isRequireAuth(route) {
            if (route && route.meta.requireAuth && !this.isAuth) {
                return "/auth";
            }
            return route.path;
        },
        clickRedirect() {
            this.setIsShow(false);
        }
    }
}
</script>
  
<style>
.img-thumbnail-logo {
    height: 60px;
}
#ofBar-content {
    display: inline;
    padding: 0 15px;
}

#ofBar {
    background: #fff;
    z-index: 999999999;
    font-size: 16px;
    color: #333;
    padding: 16px 40px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 40px;
    width: 80%;
    border-radius: 8px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 13px 27px -5px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%);
}

b {
    font-size: 15px !important;
}

#ofBar-right {
    display: flex;
    align-items: center;
}

#btn-bar {
    background-image: linear-gradient(310deg, #141727 0%, #3A416F 100%);
    color: #fff;
    border-radius: 4px;
    padding: 10px 20px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    font-size: 12px;
    opacity: .95;
    margin-right: 20px;
    box-shadow: 0 5px 10px -3px rgb(0 0 0 / 23%), 0 6px 10px -5px rgb(0 0 0 / 25%);
}

#btn-bar,
#btn-bar:hover,
#btn-bar:focus,
#btn-bar:active {
    text-decoration: none !important;
    color: #fff !important;
}

.pointer-hand {
    cursor: pointer;
}

</style>
  