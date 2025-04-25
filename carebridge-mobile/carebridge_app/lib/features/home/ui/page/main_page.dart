import 'package:flutter/material.dart';
import 'package:my_chauffeur_driver/features/chat/ui/page/chat_list_page.dart';
import 'package:my_chauffeur_driver/features/home/model/bottom_bar_menu.dart';
import 'package:my_chauffeur_driver/features/home/ui/page/home_page.dart';
import 'package:my_chauffeur_driver/features/home/ui/widget/bottom_bar_navigation_widget.dart';
import 'package:my_chauffeur_driver/features/order/ui/page/order_page.dart';
import 'package:my_chauffeur_driver/features/profile/ui/page/profile_page.dart';
import 'package:my_chauffeur_driver/features/order_b2c/ui/page/booking_page.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int curIndex = 0;

  final List<Widget> _pages = [
    const HomePage(),
    const OrderPage(),
    const BookingPage(),
    const ChatListPage(),
    const ProfilePage(),
  ];

  final List<BottomBarMenu> _bottomBarMenus = [
    BottomBarMenu(title: "Home", iconPath: "assets/icons/ic_home.svg"),
    BottomBarMenu(title: "Assigned", iconPath: "assets/icons/ic_booking.svg"),
    BottomBarMenu(
      title: "Assigned B2B",
      iconPath: "assets/icons/ic_booking.svg",
    ),
    BottomBarMenu(title: "Chat", iconPath: "assets/icons/ic_chat.svg"),
    BottomBarMenu(title: "Profile", iconPath: "assets/icons/ic_avatar.svg"),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(context).padding.bottom),
        child: BottomBarNavigationWidget(
          menus: _bottomBarMenus,
          selectedIndex: curIndex,
          onTap: (index) {
            setState(() {
              curIndex = index;
            });
          },
        ),
      ),
      body: _pages.elementAt(curIndex),
    );
  }
}
