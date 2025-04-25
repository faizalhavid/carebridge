import 'dart:ui';

import 'package:carebridge_app/features/auth/ui/page/login_page.dart';
import 'package:carebridge_app/features/tracking/bloc/tracing_user_location_cubit.dart';
import 'package:carebridge_app/shared/bloc/authentification_bloc.dart';
import 'package:carebridge_app/shared/service/dio_service.dart';
import 'package:carebridge_commons/carebridge_commons.dart';
import 'package:carebridge_commons/helper/snackbar_helper.dart';
import 'package:carebridge_models/carebridge_models.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:firebase_core/firebase_core.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  DartPluginRegistrant.ensureInitialized();
  await _initHive();

  await Firebase.initializeApp();
  // await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  await _initNotification();

  runApp(const MainApp());
}

Future<void> _initHive() async {
  await Hive.initFlutter();
  Hive.registerAdapter(AppNotificationAdapter());
}

Future<void> _initNotification() async {
  //  await FirebaseService.init();

  // FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  //   if (kDebugMode) {
  //     print('Handling a foreground message: ${message.messageId}');
  //     print('Message data: ${message.data}');
  //     print('Message notification: ${message.notification?.title}');
  //     print('Message notification: ${message.notification?.body}');
  //   }

  //   _messageStreamController.sink.add(message);
  // });
  // FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  // const InitializationSettings initializationSettings = InitializationSettings(
  //   android: AndroidInitializationSettings('@mipmap/launcher_icon'),
  //   iOS: DarwinInitializationSettings(),
  // );

  //await flutterLocalNotificationsPlugin.initialize(initializationSettings);
}

final GlobalKey<NavigatorState> _navigatorKey = GlobalKey<NavigatorState>();

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  late final AuthenticationBloc _authenticationBloc;
  late final TracingUserLocationCubit _tracingUserLocation;

  @override
  void initState() {
    super.initState();
    _authenticationBloc = AuthenticationBloc()..add(AuthCheck());
    _tracingUserLocation = TracingUserLocationCubit();
  }

  @override
  void dispose() {
    _authenticationBloc.close();
    _tracingUserLocation.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GlobalLoaderOverlay(
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthenticationBloc>(
            create: (context) => _authenticationBloc,
          ),
          BlocProvider<TracingUserLocationCubit>(
            create: (context) => _tracingUserLocation,
          ),
        ],
        child: MaterialApp(
          navigatorKey: _navigatorKey,
          home: BlocListener<TracingUserLocationCubit, TrackingState>(
            bloc: _tracingUserLocation,
            listener: (context, state) {
              if (state is ErrorTrackingState) {
                SnackbarHelper.showSnackbarError(context, state.errorMessage);
              }
              // if (state is StartTrackingState) {
              //   BackgroundService.init(state.orderId);
              //   // TrackingService().startTracking(state.orderId);
              // }
              // if (state is StopTrackingState) {
              //   BackgroundService.stop();
              //   // TrackingService().stopTracking();
              // }
            },
            child: BlocConsumer<AuthenticationBloc, AuthenticationState>(
              bloc: _authenticationBloc,
              listener: (context, state) {
                print("debug state: $state");
                if (state is AuthFailed) {
                  SnackbarHelper.showSnackbarError(
                    context,
                    state.message ?? "Auth Failed",
                  );
                }
                if (state is AuthLoading) {
                  context.loaderOverlay.show();
                } else {
                  context.loaderOverlay.hide();
                }

                if (state is LoggedOut) {
                  WidgetsBinding.instance.addPersistentFrameCallback((_) {
                    Navigator.popUntil(context, (route) => route.isFirst);
                  });
                }
              },
              builder: (context, state) {
                if (state is LoggedIn) {
                  return const MyHomePage(title: 'CareBridge App');
                } else {
                  return const LoginPage();
                }
              },
            ),
          ),
        ),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // TRY THIS: Try changing the color here to a specific color (to
        // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
        // change color while the other colors stay the same.
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          //
          // TRY THIS: Invoke "debug painting" (choose the "Toggle Debug Paint"
          // action in the IDE, or press "p" in the console), to see the
          // wireframe for each widget.
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
              style: TextStyle(color: Colors.white),
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
