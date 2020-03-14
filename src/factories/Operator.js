export class Operator {
  constructor(type = "") {
    this.id = Operator._id();
    this.type = type;
    this.order = Operator.ORDERS[type];
    this.component = "operator";
  }
}

let i = -1;
Operator._id = () => i--;

const OPERATORS = {
  MINUS: "-",
  PLUS: "+",
  MULTIPLY: "*",
  DIVIDE: "/"
};
const ORDERS = {
  [OPERATORS.MINUS]: 2,
  [OPERATORS.PLUS]: 2,
  [OPERATORS.MULTIPLY]: 1,
  [OPERATORS.DIVIDE]: 1
};
Operator.TYPES = Object.values(OPERATORS);
Operator.OPERATORS = OPERATORS;
Operator.ORDERS = ORDERS;
Operator.getHigherOrder = () => Math.min(Object.values(Operator.Orders));
