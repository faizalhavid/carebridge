import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:loader_overlay/loader_overlay.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  late final RegisterCubit _registerCubit;

  final _usernameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _registerCubit = RegisterCubit();
  }

  @override
  void dispose() {
    _registerCubit.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<RegisterCubit, StateController<bool>>(
      bloc: _registerCubit,
      listener: (context, state) {
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
                    Center(
                      child: Text(
                        "Register Driver Account",
                        style: appFonts.primary.bold.titleSmall.ts,
                      ),
                    ),
                    const SizedBox(height: 5),
                    Center(
                      child: Text(
                        "to get started now!",
                        style: appFonts.primary.ts,
                      ),
                    ),
                    const SizedBox(height: 50),
                    AppTextField(
                      controller: _usernameController,
                      label: "Username",
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Username is required";
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
                          return "Email is required";
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
                          return "Password is required";
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
                          return "Confirm Password is required";
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
              AppButton(
                text: "Next Register",
                isFitParent: true,
                textStyle: appFonts.white.ts,
                onTap: () {
                  if (_formKey.currentState!.validate()) {
                    if (_passwordController.text !=
                        _confirmPasswordController.text) {
                      SnackbarHelper.showSnackbarError(
                        context,
                        "Password and Confirm Password not match",
                      );
                      return;
                    }
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder:
                            (context) => RegisterProfilePage(
                              name: _usernameController.text,
                              email: _emailController.text,
                              password: _passwordController.text,
                              passwordConfirmation:
                                  _confirmPasswordController.text,
                            ),
                      ),
                    );
                    // _registerCubit.register(
                    //   name: _usernameController.text,
                    //   email: _emailController.text,
                    //   password: _passwordController.text,
                    //   passwordConfirmation: _confirmPasswordController.text,
                    // );
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
                      children: [
                        AppHyperlink(
                          text: "Login now",
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
