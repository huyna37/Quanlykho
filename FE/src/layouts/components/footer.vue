<template>
    <footer class="footer pt-3">
        <div class="container-fluid">
            <div class="row align-items-center justify-content-lg-between">
                <div class="col-lg-6 mb-lg-0 mb-4">
                    <div class="copyright text-center text-sm text-muted text-lg-start">
                        Today: {{ new Date().toString().formatDate('DD/MM/YYYY') }},
                        Phát triển <i class="fa fa-heart" aria-hidden="true"></i> bởi
                        <a href="https://meoden.online" class="font-weight-bold">Mèo Đen | Meoden.Online</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                        <li class="nav-item">
                            <a data-bs-toggle="modal" data-bs-target="#ZaloInfo" href="#" class="nav-link text-muted">Facebook</a>
                        </li>
                        <li class="nav-item">
                            <a data-bs-toggle="modal" data-bs-target="#ZaloInfo" href="#"  class="nav-link text-muted">Zalo</a>
                        </li>
                        <li class="nav-item">
                            <a data-bs-toggle="modal" data-bs-target="#ZaloInfo" href="#" class="nav-link pe-0 text-muted">License</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script>
import { mapState } from 'vuex';
import layout from '@/shared/mixins/layout';

export default {
    name: "footer-layout",
    mixins: [layout],
    computed: {
        ...mapState({
            baseUrl: state => state.app.baseUrl,
            isAuth: state => state.app.isAuth,
            user: state => state.app.user,
            title: state => state.app.titleCurrent,
            env: state => state.app.env
        })
    },
    data() {
        return {};
    },
}
</script>
  
<style></style>
  