<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header pb-0 d-flex justify-content-between">
                    <h6>Quản Lý Người Dùng</h6>
                    <button class="btn" data-bs-toggle="modal" data-bs-target="#userModal">Tạo mới</button>
                </div>
                <div class="card">
                    <div>
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                                        UserName</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                        Password</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                        Vai Trò</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        CreateAt</th>
                                    <th class="text-secondary opacity-7 text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="users?.length === 0">
                                    <td valign="top" colspan="8"
                                        class="text-center pb-3 pt-3 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Không có data!!
                                    </td>
                                </template>
                                <tr v-for="user in users" v-bind:key="user._id">
                                    <td class="align-middle text-center text-sm">
                                        <span class="text-secondary text-xs font-weight-bold">{{ user.userName }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">{{ user.password }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">{{ user.role }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">{{
                                            user.createAt.formatDate('DD/MM/YYYY') }}</span>
                                    </td>
                                    <td class="align-middle text-center dropdown">
                                        <button :id="'dropdownMenuButton-' + user._id"
                                            class="text-secondary text-xs font-weight-bold btn m-1"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            Thông tin
                                        </button>
                                        <ul class="dropdown-menu" :aria-labelledby="'dropdownMenuButton-' + user._id">
                                            <li>
                                                <div class="dropdown-item" @click="removeUser(user._id)">Xóa</div>
                                            </li>
                                        </ul>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <Paginate @page-change="updatePaginate" :currentPage="pageIndex" :totalPages="totalPages" />
                    </div>
                    <create @create="getUserPaginate"/>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';
import Paginate from '@/shared/paginate.vue';
import swal from 'sweetalert';
import instance from '@/Unilities/axios';
import create from './create.vue'

export default {
    name: 'manageUsers',
    data() {
        return {
            users: '',
            pageIndex: 1,
            limit: 10,
            totalPages: 1,
            selectedValue: []
        }
    },
    components: {
        Paginate,
        create
    },
    created() {
        this.getUserPaginate();
    },
    computed: {
        ...mapState({
            baseUrl: state => state.app.baseUrl
        })
    },
    methods: {
        viewUser(user) {
            this.selectedValue = user;
        },
        async removeUser(userId) {
            swal({
                title: "Xóa người dùng này?",
                text: "Bạn muốn xóa người dùng này không?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async next => {
                    if (next) {
                        await instance.delete(`users/${userId}`);
                        swal('yup', 'Xóa Thành Công', 'success');
                        await this.getUserPaginate();
                    }
                });
        },
        async getUserPaginate() {
            const self = this;
            const baseUrl = `users/${self.pageIndex}/${self.limit}`;
            const result = await instance.get(baseUrl);
            self.users = result.data.result.data;
            self.totalPages = Math.ceil(result.data.result.totalItems / self.limit);
        },
        async updatePaginate(event) {
            this.pageIndex = event;
            await this.getUserPaginate();
        }
    }
}
</script>
  
<style></style>
  