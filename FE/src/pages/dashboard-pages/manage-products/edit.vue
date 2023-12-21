<template>
    <!-- Modal -->
    <div class="modal fade" id="productEditModal" tabindex="-1" role="dialog" aria-labelledby="productEditLabel" aria-hidden="true">
        <form class="modal-dialog modal-dialog-centered" role="document" v-on:submit.prevent="create">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productEditLabel"> Cập nhật Sản Phẩm </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body row">
                    <div class="mb-3 col-6">
                        <label class="form-label">Tên</label>
                        <input type="text" class="form-control" required v-model="name" placeholder="Tên Sản Phẩm">
                    </div>
                    <div class="mb-3 col-6">
                        <label class="form-label">Mô Tả</label>
                        <input type="text" class="form-control" required v-model="description" placeholder="Mô Tả Sản Phẩm">
                    </div>
                    <div class="mb-3 col-6">
                        <label class="form-label">Giá Nhập</label>
                        <input type="number" class="form-control" required v-model="priceInput" placeholder="Giá Nhập">
                    </div>
                    <div class="mb-3 col-6">
                        <label class="form-label">Giá Bán</label>
                        <input type="number" class="form-control" required v-model="priceOutput" placeholder="Giá Bán">
                    </div>
                    <div class="mb-3 col-6">
                        <label class="form-label">Số Lượng Nhập</label>
                        <input type="number" class="form-control" required v-model="amount" placeholder="Số Lượng Sản Phẩm Đã Nhập">
                    </div>
                    <div class="mb-3 col-6">
                        <label class="form-label">Nhà Cung Cấp</label>
                        <select v-model="supplierId" class="form-control">
                            <option v-for="(supplier, index) in suppliers" :value="supplier._id" v-bind:key="supplier._id">{{ supplier.name + index}} </option>
                        </select>
                    </div>

                    <div class="mb-3 col-6">
                        <label class="form-label">Thể Loại</label>
                        <select v-model="categoryId" class="form-control">
                            <option v-for="category in categories" :value="category._id" v-bind:key="category._id">{{ category.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="closeButtonListData" type="button" data-bs-dismiss="modal" class="btn bg-gradient-secondary">Đóng</button>
                    <button type="submit" class="btn bg-gradient-primary">Cập Nhật</button>
                </div>
            </div>
        </form>
    </div>
</template>
  
<script>
import instance from '@/Unilities/axios';
import { commonMessage } from '@/Unilities/common';
import swal from 'sweetalert';
import { mapState } from 'vuex';

export default {
    name: 'edit-products',
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
            name: '',
            description: '',
            priceInput: '',
            priceOutput: '',
            amount: '',
            supplierId: '',
            categoryId: '',
            suppliers: [],
            categories: []
        }
    },
    async created(){
        await Promise.all([this.getSuppliers(), this.getCategories()]);
        this.supplierId = this.suppliers[0]._id;
        this.categoryId = this.categories[0]._id;
    },
    methods: {
        async create() {
            try {
                if(this.priceOutput > this.priceInput) {
                    swal('Oops!', "Giá bán không thể lớn hơn giá nhập", 'error');
                    return;
                }
                const baseUrl = 'products';
                const data = {
                    name: this.name,
                    description: this.description,
                    priceInput: this.priceInput,
                    priceOutput: this.priceOutput,
                    amount: this.amount,
                    amountAvailable: this.amount,
                    supplier: this.supplierId,
                    category: this.categoryId
                }
                await instance.post(baseUrl, data);
                document.getElementById('closeButtonListData').click();
                swal('Yup','Cập nhật Thành Công !!','success');
                this.$emit('create');
            } catch (ex) {
                if (ex.response?.data?.message != 'jwt expired') {
                    swal("Oops!", ex.response?.data?.message, "error");
                }
                if (!ex?.response) {
                    swal('Oops!',commonMessage, 'error');
                }
            }
        },
        async getSuppliers(){
            try {
                const baseUrl = 'suppliers';
                var result = await instance.get(baseUrl);
                this.suppliers = result.data.result;
            } catch (ex) {
                console.log(ex)
            }
        },
        async getCategories(){
            try {
                const baseUrl = 'categories';
                var result = await instance.get(baseUrl);
                this.categories = result.data.result;
            } catch (ex) {
               console.log(ex)
            }
        }
    },
}
</script>
  
<style></style>