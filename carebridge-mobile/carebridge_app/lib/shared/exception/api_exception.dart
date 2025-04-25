class ApiException implements Exception {
  final int? code;
  final String? message;
  final String? url;

  ApiException(this.code, this.message, this.url);

  @override
  String toString() {
    return "ApiException: $code, $message, $url";
  }
}
