import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import AuthLayout from '@/views/Pages/AuthLayout.vue'

import NotFound from '@/views/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { name: 'dashboard' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/professores',
        name: 'professores',
        meta: { name: 'professores' },
        component: () =>
          import(/* webpackChunkName: "Professores" */ '../views/Teachers.vue')
      },
      {
        path: '/cursos',
        name: 'cursos',
        meta: { name: 'cursos' },
        component: () =>
          import(/* webpackChunkName: "Cursos" */ '../views/Courses.vue')
      },
      {
        path: '/curso',
        name: 'novo-curso',
        meta: { name: 'novo curso' },
        component: () =>
          import(
            /* webpackChunkName: "Formulário de cursos" */ '../views/Course.vue'
          ),
        children: [
          {
            path: ':id',
            name: 'editar-curso',
            meta: { name: 'editar curso' },
            component: () =>
              import(
                /* webpackChunkName: "Formulário de cursos" */ '../views/Course.vue'
              )
          }
        ]
      },
      {
        path: '/turmas',
        name: 'turmas',
        meta: { name: 'turmas' },
        component: () =>
          import(/* webpackChunkName: "Turmas" */ '../views/Class.vue')
      },
      {
        path: '/areas',
        name: 'areas',
        meta: { name: 'Áreas' },
        component: () =>
          import(/* webpackChunkName: "Turmas" */ '../views/Areas.vue')
      },
      {
        path: '/salas',
        name: 'salas',
        meta: { name: 'salas' },
        component: () =>
          import(/* webpackChunkName: "Salas" */ '../views/Rooms.vue')
      },
      {
        path: '/disciplinas',
        name: 'disciplinas',
        meta: { name: 'disciplinas' },
        component: () =>
          import(/* webpackChunkName: "Disciplinas" */ '../views/Subjects.vue')
      },
      {
        path: '/coordenacoes',
        name: 'coordenacoes',
        meta: { name: 'coordenações' },
        component: () =>
          import(
            /* webpackChunkName: "Coordenacoes" */ '../views/Coordination.vue'
          )
      },
      {
        path: '/turnos',
        name: 'turnos',
        meta: { name: 'turnos' },
        component: () =>
          import(/* webpackChunkName: "Coordenacoes" */ '../views/Schedule.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () =>
          import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(
            /* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue'
          )
      },
      {
        path: '/maps',
        name: 'maps',
        component: () =>
          import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/disp',
        name: 'disp',
        component: () =>
          import(/* webpackChunkName: "disp" */ '../views/dispo.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () =>
          import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
]

export default routes
