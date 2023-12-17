<template>
    <!-- Modal -->
    <div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="settingsModalLabel" aria-hidden="true">
        <form class="modal-dialog modal-dialog-centered" role="document" v-on:submit.prevent="create">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="settingsModalLabel">Tạo Mới Thể Loại </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Tên</label>
                        <input type="text" class="form-control" required v-model="name" placeholder="Tên">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Mô Tả</label>
                        <input type="text" class="form-control" required v-model="description" placeholder="Key">
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
    name: 'create-settings',
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
        }
    },
    methods: {
        async create() {
            try {
                const baseUrl = 'categories';
                const data = {
                    name: this.name,
                    description: this.description,
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
  
<style></style>