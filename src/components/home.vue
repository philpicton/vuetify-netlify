<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <myform/>
        </v-flex>
      </v-layout>
</template>

<script>
import myform from './myform.vue'

export default {
  components: {
    myform
  }
}
</script>