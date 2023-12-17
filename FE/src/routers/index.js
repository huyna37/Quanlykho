const DashboardLayout = () => import("@/layouts/dashboard-layout.vue");
const User = () => import("@/pages/dashboard-pages/manage-users/index.vue");
const Category = () => import("@/pages/dashboard-pages/manage-categories");
const Product = () => import("@/pages/dashboard-pages/manage-products/index.vue");
const Supplier = () => import("@/pages/dashboard-pages/manage-suppliers/index.vue");

const AuthLayout = () => import("@/layouts/auth-layout.vue");
const Signin = () => import("@/pages/auth-pages/signin.vue");
const Signup = () => import("@/pages/auth-pages/signup.vue");
const NotFound = () => import("@/pages/common/notFound.vue");

export const routerDashboard = {
  path: "/",
  component: DashboardLayout,
  children: [
    {
      path: "/",
      component: Product,
      name: "Product",
      meta: {
        title: "Quản lý sản phẩm",
        icon: "fa-solid fa-users text-success",
        affix: true,
        // role: "admin",
        // requireAuth: true,
        // area: ["user", "admin"],
      },
    },
    {
      path: "/supplier",
      component: Supplier,
      name: "supplier",
      meta: {
        title: "Quản lý nhà cung cấp",
        icon: "fa-solid fa-users text-success",
        affix: true,
        // role: "admin",
        // requireAuth: true,
        // area: ["user", "admin"],
      },
    },
    {
      path: "/category",
      component: Category,
      name: "category",
      meta: {
        title: "Quản lý thể loại",
        icon: "fa-solid fa-users text-success",
        affix: true,
        // role: "admin",
        // requireAuth: true,
        // area: ["user", "admin"],
      },
    },
    {
      path: "/user",
      component: User,
      name: "manageUsers",
      meta: {
        title: "Quản lý người dùng",
        icon: "fa-solid fa-users text-success",
        affix: true,
        // role: "admin",
        // requireAuth: true,
        // area: ["user", "admin"],
      },
    },
  ],
};

export const routerUser = {
  path: "/auth",
  component: AuthLayout,
  children: [
    {
      path: "",
      component: Signin,
      name: "signin",
      meta: { title: "Đăng Nhập", icon: "signin", affix: true },
    },
    {
      path: "signup",
      component: Signup,
      name: "signup",
      meta: { title: "Đăng Ký", icon: "signup", affix: true },
    },
  ],
};

export const exceptionPage = {
  path: '/:pathMatch(.*)*', component: NotFound
}

export const routes = [routerDashboard, routerUser, exceptionPage];
