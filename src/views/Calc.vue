<template>
  <div>
    <div class="grid">
      <div v-for="item in expressionMembers" :key="item.id" class="grid__item">
        <FractionComponent
          v-if="Fraction.isFraction(item)"
          :fraction="item"
          @input="onFractionInput"
        />
        <OperatorComponent
          v-if="Operator.isOperator(item)"
          :operator="item"
          :operator-types="OPERATOR_TYPES"
          @input="onOperatorInput(item, $event)"
        />
      </div>
      <div class="grid__item">
        <div style="display: flex; align-items: center;">
          <div style="padding-right: 10px;">
            =
          </div>
          <div>
            <FractionComponent :fraction="result" readonly />
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: left">
      <a href="#" @click="addFraction">ADD FRACTION</a>
    </div>
  </div>
</template>

<script>
import { Fraction } from "../factories/Fraction";
import { Operator } from "../factories/Operator";
import FractionComponent from "../components/FractionComponent";
import OperatorComponent from "../components/OperatorComponent";

export default {
  name: "Calc",
  components: { OperatorComponent, FractionComponent },
  data() {
    return {
      fractions: [new Fraction(), new Fraction()],
      operators: [new Operator(Operator.OPERATORS.MULTIPLY)],
      OPERATOR_TYPES: Operator.TYPES,
      Fraction,
      Operator
    };
  },
  computed: {
    expressionMembers() {
      const result = [];
      this.fractions.forEach((val, i, arr) => {
        result.push(val);
        if (arr.length - 1 !== i) {
          result.push(this.operators[i]);
        }
      });
      return result;
    },
    result() {
      if (
        this.fractions.every(val => val.validate()) &&
        this.operators.every(({ type }) => type)
      ) {
        let finished = false;
        const members = [...this.expressionMembers];
        while (!finished) {
          let order = null;
          let index = null;
          members.forEach((val, i) => {
            if (Object.prototype.hasOwnProperty.call(val, "order")) {
              if (order === null) {
                order = val.order;
                index = i;
              } else {
                if (val.order < order) {
                  order = val.order;
                  index = i;
                }
              }
            }
          });
          if (index !== null) {
            const result = this.calculate(
              members[index - 1],
              members[index + 1],
              members[index]
            );
            members.splice(index - 1, 3, result);
          } else {
            finished = true;
          }
        }
        const result = members[0];
        const gcd = this.gcd(result);
        return new Fraction(result.numerator / gcd, result.denominator / gcd);
      } else {
        return new Fraction(0, 0);
      }
    }
  },
  methods: {
    addFraction() {
      this.fractions.push(new Fraction());
      this.operators.push(new Operator());
    },
    calculate(first, second, operator) {
      switch (operator.type) {
        case Operator.OPERATORS.PLUS:
          return this.add(first, second);

        case Operator.OPERATORS.MINUS:
          return this.subtract(first, second);

        case Operator.OPERATORS.DIVIDE:
          return this.divide(first, second);

        case Operator.OPERATORS.MULTIPLY:
          return this.multiply(first, second);
      }
    },
    add(first, second) {
      if (first.denominator === second.denominator) {
        return new Fraction(
          first.numerator + second.numerator,
          first.denominator
        );
      } else {
        const _first = new Fraction(
          first.numerator * second.denominator,
          first.denominator * second.denominator
        );
        const _second = new Fraction(
          second.numerator * first.denominator,
          second.denominator * first.denominator
        );
        return new Fraction(
          _first.numerator + _second.numerator,
          _first.denominator
        );
      }
    },
    subtract(first, second) {
      if (first.denominator === second.denominator) {
        return new Fraction(
          first.numerator - second.numerator,
          first.denominator
        );
      } else {
        const _first = new Fraction(
          first.numerator * second.denominator,
          first.denominator * second.denominator
        );
        const _second = new Fraction(
          second.numerator * first.denominator,
          second.denominator * first.denominator
        );
        return new Fraction(
          _first.numerator - _second.numerator,
          _first.denominator
        );
      }
    },
    divide(first, second) {
      return new Fraction(
        first.numerator * second.denominator,
        first.denominator * second.numerator
      );
    },
    multiply(first, second) {
      return new Fraction(
        first.numerator * second.numerator,
        first.denominator * second.denominator
      );
    },
    gcd(fraction) {
      let a = fraction.numerator;
      let b = fraction.denominator;
      a = Math.abs(a);
      b = Math.abs(b);
      if (b > a) {
        const temp = a;
        a = b;
        b = temp;
      }
      // eslint-disable-next-line
      while (true) {
        if (b === 0) return a;
        a %= b;
        if (a === 0) return b;
        b %= a;
      }
    },
    onFractionInput(fraction, field, event) {
      this.$set(fraction, field, event.target.value);
    },
    onOperatorInput(operator, event) {
      this.$set(operator, "type", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
input {
  border: 1px solid black;
}

.grid {
  $gutter: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -$gutter;
  margin-right: -$gutter;
  margin-top: -$gutter;
  padding: 10px;

  &__item {
    padding-left: $gutter / 2;
    padding-right: $gutter / 2;
    padding-top: $gutter;
    /*width: 33%;*/
  }
}
</style>
