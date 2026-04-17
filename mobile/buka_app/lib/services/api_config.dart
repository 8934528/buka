import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';

class ApiConfig {
  static const String _overrideBaseUrl = String.fromEnvironment('API_BASE_URL', defaultValue: '');
  static const String _physicalOverrideBaseUrl = String.fromEnvironment('API_BASE_URL_PHYSICAL', defaultValue: '');
  static const String _emulatorBaseUrl = 'http://10.0.2.2:5280';
  static const String _physicalUsbBaseUrl = 'http://localhost:5280';

  static Future<String> getApiBaseUrl() async {
    if (_overrideBaseUrl.isNotEmpty) {
      return _overrideBaseUrl.replaceAll(RegExp(r'/$'), '');
    }

    if (Platform.isAndroid) {
      final info = await DeviceInfoPlugin().androidInfo;
      if (!info.isPhysicalDevice) {
        return _emulatorBaseUrl;
      }
      if (_physicalOverrideBaseUrl.isNotEmpty) {
        return _physicalOverrideBaseUrl.replaceAll(RegExp(r'/$'), '');
      }
      return _physicalUsbBaseUrl;
    }

    return 'http://localhost:5280';
  }

  static Future<String> getAuthBaseUrl() async {
    final root = await getApiBaseUrl();
    return '$root/api/auth';
  }

  static Future<String> getUserBaseUrl() async {
    final root = await getApiBaseUrl();
    return '$root/api/user';
  }

  static Future<String> getZodiacBaseUrl() async {
    final root = await getApiBaseUrl();
    return '$root/api/zodiac';
  }
}
