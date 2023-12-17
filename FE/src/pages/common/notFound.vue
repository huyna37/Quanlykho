<template>
  <div class="container my-5">
    <h1 class="text-center display-1 my-5 text-primary">
      404 - Page Not Found
    </h1>
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6">
        <img
          src="https://via.placeholder.com/500x300"
          class="img-fluid rounded"
          alt="Page Not Found"
        />
      </div>
      <div class="col-md-6">
        <p class="lead my-4">The page you are looking for does not exist.</p>
        <router-link to="/" class="btn btn-primary btn-lg my-3"
          >Go to Home</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "not-found",
};
</script>

<style scoped>
.text-primary {
  color: #6c63ff; /* thay đổi màu sắc của chữ */
}

.btn-primary {
  background-color: #6c63ff; /* thay đổi màu sắc của nút */
  border-color: #6c63ff;
}

.btn-primary:hover {
  background-color: #5b54e7; /* thay đổi màu sắc của nút khi hover */
  border-color: #5b54e7;
}

.col-md-6 img {
  border-radius: 8px; /* làm tròn góc ảnh */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* thêm shadow cho ảnh */
}
</style>
