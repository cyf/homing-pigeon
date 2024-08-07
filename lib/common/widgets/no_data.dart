// Flutter imports:
import 'package:flutter/material.dart';

// Package imports:
import 'package:gap/gap.dart';

// Project imports:
import 'package:pigeon/common/extensions/extensions.dart';

class NoData extends StatelessWidget {
  const NoData({
    required this.icon,
    this.title,
    this.content,
    super.key,
  });

  final Widget icon;
  final Widget? title;
  final Widget? content;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        icon,
        if (title != null) ...[const Gap(8), title!],
        if (content != null) ...[const Gap(8), content!],
      ],
    ).nestedCenter();
  }
}
