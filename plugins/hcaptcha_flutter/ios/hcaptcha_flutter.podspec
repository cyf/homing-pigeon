#
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html.
# Run `pod lib lint hcaptcha_flutter.podspec` to validate before publishing.
#
Pod::Spec.new do |s|
  s.name             = 'hcaptcha_flutter'
  s.version          = '0.0.1'
  s.summary          = 'HCaptcha for Flutter.'
  s.description      = <<-DESC
HCaptcha for Flutter.
                       DESC
  s.homepage         = 'https://kjxbyz.com'
  s.license          = { :file => '../LICENSE' }
  s.author           = { 'kjxbyz' => 'kjxbyz@163.com' }
  s.source           = { :path => '.' }
  s.source_files = 'Classes/**/*.{h,m,swift}'
  s.public_header_files = 'Classes/**/*.h'
  s.module_map = 'Classes/HCaptchaFlutterPlugin.modulemap'
  s.static_framework = true
  s.dependency 'Flutter'
  s.dependency 'HCaptcha', '2.5.1'
  s.platform = :ios, '11.0'
  s.ios.deployment_target = '11.0'
  s.swift_version  = '5.0'

  # Flutter.framework does not contain a i386 slice.
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES', 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'i386' }
end
