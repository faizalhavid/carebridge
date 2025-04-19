import 'package:carebridge_app/features/auth/AuthCubit.dart';
import 'package:carebridge_app/shared/bloc/authentification_bloc.dart';
import 'package:carebridge_app/shared/bloc/state_controller.dart';
import 'package:carebridge_commons/helper/snackbar_helper.dart';
import 'package:carebridge_theme/themes/app_button.dart';
import 'package:carebridge_theme/themes/app_colors.dart';
import 'package:carebridge_theme/themes/app_fonts.dart';
import 'package:carebridge_theme/themes/app_hyperlink.dart';
import 'package:carebridge_theme/themes/app_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:loader_overlay/loader_overlay.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  late final AuthCubit _authCubit;

  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _authCubit = AuthCubit(context.read<AuthenticationBloc>());
  }

  @override
  void dispose() {
    _authCubit.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthCubit, StateController<bool>>(
      bloc: _authCubit,
      listener: (context, state) {
        if (state is Success) {
          if (state is Success) {
            // _authenticationBloc.add(
            //   LogIn(
            //     email: _emailController.text,
            //     password: _passwordController.text,
            //   ),
            // );
            // Navigator.of(context).push(MaterialPageRoute(
            //   builder: (context) => const RegisterProfilePage(),
            // ));
            // SnackbarHelper.showSnackbarSuccess(context, "Registration Success");
          }
          SnackbarHelper.showSnackbarSuccess(
            context,
            "Registration Successful",
          );
        }

        if (state is Loading) {
          context.loaderOverlay.show();
        } else {
          context.loaderOverlay.hide();
        }

        if (state is Error) {
          SnackbarHelper.showSnackbarError(
            context,
            state.inferredErrorMessage ?? "Something went wrong",
          );
        }
      },
      child: Scaffold(
        backgroundColor: appColors.white,
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 100),
                    Image.asset("assets/icons/ic_logo.png", width: 200),
                    const SizedBox(height: 100),
                    Center(
                      child: Text(
                        "Create Your Carebridge Account",
                        style: appFonts.titleSmall.bold.primary.ts,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Center(
                      child: Text(
                        "Join us to take control of your health and wellness.",
                        style: appFonts.primary.ts,
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const SizedBox(height: 50),
                    AppTextField(
                      controller: _usernameController,
                      label: "Full Name",
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Full Name is required.";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    AppTextField(
                      controller: _emailController,
                      label: "Email",
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Email is required.";
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
                          return "Password is required.";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    AppTextField(
                      controller: _confirmPasswordController,
                      label: "Confirm Password",
                      obscureText: true,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Confirm Password is required.";
                        }
                        if (value != _passwordController.text) {
                          return "Passwords do not match.";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
              AppButton(
                text: "Register Now",
                isFitParent: true,
                color: appColors.white,
                textStyle: appFonts.semibold.primary.ts,
                onTap: () {
                  if (_formKey.currentState!.validate()) {
                    _authCubit.registerAccount(
                      fullName: _usernameController.text,
                      email: _emailController.text,
                      password: _passwordController.text,
                      confirmPassword: _confirmPasswordController.text,
                      token: "",
                      mobilePhone: "",
                      fcmToken: "",
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
                      text: "Already have an account? ",
                      style: appFonts.primary.ts,
                      children: [
                        AppHyperlink(
                          text: "Login Now",
                          style: appFonts.primary.bold.ts,
                          onTap: () {
                            Navigator.pop(context);
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
