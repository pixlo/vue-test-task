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
    // return +this._numerator;
    return this._numerator;
  }

  get numericNumerator() {
    return +this._numerator;
  }

  set numerator(val) {
    this._numerator = val;
  }

  get denominator() {
    if (this._denominator === null || this._denominator === "") return "";
    // return parseInt(this._denominator, 10);
    // return +this._denominator;
    return this._denominator;
  }

  get numericDenominator() {
    return +this._denominator;
  }

  set denominator(val) {
    this._denominator = val;
  }

  isNotEmpty() {
    return !!(this._numerator && this._denominator);
  }

  validateInput() {
    return (
      this.isNotEmpty() &&
      !(
        !this.pattern.test(this._numerator) ||
        !this.pattern.test(this._denominator)
      )
    );
  }

  isValidNumericValue() {
    return (
      !isNaN(this.numericNumerator) &&
      !isNaN(this.numericDenominator) &&
      !(
        this.numericNumerator > Number.MAX_SAFE_INTEGER ||
        this.numericDenominator > Number.MAX_SAFE_INTEGER ||
        this.numericNumerator < Number.MIN_SAFE_INTEGER ||
        this.numericDenominator < Number.MIN_SAFE_INTEGER
      )
    );
  }

  checkErrors() {
    this.clearErrors();
    if (this.isNotEmpty() && !this.validateInput()) {
      this.errors.push(
        "Некорректный формат данных. Разрешены только натуральные числа"
      );
      return false;
    }
    if (!this.isValidNumericValue()) {
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
      this.validateInput() && this.isValidNumericValue() && this.checkErrors()
    );
  }
}

let i = 0;
Fraction._id = () => i++;
