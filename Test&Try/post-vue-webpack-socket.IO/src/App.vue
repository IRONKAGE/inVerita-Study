<template>
  <div id="app">
    <v-app fill-height>
      <v-layout justify-center >
        <v-flex md8 ms10 xs12  id='router_block'>
          <r-header></r-header>
          <v-layout row wrap>
            <v-flex xs9>
              <v-content>
                <v-container fluid>
                   <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                   </v-slide-y-transition>
                </v-container>
              </v-content>
            </v-flex>
            <v-flex xs3>
              <v-container fluid style='border-left: 1px solid #ccc'>
                <template v-if='$store.getters.isLoggedIn'>
                  <r-side-nav></r-side-nav>
                </template>
                <template v-else>
                  <r-auth-forms></r-auth-forms>
                </template>
              </v-container>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import RHeader from '@/components/Globals/Header'
import RSideNav from '@/components/SideNav'
import RAuthForms from '@/components/AuthForms'

export default {
  name: 'app',
  components: {
    RHeader,
    RSideNav,
    RAuthForms
  },
  sockets: {
    error(err) {
      console.log('sockets', err)
    },
    success(data) {
      console.log('sockets', data)
    }

  }
}
</script>

<style>
  #app {
    background-color: #edeef0;
  }
  #router_block {
    background-color: white;
    -webkit-box-shadow: 0px 2px 7px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 7px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 7px 0px rgba(0,0,0,0.75);
  }
</style>