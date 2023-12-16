import 'package:flutter/material.dart';
import 'package:homing_pigeon/app/navigator.dart';

///
class NavigatorUtil {
  static void push<T extends Object?>(
    Widget widget, {
    RouteSettings? settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
    String? barrierLabel,
  }) {
    Navigator.push<T>(
      AppNavigator.key.currentContext!,
      MaterialPageRoute<T>(
        builder: (BuildContext context) => widget,
        settings: settings,
        maintainState: maintainState,
        fullscreenDialog: fullscreenDialog,
      ),
    );
  }

  static void pushAndRemoveUntil<T extends Object?>(
    Widget widget,
    RoutePredicate predicate, {
    RouteSettings? settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
    String? barrierLabel,
  }) {
    Navigator.pushAndRemoveUntil<T>(
      AppNavigator.key.currentContext!,
      MaterialPageRoute<T>(
        builder: (BuildContext context) => widget,
        settings: settings,
        maintainState: maintainState,
        fullscreenDialog: fullscreenDialog,
      ),
      predicate,
    );
  }

  static void pushReplacement<T extends Object?, TO extends Object?>(
    Widget widget, {
    RouteSettings? settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
    String? barrierLabel,
  }) {
    Navigator.pushReplacement<T, TO>(
      AppNavigator.key.currentContext!,
      MaterialPageRoute<T>(
        builder: (BuildContext context) => widget,
        settings: settings,
        maintainState: maintainState,
        fullscreenDialog: fullscreenDialog,
      ),
    );
  }

  static void pop() {
    Navigator.pop(AppNavigator.key.currentContext!);
  }
}
