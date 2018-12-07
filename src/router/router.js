
const routes = [{
    path: '/index',
    component: () =>
            import (`../modules/index/index.vue`)
}, {
    path: '/',
    redirect: '/index',
}];

export default routes;