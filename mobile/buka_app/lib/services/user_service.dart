import 'dart:convert';
import 'package:http/http.dart' as http;
import 'storage_service.dart';
import 'api_config.dart';

class UserService {
  static Future<Map<String, dynamic>> getProfile() async {
    final baseUrl = await ApiConfig.getUserBaseUrl();
    final token = await StorageService.getToken();

    final res = await http.get(
      Uri.parse("$baseUrl/profile"),
      headers: {
        "Authorization": "Bearer $token",
        "Content-Type": "application/json",
      },
    );

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    } else {
      throw Exception("Failed to load profile");
    }
  }

  static Future<Map<String, dynamic>> updateProfile({
    required String name,
    required String email,
  }) async {
    final baseUrl = await ApiConfig.getUserBaseUrl();
    final token = await StorageService.getToken();

    final res = await http.put(
      Uri.parse("$baseUrl/profile"),
      headers: {
        "Authorization": "Bearer $token",
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "name": name.trim(),
        "email": email.trim(),
      }),
    );

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    }

    try {
      final body = jsonDecode(res.body);
      throw Exception(body["message"] ?? "Failed to update profile");
    } catch (_) {
      throw Exception("Failed to update profile");
    }
  }
}
