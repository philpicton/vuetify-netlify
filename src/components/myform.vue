<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Contact us</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <VTextFieldWithValidation rules="required|max:20" v-model="contactForm.name" :counter="20" label="Name" />

          <VTextFieldWithValidation rules="required|email" v-model="contactForm.email" label="E-mail" />

          <VTextFieldWithValidation rules="required|max:20" v-model="contactForm.phone" label="Phone" />

          <VTextAreaWithValidation rules="required|max:500" v-model="contactForm.message" label="Message" :counter="500"/>

          <VCheckboxWithValidation rules="required" v-model="contactForm.checkbox" label="I consent to be contacted about this message, and for my details to be stored for that purpose."/>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clear">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" :loading="loading" @click="passes(submit)" :disabled="invalid || !validated"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </ValidationObserver>
</template>


<script>

import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from './inputs/VTextFieldWithValidation'
import VTextAreaWithValidation from './inputs/VTextAreaWithValidation'
import VCheckboxWithValidation from './inputs/VCheckboxWithValidation'

export default {
  data: () => ({
    contactForm: {
      name: "",
      email: "",
      phone: "",
      message: "",
      checkbox: ""
    },
    snackbar: false,
    text: "",
    loading: false,
  }),
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VTextAreaWithValidation,
    VCheckboxWithValidation
  },
  methods: {
    clear() {
      this.contactForm = {
        name: "",
        email: "",
        phone: "",
        message: "",
        checkbox: ""
      }
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      });
    },
    submit() {
      this.loading = true
      fetch('http://localhost:9000/.netlify/functions/mail', {
        method: "POST",
        body: JSON.stringify(this.contactForm)
      }).then(response => {
        response.json().then(data => this.text= data.message)
        this.clear()
        this.snackbar = true
        this.loading = false
      }).catch( function(){
        this.text= "There was an error"
        this.clear()
        this.snackbar = true
        this.loading = false
        }
      )
    },
  }
};
</script>