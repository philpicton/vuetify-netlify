<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes, validate }">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Contact us</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <VTextFieldWithValidation rules="required|max:10" v-model="name" :counter="10" label="Name" />

          <VTextFieldWithValidation rules="required|email" v-model="email" label="E-mail" />

          <VSelectWithValidation rules="required" :items="items" v-model="select" label="Select" />

          <VCheckboxWithValidation rules="required" v-model="checkbox" label="Option"/>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clear">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="validate">Validate</v-btn>
        <v-btn color="primary" @click="passes(submit)" :disabled="invalid || !validated"
          >Sign Up</v-btn
        >
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>


<script>
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from './inputs/VTextFieldWithValidation'
import VSelectWithValidation from './inputs/VSelectWithValidation'
import VCheckboxWithValidation from './inputs/VCheckboxWithValidation'


export default {
  data: () => ({
    items: ["", "Foo", "Bar"],
    name: "",
    email: "",
    select: "",
    checkbox: ""
  }),
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VCheckboxWithValidation
  },
  methods: {
    async clear() {
      this.name = this.email = this.select = this.checkbox = ""
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      });
    },
    async submit() {
     // console.log('Submitting!')
    }
  }
};
</script>