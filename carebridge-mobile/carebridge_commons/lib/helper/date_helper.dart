import 'package:intl/intl.dart';

class DateHelper {
  static String format(DateTime date, {String? format}) {
    return DateFormat(format ?? "MMMM d, yyyy").format(date);
  }
}

class TimeHelper {
  static String format(DateTime date, {String? format}) {
    return "${DateFormat(format ?? "HH:mm").format(date)} MYT";
  }
}

class DateTimeHelper {
  static String format(DateTime date, {String? format}) {
    return "${DateFormat(format ?? "MM/dd/yyyy, HH.mm").format(date)} MYT";
  }

  static DateTime parse(String string) {
    return DateTime.parse(string);
  }

  static DateTime? jsonLaravelFormatToDateTime(String? value) {
    if (value == null) {
      return null;
    }
    return DateTime.parse(value).add(const Duration(hours: 8));
  }

  static DateTime? nullableJsonToDateTime(String? value) {
    if (value == null) {
      return null;
    }
    return DateTime.parse(value);
  }
}
