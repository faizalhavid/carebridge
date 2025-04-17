import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:http/http.dart' as http;
// import 'package:http_parser/http_parser.dart';
import 'package:image_picker/image_picker.dart';

class ImageHelper {
  Future<Uint8List> convertNetworkImageToBytes(String imageUrl) async {
    // Fetch the image from the network
    http.Response response = await http.get(Uri.parse(imageUrl));

    // Check if the request was successful (status code 200)
    if (response.statusCode == 200) {
      // Convert the response body to bytes
      Uint8List imageBytes = Uint8List.fromList(response.bodyBytes);
      return imageBytes;
    } else {
      throw Exception(
        'Failed to load image. Status code: ${response.statusCode}',
      );
    }
  }

  static Future<MultipartFile?> convertXFileToMultipartFile({
    required XFile? xFile,
    required int customerId,
    required String fileName,
  }) async {
    if (xFile == null) {
      return null;
    }
    return MultipartFile.fromFile(
      xFile.path,
      // filename:
      //     "${customerId}_${fileName}_${DateTime.now().millisecondsSinceEpoch}",
      // contentType: MediaType("image", xFile.path.split(".").last),
    );
  }
}
