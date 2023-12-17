import store from '@/store/store';
import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies';
import { routes } from '.';

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return { top: 0 }
  },
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  store.dispatch('app/setIsLoading', true);
  // document.title = `${to?.meta?.titleSEO ? to.meta.titleSEO : to?.meta?.title}`;
  // Cập nhật thẻ "canonical" trên trang hiện tại
  store.dispatch('app/setTitleCurrent', to.meta.title);
  const cookies = useCookies()?.cookies;
  // const isAuth = !!cookies?.get('access_token');
  // const roles = cookies?.get('user')?.role;
  
  // if (to.meta.requireAuth || to.meta.role) {
  //   // Check if user is authenticated
  //   if (!isAuth) {
  //     // Redirect to login page
  //     store.dispatch('app/setAuth', false);
  //     return next('/');
  //   } else {
  //     // Check if user has required role
  //     if (to.meta.role && !roles?.includes(to.meta.role)) {
  //       // Redirect to default page if the user does not have the required role
  //       store.dispatch('app/setAuth', false);
  //       store.dispatch('app/setRoles', null);
  //       return next('/');
  //     }
  //   }
  // }
  if (to.path.includes('auth')) {
    cookies.remove('access_token');
    cookies.remove('user');
    store.dispatch('app/setAuth', false);
    store.dispatch('app/setRoles', null);
  }
  next()
  // redirect to login page if not logged in and trying to access a restricted page
})


router.afterEach(() => {
  // Gửi dữ liệu phân tích cho trang mới
  setTimeout(() => {
    store.dispatch('app/setIsLoading', false);
  }, 80)
});


export default router
