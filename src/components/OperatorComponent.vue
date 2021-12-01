<template>
  <div>
    <select v-bind="$attrs" :value="$props.operator.type">
      <option value="">Chose an operator</option>
      <option
        :value="operator"
        v-for="operator in $props.operatorTypes"
        :key="operator"
      >
        {{ operator }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "OperatorComponent",
  props: ["operator", "operatorTypes"]
};
</script>

<style scoped>
select {
  width: 5em;
  line-height: 1.5em;
}
</style>
