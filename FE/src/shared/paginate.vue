<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="javascript:;" aria-label="Previous" @click.prevent="changePage(currentPage - 1, -1)">
                    <i class="fa fa-angle-left"></i>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item" :class="{ active: page === currentPage }" v-for="page in displayedPages" :key="page">
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="javascript:;" aria-label="Next" @click.prevent="changePage(currentPage + 1, +1)">
                    <i class="fa fa-angle-right"></i>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
  
<script>
export default {
    name: 'paginate-page',
    data() {
        return {
            total: 0,
            displayRange: 2 // Số trang hiển thị xung quanh trang hiện tại
        };
    },
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    computed: {
        pages() {
            const pagesArray = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pagesArray.push(i);
            }
            return pagesArray;
        },
        displayedPages() {
            const minPage = Math.max(1, this.currentPage - this.displayRange);
            const maxPage = Math.min(this.totalPages, this.currentPage + this.displayRange);
            return this.pages.slice(minPage - 1, maxPage);
        }
    },
    methods: {
        changePage(page) {
            if (page === this.currentPage) {
                return;
            }
            this.$emit("page-change", page);
        }
    }
};
</script>
