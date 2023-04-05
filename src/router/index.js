import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import EventCreateView from '../views/EventCreateView.vue'
import EventManageView from '../views/EventManageView.vue'
import EventAccreditView from '../views/EventAccreditView.vue'
import EventSellTicketView from '../views/EventSellTicketView.vue'

import PersonCreateView from '../views/PersonCreateView.vue'
import PersonManageView from '../views/PersonManageView.vue'

import ExternalPersonCreateView from '../views/ExternalPersonCreateView.vue'
import ExternalPersonManageView from '../views/ExternalPersonManageView.vue'

import AccreditView from '../views/AccreditView.vue'

import loginView from '../views/loginView.vue'
import logout from '../views/logoutComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/event/accredit',
    name: 'accreditEvent',
    component: EventAccreditView
  },
  {
    path: '/event/create',
    name: 'createEvent',
    component: EventCreateView
  },
  {
    path: '/event/manage',
    name: 'manageEvent',
    component: EventManageView

  },
  {
    path: '/person/create',
    name: 'createPerson',
    component: PersonCreateView
  },
  {
    path: '/person/manage',
    name: 'managePerson',
    component: PersonManageView
  },
  {
    path: '/external-person/create',
    name: 'createExternalPerson',
    component: ExternalPersonCreateView
  },
  {
    path: '/external-person/manage',
    name: 'manageExternalPerson',
    component: ExternalPersonManageView
  },
  {
    path: '/event/sell-ticket',
    name: 'sellTicket',
    component: EventSellTicketView
  },
  {
    path: '/accredit/:id',
    name: 'accredit',
    component: AccreditView
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
