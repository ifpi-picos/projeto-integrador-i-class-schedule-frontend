<template>
    <div class="wrapper">
        <notifications></notifications>
        <side-bar>
            <template slot="links">
                <!--<sidebar-item
          :link="{
            name: 'disp',
            path: '/disp',
            icon: 'fas fa-chalkboard-teacher text-primary'
          }"
        ></sidebar-item>
        -->
                <sidebar-item
                    :link="{
                        name: 'Dashboard',
                        path: '/dashboard',
                        icon: 'ni ni-tv-2 text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Cursos',
                        path: '/cursos',
                        icon: 'fas fa-graduation-cap text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Turnos',
                        path: '/turnos',
                        icon: 'fas fa-clock text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Salas',
                        path: '/salas',
                        icon: 'fas fa-university text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Áreas',
                        path: '/areas',
                        icon: 'fas fa-sitemap text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Coordenações',
                        path: '/coordenacoes',
                        icon: 'far fa-address-card text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Disciplinas',
                        path: '/disciplinas',
                        icon: 'fas fa-book text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Professores',
                        path: '/professores',
                        icon: 'fas fa-chalkboard-teacher text-primary'
                    }"
                ></sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'Turmas',
                        path: '/turmas',
                        icon: 'ni ni-collection text-primary'
                    }"
                >
                </sidebar-item>

                <sidebar-item
                    :link="{
                        name: 'User Profile',
                        path: '/profile',
                        icon: 'ni ni-single-02 text-primary'
                    }"
                >
                </sidebar-item>
                <!--
        <sidebar-item
          :link="{
            name: 'Tables',
            path: '/tables',
            icon: 'ni ni-bullet-list-67 text-primary',
          }"
        >
        </sidebar-item>
      -->
                <sidebar-item
                    :link="{
                        name: 'Login',
                        path: '/login',
                        icon: 'ni ni-key-25 text-primary'
                    }"
                >
                </sidebar-item>
                <sidebar-item
                    :link="{
                        name: 'Register',
                        path: '/register',
                        icon: 'ni ni-circle-08 text-primary'
                    }"
                >
                </sidebar-item>
            </template>

            <template slot="links-after">
                <hr class="my-3" />
                <h6 class="navbar-heading p-0 text-primary">Documentation</h6>

                <b-nav class="navbar-nav mb-md-3">
                    <b-nav-item
                        href="https://www.creative-tim.com/learning-lab/bootstrap-vue/quick-start/argon-dashboard"
                    >
                        <i class="ni ni-spaceship"></i>
                        <b-nav-text class="p-0">Getting started</b-nav-text>
                    </b-nav-item>
                    <b-nav-item
                        href="https://www.creative-tim.com/learning-lab/bootstrap-vue/colors/argon-dashboard"
                    >
                        <i class="ni ni-palette"></i>
                        <b-nav-text class="p-0">Foundation</b-nav-text>
                    </b-nav-item>
                    <b-nav-item
                        href="https://www.creative-tim.com/learning-lab/bootstrap-vue/avatar/argon-dashboard"
                    >
                        <i class="ni ni-ui-04"></i>
                        <b-nav-text class="p-0">Components</b-nav-text>
                    </b-nav-item>
                </b-nav>
            </template>
        </side-bar>
        <div class="main-content d-flex flex-column min-vh-100">
            <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

            <div @click="$sidebar.displaySidebar(false)" class="flex-grow-1">
                <fade-transition
                    :duration="200"
                    origin="center top"
                    mode="out-in"
                >
                    <!-- your content here -->
                    <router-view></router-view>
                </fade-transition>
            </div>
            <content-footer
                v-if="!$route.meta.hideFooter"
                class="position-relative container-fluid"
            ></content-footer>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

function hasElement (className) {
	return document.getElementsByClassName(className).length > 0
}

function initScrollbar (className) {
	if (hasElement(className)) {
		new PerfectScrollbar(`.${className}`)
	} else {
		// try to init it later in case this component is loaded async
		setTimeout(() => {
			initScrollbar(className)
		}, 100)
	}
}

import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import { FadeTransition } from 'vue2-transitions'

export default {
	components: {
		DashboardNavbar,
		ContentFooter,
		DashboardContent,
		FadeTransition
	},
	methods: {
		initScrollbar () {
			let isWindows = navigator.platform.startsWith('Win')
			if (isWindows) {
				initScrollbar('sidenav')
			}
		}
	},
	mounted () {
		this.initScrollbar()
	}
}
</script>
<style lang="scss"></style>
