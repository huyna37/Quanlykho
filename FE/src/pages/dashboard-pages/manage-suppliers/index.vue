<template>
    <div class="card mb-4">
        <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Danh sách Nhà Cung Cấp :</h6>
            <button class="btn" data-bs-toggle="modal" data-bs-target="#supplierModal">Tạo mới</button>
        </div>
        <div class="card">
            <div>
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                                STT</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Tên</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Địa Chỉ</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Số Điện Thoại</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Mô Tả</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Ngày Tạo </th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Người Cập Nhật</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Quản Lý</th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-if="data?.length === 0">
                            <td valign="top" colspan="8"
                                class="text-center pb-3 pt-3 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Không có data!!
                            </td>
                        </template>
                        <tr v-for="(value, index) in data" v-bind:key="value._id">
                            <td class="align-middle text-center text-sm">
                                <span class="text-secondary text-sm fw-bold">{{ index + 1 }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.name }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.address }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.phone }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold d-flex align-items-center justify-content-center overflow-hidden" style="width: 15vh;">{{ value.description }}</span>
                            </td>
                            <td class="align-middle text-center text-sm text-secondary">
                                {{ value.createAt?.formatDate("DD/MM/YYYY") }}
                            </td>
                            <td class="align-middle text-center text-sm text-secondary">
                                {{ value.updatedBy?.formatDate("DD/MM/YYYY") }}
                            </td>
                            <td class="align-middle text-center dropdown" @click="view(value)">
                                <button :id="'dropdownMenuButton-' + value._id"
                                    class="text-secondary text-xs fw-bold btn m-1" data-bs-toggle="dropdown"
                                    aria-expanded="false">Thông tin</button>
                                <ul class="dropdown-menu dropdown-menu-vps"
                                    :aria-labelledby="'dropdownMenuButton-' + value._id">
                                    <li class="cursor-pointer">
                                        <div class="dropdown-item" data-bs-toggle="modal" data-bs-target="#supplierEditModal">Update</div>
                                    </li>
                                    <li class="cursor-pointer">
                                        <div class="dropdown-item" @click="remove(value._id)">Xoá</div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Paginate @page-change="updatePaginate" :currentPage="pageIndex" :totalPages="totalPages" />
            </div>
        </div>
        <create @create="getPaginate" />
        <edit @create="getPaginate" :selected="selectedValue" v-if="selectedValue"/>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import swal from 'sweetalert';
import instance from '@/Unilities/axios';
import create from './create.vue';
import edit from './create.vue';
import Paginate from '@/shared/paginate.vue';
export default {
    name: "manage-suppliers",
    data() {
        return {
            data: '',
            pageIndex: 1,
            limit: 10,
            totalPages: 1,
            selectedValue: null
        }
    },
    computed: {
        ...mapState({
            baseUrl: state => state.app.baseUrl,
            isAuth: state => state.app.isAuth,
            roles: state => state.app.roles,
            user: state => state.app.user
        }),
    },
    components: {
        Paginate,
        create,
        edit
    },
    created() {
        this.getPaginate();
    },
    methods: {
        view(user) {
            this.selectedValue = user;
        },
        async remove(userId) {
            swal({
                title: "Xóa bản ghi này?",
                text: "Bạn muốn xóa bản ghi này không?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async next => {
                    if (next) {
                        await instance.delete(`suppliers/${userId}`);
                        swal('yup', 'Xóa Thành Công', 'success');
                        await this.getPaginate();
                    }
                });
        },
        async getPaginate() {
            const self = this;
            const baseUrl = `suppliers/${self.pageIndex}/${self.limit}`;
            const result = await instance.get(baseUrl);
            self.data = result.data.result.data;
            self.totalPages = Math.ceil(result.data.result.totalItems / self.limit);
        },
        async updatePaginate(event) {
            this.pageIndex = event;
            await this.getPaginate();
        }
    }
}
</script>