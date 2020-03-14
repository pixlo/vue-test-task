export class Operator {
  constructor(type = "") {
    this.id = Operator._id();
    this._type = type;
    this.order = Operator.ORDERS[type];
  }

  static isOperator(object) {
    return object.__proto__.constructor === Operator;
  }

  get type() {
    return this._type;
  }

  set type(val) {
    this._type = val;
    this.order = Operator.ORDERS[val];
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
