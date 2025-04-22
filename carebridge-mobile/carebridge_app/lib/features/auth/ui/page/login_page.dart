import 'package:carebridge_app/features/auth/ui/page/register_page.dart';
import 'package:carebridge_app/shared/bloc/authentification_bloc.dart';
import 'package:carebridge_commons/helper/local_auth.dart';
import 'package:carebridge_theme/themes/app_button.dart';
import 'package:carebridge_theme/themes/app_colors.dart';
import 'package:carebridge_theme/themes/app_fonts.dart';
import 'package:carebridge_theme/themes/app_hyperlink.dart';
import 'package:carebridge_theme/themes/app_icon_button.dart';
import 'package:carebridge_theme/themes/app_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_svg/svg.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _key = GlobalKey<FormState>();
  final _localAuth = LocalAuth();
  final _secureStorage = FlutterSecureStorage();

  bool isShowPassword = false;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      // backgroundColor: appColors.primary,
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage("assets/images/bg_auth_login.jpg"),
                  fit: BoxFit.cover,
                ),
              ),
              height: size.height,
            ),
            Container(
              decoration: BoxDecoration(
                gradient: appColors.imageBackgroundGradient,
              ),
              height: size.height,
              padding: EdgeInsets.symmetric(
                horizontal: 20,
                vertical: size.height * 0.1,
              ),
              child: Column(
                children: [
                  Form(
                    key: _key,
                    child: Column(
                      children: [
                        Image.asset("assets/icons/ic_logo_3.png", width: 200),
                        SizedBox(height: size.height * 0.125),
                        AppTextField(
                          label: "Email",
                          keyboardType: TextInputType.emailAddress,
                          controller: _emailController,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "Please enter your email address.";
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 30),
                        AppTextField(
                          keyboardType: TextInputType.visiblePassword,
                          label: "Password",
                          controller: _passwordController,
                          obscureText: true,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "Please enter your password.";
                            }
                            return null;
                          },
                          suffixIcon: AppIconButton(
                            borderRadius: 100,
                            icon:
                                isShowPassword
                                    ? Icons.visibility
                                    : Icons.visibility_off,
                            onTap: () {
                              setState(() {
                                isShowPassword = !isShowPassword;
                              });
                            },
                          ),
                        ),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Text.rich(
                              AppHyperlink(
                                text: "Forgot Password?",
                                style: appFonts.semibold.white.ts,
                                onTap: () {
                                  // Add forgot password functionality
                                },
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  AppButton(
                    text: "Login to Carebridge",
                    isFitParent: true,
                    color: appColors.primary[400],
                    type: AppButtonType.normal,
                    textStyle: appFonts.subtitle.semibold.white.ts,
                    onTap: () async {
                      if (_key.currentState!.validate()) {
                        context.read<AuthenticationBloc>().add(
                          LogIn(
                            email: _emailController.text,
                            password: _passwordController.text,
                          ),
                        );
                        if (context.read<AuthenticationBloc>().state
                            is LoggedIn) {
                          await _secureStorage.write(
                            key: 'email',
                            value: _emailController.text,
                          );
                          await _secureStorage.write(
                            key: 'password',
                            value: _passwordController.text,
                          );
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(
                                "Login successful.",
                                style: appFonts.white.ts,
                              ),
                              backgroundColor: appColors.success,
                            ),
                          );
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(
                                "Login failed. Please try again.",
                                style: appFonts.white.ts,
                              ),
                              backgroundColor: appColors.error,
                            ),
                          );
                        }
                      }
                    },
                  ),
                  const SizedBox(height: 50),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text.rich(
                        TextSpan(
                          text: "New to Carebridge? ",
                          style: appFonts.white.ts,
                          children: [
                            AppHyperlink(
                              text: "Sign Up Now",
                              style: appFonts.white.bold.ts,
                              onTap: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (context) => const RegisterPage(),
                                  ),
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 100),
                  AppIconButton(
                    iconColor: appColors.white,
                    borderRadius: 100,
                    iconSize: 60,
                    iconPath: "assets/icons/ic_biometric_security.svg",
                    radius: 15,
                    onTap: () async {
                      final email = await _secureStorage.read(key: 'email');
                      final password = await _secureStorage.read(
                        key: 'password',
                      );
                      final isBiometricAvailable =
                          await _localAuth.isAvailableToBiometricSecurity();

                      if (isBiometricAvailable &&
                          email != null &&
                          password != null) {
                        context.read<AuthenticationBloc>().add(
                          LogIn(email: email, password: password),
                        );

                        // Listen to the bloc state to handle success or failure
                        final state = context.read<AuthenticationBloc>().state;
                        if (state is AuthFailed) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(
                                state.message ??
                                    "Login failed. Please try again.",
                                style: appFonts.white.ts,
                              ),
                              backgroundColor: appColors.error,
                            ),
                          );
                        }
                      } else {
                        final message =
                            isBiometricAvailable
                                ? "No saved credentials found, please login first."
                                : "Authentication failed. Please try again.";
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(message, style: appFonts.white.ts),
                            backgroundColor: appColors.error,
                          ),
                        );
                      }
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
