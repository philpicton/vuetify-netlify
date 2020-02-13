<template>
    <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
        <v-textarea
          v-model="innerValue"
          v-bind="$attrs" 
          v-on="$listeners"
          :error-messages="errors"
          :success="valid"
          required
          rows="4"
        ></v-textarea>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: [Object, String],
      default: ""
    },
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: ""
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>