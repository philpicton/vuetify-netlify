<template>
  <v-app>
   <v-navigation-drawer app>
   stuff
  </v-navigation-drawer>

  <v-app-bar app>
    hello
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  <v-footer app>
   
  </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: { 
  },

  data: () => ({
    drawer: false,
      items: [
        {
          href: 'home',
          router: true,
          title: 'Home',
          icon: 'home',
        },
      ],
  }),
};
</script>
