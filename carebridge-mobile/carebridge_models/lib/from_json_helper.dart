class FromJsonHelper {
  static String stringOrNumFromJsonToString(value) {
    if (value is num) {
      return value.toString();
    } else {
      return value;
    }
  }

  static int stringOrNumFromJsonToint(value) {
    if (value is num) {
      return value.toInt();
    } else {
      return int.parse(value);
    }
  }
}
