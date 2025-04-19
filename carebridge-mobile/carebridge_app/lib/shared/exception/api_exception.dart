class ApiException implements Exception {
  final int? code;
  final String? message;

  ApiException(this.code, this.message);

  @override
  String toString() {
    return "ApiException: $code, $message";
  }
}
