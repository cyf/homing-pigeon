import 'package:flutter/foundation.dart';
import 'package:homing_pigeon/common/http/base_http.dart';
import 'package:homing_pigeon/common/http/interceptors/interceptors.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

final hpHttp = HpHttp();

class HpHttp extends BaseHttp {
  HpHttp();

  @override
  void init() {
    // do something
    interceptors.addAll([
      BaseInterceptor(),
      if (!kReleaseMode) ...[
        PrettyDioLogger(
          requestHeader: true,
          requestBody: true,
        ),
      ],
    ]);
  }
}
