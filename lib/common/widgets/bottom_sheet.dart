import 'package:flutter/material.dart';
import 'package:homing_pigeon/common/extensions/single.dart';
import 'package:homing_pigeon/theme/colors.dart';

const double _buttonHeight = 64;

class ModalBottomSheet extends StatelessWidget {
  const ModalBottomSheet({
    required this.items,
    required this.buttonText,
    required this.callback,
    this.header,
    this.mainAxisSize = MainAxisSize.max,
    this.padding = EdgeInsets.zero,
    this.physics = const AlwaysScrollableScrollPhysics(),
    this.margin = EdgeInsets.zero,
    this.constraints = const BoxConstraints(),
    super.key,
  });

  final List<Widget> items;
  final MainAxisSize mainAxisSize;

  final Widget? header;
  final EdgeInsetsGeometry padding;
  final ScrollPhysics physics;

  final EdgeInsetsGeometry margin;
  final BoxConstraints constraints;

  final String buttonText;
  final VoidCallback callback;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final bottom = MediaQuery.of(context).padding.bottom;
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (header != null) header!,
        Stack(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: mainAxisSize,
              children: items,
            )
                .nestedSingleChildScrollView(physics: physics, padding: padding)
                .nestedPadding(padding: margin)
                .nestedColoredBox(color: Colors.white)
                .nestedPadding(
                  padding: EdgeInsets.only(bottom: bottom + _buttonHeight + 8),
                )
                .nestedSizedBox(width: width)
                .nestedConstrainedBox(constraints: constraints),
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: TextButton(
                onPressed: callback,
                child: Text(
                  buttonText,
                  style: const TextStyle(fontSize: 18, color: primaryTextColor),
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                )
                    .nestedCenter()
                    .nestedSizedBox(height: _buttonHeight)
                    .nestedPadding(padding: EdgeInsets.only(bottom: bottom)),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
