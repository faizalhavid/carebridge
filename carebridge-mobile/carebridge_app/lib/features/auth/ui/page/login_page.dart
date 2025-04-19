import 'package:carebridge_app/features/auth/ui/page/register_page.dart';
import 'package:carebridge_app/shared/bloc/authentification_bloc.dart';
import 'package:carebridge_theme/themes/app_button.dart';
import 'package:carebridge_theme/themes/app_colors.dart';
import 'package:carebridge_theme/themes/app_fonts.dart';
import 'package:carebridge_theme/themes/app_hyperlink.dart';
import 'package:carebridge_theme/themes/app_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _key = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: appColors.primary,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Form(
                key: _key,
                child: Column(
                  children: [
                    const SizedBox(height: 100),
                    Image.asset("assets/icons/ic_logo_2.png", width: 200),
                    const SizedBox(height: 50),
                    Text(
                      "Welcome to Carebridge,",
                      style: appFonts.titleSmall.bold.white.ts,
                    ),
                    const SizedBox(height: 10),
                    Text(
                      "Your trusted partner in health and wellness.",
                      style: appFonts.white.ts,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 50),
                    AppTextField(
                      label: "Email",
                      controller: _emailController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Please enter your email address.";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    AppTextField(
                      controller: _passwordController,
                      label: "Password",
                      obscureText: true,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Please enter your password.";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Text.rich(
                          AppHyperlink(
                            text: "Forgot Password?",
                            style: appFonts.white.ts,
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
                color: appColors.white,
                textStyle: appFonts.semibold.primary.ts,
                onTap: () {
                  if (_key.currentState!.validate()) {
                    context.read<AuthenticationBloc>().add(
                      LogIn(
                        email: _emailController.text,
                        password: _passwordController.text,
                      ),
                    );
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
            ],
          ),
        ),
      ),
    );
  }
}
