import 'dart:convert';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'api_config.dart';

class AuthService {
  static Future<String> login(String email, String password) async {
    try {
      final baseUrl = await ApiConfig.getAuthBaseUrl();
      final res = await http.post(
        Uri.parse("$baseUrl/login"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "email": email.trim(),
          "password": password,
          "passwordHash": password
        }),
      ).timeout(const Duration(seconds: 30));

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        return data["token"];
      } else {
        final error = jsonDecode(res.body);
        throw Exception(error["message"] ?? "Login failed");
      }
    } on TimeoutException {
      throw Exception("Request timeout. Check backend connection.");
    } catch (e) {
      throw Exception(e.toString().replaceAll("Exception:", "").trim());
    }
  }

  static Future<void> register(String name, String email, String password) async {
    try {
      final baseUrl = await ApiConfig.getAuthBaseUrl();
      final res = await http.post(
        Uri.parse("$baseUrl/register"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": name,
          "email": email.trim(),
          "password": password,
          "passwordHash": password,
        }),
      ).timeout(const Duration(seconds: 30));

      if (res.statusCode != 200) {
        final error = jsonDecode(res.body);
        throw Exception(error["message"] ?? "Registration failed");
      }
    } on TimeoutException {
      throw Exception("Request timeout. Check backend connection.");
    } catch (e) {
      throw Exception(e.toString().replaceAll("Exception:", "").trim());
    }
  }
}
