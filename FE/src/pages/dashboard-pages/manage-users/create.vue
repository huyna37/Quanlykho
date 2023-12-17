<template>
    <!-- Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <form class="modal-dialog modal-dialog-centered" role="document" v-on:submit.prevent="create">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="userModalLabel"> Tạo Mới Người Dùng </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">UserName</label>
                        <input type="text" class="form-control" required v-model="userName" placeholder="Mô tả">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="text" class="form-control" required v-model="password" placeholder="Key">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nhập Lại Mật Khẩu</label>
                        <input type="text" class="form-control" required v-model="passwordConfirm" placeholder="Key">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Vai Trò</label>
                        <select class="form-control" v-model="role">
                            <option value="user">Người Dùng</option>
                            <option value="admin">Quản Lý</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="closeButtonListData" type="button" data-bs-dismiss="modal" class="btn bg-gradient-secondary">Đóng</button>
                    <button type="submit" class="btn bg-gradient-primary">Tạo</button>
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
    name: 'create-users',
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
            userName: '',
            password: '',
            role: '',
            passwordConfirm: ''
        }
    },
    methods: {
        async create() {
            try {
                const baseUrl = 'users';
                const data = {
                    userName: this.userName,
                    password: this.password,
                    role: this.role,
                    passwordConfirm: this.passwordConfirm
                }
                await instance.post(baseUrl, data);
                document.getElementById('closeButtonListData').click();
                swal('Yup','Tạo Thành Công !!','success');
                this.$emit('create');
            } catch (ex) {
                if (ex.response?.data?.message != 'jwt expired') {
                    swal("Oops!", ex.response?.data?.message, "error");
                }
                if (!ex?.response) {
                    swal('Oops!',commonMessage, 'error');
                }
            }
        }
    }
}
</script>