// Flutter imports:
import 'package:flutter/material.dart';

// Project imports:
import 'package:pigeon/common/extensions/extensions.dart';
import 'package:pigeon/theme/colors.dart';

typedef BaseFormItemCallback = void Function();

class BaseFormItem extends StatelessWidget {
  const BaseFormItem({
    required this.child,
    this.title,
    this.required = true,
    this.showTip = true,
    this.padding = const EdgeInsets.only(top: 10),
    this.mainAxisAlignment = MainAxisAlignment.start,
    this.mainAxisSize = MainAxisSize.max,
    this.tipWidget,
    this.onTipTap,
    super.key,
  });

  final Widget child;
  final String? title;
  final bool required;
  final bool showTip;
  final EdgeInsetsGeometry padding;
  final MainAxisAlignment mainAxisAlignment;
  final MainAxisSize mainAxisSize;
  final Widget? tipWidget;
  final BaseFormItemCallback? onTipTap;

  @override
  Widget build(BuildContext context) {
    return title != null
        ? Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: mainAxisSize,
            children: [
              if (!showTip)
                getContent(context)
              else
                getContent(context)
                    .addWidgetAsList(
                      tipWidget == null
                          ? tips
                          : tipWidget!.nestedTap(() {
                              onTipTap?.call();
                            }),
                    )
                    .nestedRow(mainAxisAlignment: mainAxisAlignment),
              child,
            ],
          ).nestedPadding(padding: padding)
        : Padding(
            padding: padding,
            child: child,
          );
  }

  Widget getContent(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return RichText(
      text: TextSpan(
        children: [
          if (required)
            const TextSpan(
              text: '*',
              style: TextStyle(
                color: errorTextColor,
                fontSize: 14,
                fontWeight: FontWeight.w400,
              ),
            ),
          TextSpan(
            text: title,
            style: TextStyle(
              color: isDark ? Colors.white : primaryTextColor,
              fontSize: 14,
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget get tips {
    return IconButton(
      style: ButtonStyle(
        padding: WidgetStateProperty.all(EdgeInsets.zero),
        elevation: WidgetStateProperty.all(0),
        minimumSize: WidgetStateProperty.all(Size.zero),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      ),
      onPressed: onTipTap,
      icon: const Icon(
        Icons.info,
        size: 14,
        color: primaryColor,
      ),
    ).nestedPadding(padding: const EdgeInsets.only(left: 4));
  }
}
