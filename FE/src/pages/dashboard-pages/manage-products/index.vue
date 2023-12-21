<template>
    <div class="card mb-4">
        <div class="card-header pb-0 d-flex justify-content-between">
            <h6>Danh sách Sản Phẩm :</h6>
            <button class="btn" data-bs-toggle="modal" data-bs-target="#productModal">Tạo mới</button>
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
                                Mô Tả</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Số Lượng</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Giá Nhập</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Giá Bán</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Nhà Cung Cấp</th>
                            <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">
                                Thể Loại</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Ngày Tạo </th>
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
                                <span class="text-secondary text-sm fw-bold">{{ value.description }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.amount }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.priceInput }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.priceOutput }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.supplier.name }}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-sm fw-bold">{{ value.category.name }}</span>
                            </td>
                            <td class="align-middle text-center text-sm text-secondary">
                                {{ value.createAt.formatDate("DD/MM/YYYY") }}
                            </td>
                            <td class="align-middle text-center dropdown" @click="view(value)">
                                <button :id="'dropdownMenuButton-' + value._id"
                                    class="text-secondary text-xs fw-bold btn m-1" data-bs-toggle="dropdown"
                                    aria-expanded="false">Thông tin</button>
                                <ul class="dropdown-menu dropdown-menu-vps"
                                    :aria-labelledby="'dropdownMenuButton-' + value._id">
                                    <li class="cursor-pointer">
                                        <div class="dropdown-item" data-bs-toggle="modal" data-bs-target="#productEditModal">Update</div>
                                    </li>
                                    <li class="cursor-pointer">
                                        <div class="dropdown-item" @click="remove(value)">Xoá</div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Paginate @page-change="updatePaginate" :currentPage="pageIndex" :totalPages="totalPages" />
            </div>
        </div>
        <Create @create="getPaginate" />
    </div>
</template>
<script>
import { mapState } from 'vuex';
import swal from 'sweetalert';
import instance from '@/Unilities/axios';
import { commonMessage } from '@/Unilities/common';
import Create from './create.vue';
import Paginate from '@/shared/paginate.vue';
export default {
    name: "manage-products",
    data() {
        return {
            data: [],
            selectedValue: null,
            totalPages: 0,
            pageIndex: 0,
            limit: 10
        };
    },
    computed: {
        ...mapState({
            baseUrl: state => state.app.baseUrl,
            isAuth: state => state.app.isAuth,
            roles: state => state.app.roles,
            user: state => state.app.user
        }),
    },
    async created() {
        await this.getPaginate();
    },
    methods: {
        view(user) {
            this.selectedValue = user;
        },
        async remove(value) {
            try {
                await instance.delete("products/" + value._id);
                await this.getPaginate();
            }
            catch (ex) {
                if (ex.response?.data?.message != "jwt expired") {
                    swal("Oops!", ex.response?.data?.message, "error");
                }
                if (!ex?.response) {
                    swal(commonMessage);
                }
            }
        },
        async getPaginate() {
            try {
                const baseUrl = `products/${this.pageIndex}/${this.limit}`;
                const result = await instance.get(baseUrl);
                this.data = result.data.result.data;
                this.totalPages = Math.ceil(result.data.result.totalItems / this.limit);
            }
            catch (ex) {
                if (ex.response?.data?.message != "jwt expired") {
                    swal("Oops!", ex.response?.data?.message, "error");
                }
                if (!ex?.response) {
                    swal(commonMessage);
                }
            }
        }
    },
    async mounted() {
    },
    components: { Create,Paginate }
}
</script>