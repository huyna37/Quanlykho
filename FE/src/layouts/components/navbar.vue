<template>
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb" class="breadcumb">
                <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" @click="setIsShow(!isShowNav)" href="javascript:;">Pages</a></li>
                    <li class="breadcrumb-item text-sm text-white active" aria-current="page">{{ title }}</li>
                </ol>
                <h6 class="font-weight-bolder text-white mb-0">{{ title }}</h6>
            </nav>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 row" id="navbar">
                <div class="col-xs-10 ms-md-auto pe-md-3 d-flex text-white avatarClass" v-if="isAuth">
                    <div class="me-3 info-user">
                        <div>
                            <i class="fa-solid fa-robot" style="margin-left:-2px"></i>
                            <span> Xin Chào: <b class="fs-5">{{ user?.name }}</b></span>
                        </div>
                        <div>
                            <i class="fa-solid fa-coins"></i>
                            Số Dư: {{ new Intl.NumberFormat().format(user?.amount ?? 0) }} VNĐ
                        </div>
                    </div>
                    <div class="btn-group dropstar cursor-pointer">
                        <img id="avatar" data-bs-toggle="dropdown" aria-expanded="false"
                            src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg" style="height: 50px;border-radius: 18px;" />
                        <ul class="dropdown-menu mt-2" aria-labelledby="avatar">
                            <li>
                                <RouterLink class="dropdown-item" to="quan-ly-trang-ca-nhan">Trang Cá Nhân</RouterLink>
                            </li>
                            <li>
                                <div class="dropdown-item" data-bs-toggle="modal" data-bs-target="#transferMoney" id="transferButton">Chuyển Tiền Nhanh</div>
                            </li>
                            <li>
                                <RouterLink class="dropdown-item" to="auth">Đăng Xuất</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul class="navbar-nav" v-if="!isAuth">
                    <li class="nav-item d-flex align-items-center">
                        <RouterLink to="/auth" class="nav-link text-white font-weight-bold px-0">
                            <i class="fa fa-user me-sm-1"></i>
                            <span class="d-sm-inline">Đăng Nhập</span>
                        </RouterLink>
                    </li>
                </ul>
                <ul class="p-0 m-0 col-xs-2 justify-content-end d-flex" v-if="isMobileDeviceXL || isMobileDeviceXS" @click="setIsShow(!isShowNav)">
                    <li class="nav-item col-xs-2 d-xl-none d-flex justify-content-end icon-collape p-0 cursor-pointer">
                        <div class="nav-link text-white p-0" id="iconNavbarSidenav">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
</template>
  
<script>
import { mapState } from 'vuex';
import layout from '@/shared/mixins/layout';

export default {
    name: 'navBarMain',
    props: ['isShowNav'],
    mixins: [layout],
    components: {
    },
    emits: ['setIsShowNav'],
    computed: {
        ...mapState({
            baseUrl: state => state.app.baseUrl,
            isAuth: state => state.app.isAuth,
            user: state => state.app.user,
            title: state => state.app.titleCurrent
        })
    },
    data() {
        return {
        }
    },
    methods: {
        setIsShow(val) {
            this.$emit('setIsShowNav', val);
        }
    }
}
</script>
  
<style>
.avatarClass {
    justify-content: end;
}

.dropdown-menu {
    right: 0px;
    left: unset !important;
}

.navbar-nav {
    justify-content: end;
}

@media (max-width: 1200px) {
    .breadcumb {
        display: none;
    }

    .avatarClass {
        justify-content: start;
        padding-left: 0;
    }

    .collapse {
        margin-top: 5px !important;
    }
    .navbar-nav {
        justify-content: start;
        width: 87% !important;
    }
    .col-xs-2 {
        width: 12.22222%;
    }
    .fa-user {
        margin-right: 3px;
    }
    .col-xs-10 {
        width: 87%;
    }
    .dropdown-menu {
        right: unset;
    }
}

@media (max-width: 576px) {
    
}

@media (max-width:400px) {
    .info-user {
        display: none;
    }
}
</style>
  