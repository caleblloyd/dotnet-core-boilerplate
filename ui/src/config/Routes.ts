import { RouteConfig } from 'vue-router'
declare const System: any;

function makeLazyLoad(controller: string, component: string) {
    return () => System.import('../controllers/' + controller).then((module: any) => {
        return module[component];
    }).catch((err: any) => {
        console.error(err);
        console.log("Chunk loading failed");
    });
}

const routes: RouteConfig[] = [
    { path: '/', name: 'posts', component: makeLazyLoad('PostsController', 'List') },
    { path: '/post/:id', name: 'post', component: makeLazyLoad('PostsController', 'View') },
    { path: '/authors', name: 'authors', component: makeLazyLoad('AuthorsController', 'List') },
    { path: '/author/:id', name: 'author', component: makeLazyLoad('AuthorsController', 'View') },
]

export default routes