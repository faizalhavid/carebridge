import 'package:flutter/material.dart';

class LoginWithButton extends StatelessWidget {
  final Widget child;
  final Function() onPressed;
  const LoginWithButton({
    Key? key,
    required this.child,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(5)),
      ),
      clipBehavior: Clip.antiAlias,
      elevation: 1,
      child: InkWell(
        onTap: onPressed,
        splashColor: Colors.grey.withOpacity(0.2),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
          child: child,
        ),
      ),
    );
  }
}