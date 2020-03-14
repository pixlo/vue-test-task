export class Fraction {
  constructor(numerator = null, denominator = null) {
    this.id = Fraction._id();
    this._numerator = numerator;
    this._denominator = denominator;
    this.component = "fraction";
  }

  get numerator() {
    if (this._numerator === null || this._numerator === "") return "";
    return +this._numerator;
  }

  set numerator(val) {
    this._numerator = val;
  }

  get denominator() {
    if (this._denominator === null || this._denominator === "") return "";
    return +this._denominator;
  }

  set denominator(val) {
    return (this._denominator = val);
  }

  validate() {
    return (
      !isNaN(this.numerator) &&
      !isNaN(this.denominator) &&
      this.numerator > 0 &&
      this.denominator > 0
    );
  }
}

let i = 0;
Fraction._id = () => i++;
