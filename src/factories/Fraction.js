export class Fraction {
  constructor(numerator = null, denominator = null) {
    this.id = Fraction._id();
    this._numerator = numerator;
    this._denominator = denominator;
    this.errors = [];
    this.pattern = /^-?[0-9]+$/;
  }

  static isFraction(object) {
    return object.__proto__.constructor === Fraction;
  }

  get numerator() {
    if (this._numerator === null || this._numerator === "") return "";
    // return parseInt(this._numerator, 10);
    return +this._numerator;
  }

  set numerator(val) {
    this._numerator = val;
  }

  get denominator() {
    if (this._denominator === null || this._denominator === "") return "";
    // return parseInt(this._denominator, 10);
    return +this._denominator;
  }

  set denominator(val) {
    this._denominator = val;
  }

  checkErrors() {
    this.clearErrors();
    if (this._numerator && this._denominator) {
      if (
        !this.pattern.test(this._numerator) ||
        !this.pattern.test(this._denominator)
      ) {
        this.errors.push(
          "Некорректный формат данных. Разрешены только натуральные числа"
        );
        return false;
      }
    }
    if (
      this.numerator > Number.MAX_SAFE_INTEGER ||
      this.denominator > Number.MAX_SAFE_INTEGER ||
      this.numerator < Number.MIN_SAFE_INTEGER ||
      this.denominator < Number.MIN_SAFE_INTEGER
    ) {
      this.errors.push(
        `Неподдерживаемое число. Возможные значения лежат в диапазоне [${Number.MIN_SAFE_INTEGER} - ${Number.MAX_SAFE_INTEGER}]`
      );
      return false;
    }
    return true;
  }

  clearErrors() {
    this.errors = [];
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
      this.denominator !== "" &&
      this.checkErrors()
    );
  }
}

let i = 0;
Fraction._id = () => i++;
