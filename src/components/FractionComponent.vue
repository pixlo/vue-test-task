<template functional>
  <div>
    <div>
      <input
        :readonly="props.readonly"
        type="number"
        v-on="{
          ...listeners,
          input: listeners.input
            ? listeners.input.bind(this, props.fraction, 'numerator')
            : () => {}
        }"
        :value="props.fraction.numerator"
      />
    </div>
    <hr />
    <div>
      <input
        :readonly="props.readonly"
        type="number"
        v-on="{
          ...listeners,
          input: listeners.input
            ? listeners.input.bind(this, props.fraction, 'denominator')
            : () => {}
        }"
        :value="props.fraction.denominator"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FractionComponent",
  functional: true
};
</script>

<style scoped>
input {
  line-height: 1.5em;
  width: 5em;
}
</style>
