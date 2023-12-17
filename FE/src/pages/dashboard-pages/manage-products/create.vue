<template>
    <!-- Modal -->
    <div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="settingsModalLabel" aria-hidden="true">
        <form class="modal-dialog modal-dialog-centered" role="document" v-on:submit.prevent="create">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="settingsModalLabel"> Tạo Mới Data </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control" required v-model="title" placeholder="Mô tả">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Price</label>
                        <input type="text" class="form-control" required v-model="price" placeholder="Key">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Duration</label>
                        <input type="text" class="form-control" required v-model="duration" placeholder="Value">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Type Data</label>
                        <input type="text" class="form-control" required v-model="type" placeholder="Value">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Info JSON</label>
                        <input type="text" class="form-control" required v-model="otherInfor" placeholder="Value">
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
            title: '',
            price: '',
            duration: '',
            type: '',
            otherInfor: ''
        }
    },
    methods: {
        async create() {
            try {
                const baseUrl = 'listData';
                const data = {
                    title: this.title,
                    price: this.price,
                    duration: this.duration,
                    type: this.type,
                    otherInfor: this.otherInfor
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