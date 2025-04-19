import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  MaterialColor get neutral => const MaterialColor(0xFF27364B, <int, Color>{
    0: Colors.white,
    10: Color(0xFFF6F8FC),
    20: Color(0xFFF1F4F9),
    30: Color(0xFFE9EBEF),
    40: Color(0xFFCBD4E1),
    50: Color(0xFF94A3B8),
    60: Color(0xFF64748B),
    70: Color(0xFF475569),
    80: Color(0xFF27364B),
    90: Color(0xFF1E2A3B),
    100: Color(0xFF0F1A2A),
  });

  Color get white => neutral[0]!;
  Color get background => neutral[10]!;
  Color get backgroundTextField => neutral[20]!;
  Color get disabledButton => neutral[30]!;
  Color get neutralHover => neutral[30]!;
  Color get border => neutral[40]!;
  Color get disabledButtonFont => neutral[50]!;
  Color get placeholder => neutral[50]!;
  Color get neutralIcon => neutral[50]!;
  Color get lightFont => neutral[60]!;
  Color get grayFont => neutral[70]!;
  Color get font => neutral[80]!;
  Color get black => neutral[100]!;

  MaterialColor get gradient => const MaterialColor(0xFF008A3A, <int, Color>{
    0: Color(0xFF22C55E),
    10: Color(0xFF4ADE80),
  });

  MaterialColor get primary => const MaterialColor(0xFF34A853, <int, Color>{
    50: Color(0xFFF0FDF4),
    100: Color(0xFFDCFCE7),
    200: Color(0xFFBBF7D0),
    300: Color(0xFF86EFAC),
    400: Color(0xFF59C877),
    500: Color(0xFF22C55E),
    600: Color(0xFF16A34A),
    700: Color(0xFF15803D),
    800: Color(0xFF166534),
    900: Color(0xFF14532D),
  });

  MaterialColor get secondary => const MaterialColor(0xFF76E192, <int, Color>{
    50: Color(0xFFE8FFF3),
    100: Color(0xFFC4FFCB),
    200: Color(0xFF76E192),
    300: Color(0xFF59C877),
    400: Color(0xFF32A558),
    500: Color(0xFF008A41),
  });
  MaterialColor get info => const MaterialColor(0xFF3267E3, <int, Color>{
    0: Color(0xFFF0F3FF),
    10: Color(0xFFB1C5F6),
    20: Color(0xFF3267E3),
    30: Color(0xFF114CD6),
    40: Color(0xFF11317D),
  });

  MaterialColor get success => const MaterialColor(0xFF25C196, <int, Color>{
    0: Color(0xFFE1F9F2),
    10: Color(0xFFB6EADC),
    20: Color(0xFF25C196),
    30: Color(0xFF1FA17D),
    40: Color(0xFF20563C),
  });

  MaterialColor get warning => const MaterialColor(0xFFCD7B2E, <int, Color>{
    0: Color(0xFFFFF9F2),
    10: Color(0xFFEECEB0),
    20: Color(0xFFCD7B2E),
    30: Color(0xFFBF6919),
    40: Color(0xFF734011),
  });

  MaterialColor get error => const MaterialColor(0xFFFF006C, <int, Color>{
    0: Color(0xFFFFF5F9),
    10: Color(0xFFFFAACE),
    20: Color(0xFFFF006C),
    30: Color(0xFFD42A72),
    40: Color(0xFF800036),
  });

  Gradient get primaryGradient => LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [gradient.surface, gradient.splash],
  );

  Gradient get mobileBackgroundGradient => LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.topRight,
    colors: [gradient.surface, gradient.splash],
  );

  ThemeData get primaryDatePicker => ThemeData.light().copyWith(
    primaryColor: primary,
    colorScheme: ColorScheme.light(primary: primary),
    buttonTheme: const ButtonThemeData(textTheme: ButtonTextTheme.primary),
  );

  List<Color> get backgroundColors => [
    const Color(0xFFF0F3FF),
    const Color(0xFFFFF9F2),
    const Color(0xFFDFE6FD),
    const Color(0xFFFFF5F9),
    const Color(0xFFE1F9F2),
    const Color(0xFFFAEBFF),
    const Color(0xFFFFF8DD),
    const Color(0xFFE8E8EA),
  ];

  List<Color> get foregroundColors => [
    const Color(0xFF3267E3),
    const Color(0xFFCD7B2E),
    const Color(0xFF5E81F4),
    const Color(0xFFFF006C),
    const Color(0xFF25C196),
    const Color(0xFFA660BA),
    const Color(0xFFD6AD00),
    const Color(0xFF34303E),
  ];
}

AppColors get appColors {
  return AppColors._();
}

extension AliasMaterialColor on MaterialColor {
  Color get surface => this[0] ?? this;
  Color get splash => this[10] ?? this;
  Color get main => this[20] ?? this;
  Color get hover => this[30] ?? this;
  Color get pressed => this[40] ?? this;
}
