<template>
  <div class="fractionComponent">
    <div>
      <input
        :readonly="$props.readonly"
        type="number"
        v-on:input="onInput($event, 'numerator')"
        :value="$props.fraction.numerator"
      />
    </div>
    <hr />
    <div>
      <input
        :readonly="$props.readonly"
        type="number"
        v-on:input="onInput($event, 'denominator')"
        :value="$props.fraction.denominator"
      />
    </div>
    <div>
      <div
        v-for="error in $props.fraction.errors"
        :key="error"
        style="color: red; font-size: 0.5em"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FractionComponent",
  props: ["fraction", "readonly"],
  emits: ["input"],
  methods: {
    onInput(e, field) {
      this.$emit("input", {
        event: e,
        fraction: this.fraction,
        field: field
      });
    }
  }
};
</script>

<style scoped>
.fractionComponent {
  width: 5em;
  line-height: 1.5;
}

input {
  width: 100%;
}
</style>
