import UsersView from '../views/UsersView.vue'
import KardexView from '../views/KardexView.vue'
import FacturesView from '../views/FacturesView.vue'
import ArticlesView from '../views/Articlesview.vue'
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  { path: '/users', name: 'users', component: UsersView },
  { path: '/kardex', name: 'kardex', component: KardexView },
  { path: '/articles', name: 'articles', component: ArticlesView },
  { path: '/factures', name: 'factures', component: FacturesView },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;