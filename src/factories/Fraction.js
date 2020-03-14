export class Fraction {
  constructor(numerator = null, denominator = null) {
    this.id = Fraction._id();
    this._numerator = numerator;
    this._denominator = denominator;
  }

  static isFraction(object) {
    return object.__proto__.constructor === Fraction;
  }

  get numerator() {
    if (this._numerator === null || this._numerator === "") return "";
    return parseInt(this._numerator, 10);
    // return +this._numerator;
  }

  set numerator(val) {
    this._numerator = val;
  }

  get denominator() {
    if (this._denominator === null || this._denominator === "") return "";
    return parseInt(this._denominator, 10);
    // return +this._denominator;
  }

  set denominator(val) {
    this._denominator = val;
  }

  validate() {
    return (
      !isNaN(this.numerator) &&
      !isNaN(this.denominator) &&
      this.numerator !== 0 &&
      this.denominator !== 0 &&
      this.numerator !== null &&
      this.numerator !== "" &&
      this.denominator !== null &&
      this.denominator !== ""
    );
  }
}

let i = 0;
Fraction._id = () => i++;
