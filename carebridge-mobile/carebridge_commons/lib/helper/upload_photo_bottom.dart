import 'package:carebridge_theme/themes/app_colors.dart';
import 'package:carebridge_theme/themes/app_fonts.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class UploadPhotoBottomSheetHelper {
  static Future<void> show({
    required BuildContext context,
    required Function(XFile image) onTap,
  }) async {
    await showModalBottomSheet(
      context: context,
      clipBehavior: Clip.antiAlias,
      builder: (context) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: Icon(Icons.camera_alt_rounded, color: appColors.primary),
              title: Text("Camera", style: appFonts.ts),
              onTap: () async {
                Navigator.pop(context);
                final imagePicker = ImagePicker();
                final XFile? image = await imagePicker.pickImage(
                  source: ImageSource.camera,
                );

                if (image != null) onTap.call(image);
              },
            ),
            ListTile(
              leading: Icon(Icons.photo, color: appColors.primary),
              title: Text("Gallery", style: appFonts.ts),
              onTap: () async {
                Navigator.pop(context);
                final imagePicker = ImagePicker();
                final XFile? image = await imagePicker.pickImage(
                  source: ImageSource.gallery,
                );

                if (image != null) onTap.call(image);
              },
            ),
          ],
        );
      },
    );
  }
}
