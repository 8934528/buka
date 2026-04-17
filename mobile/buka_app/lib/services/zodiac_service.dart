import 'dart:convert';
import 'package:http/http.dart' as http;
import 'storage_service.dart';
import 'api_config.dart';

class ZodiacService {
  static Future<Map<String, dynamic>> getZodiac(int month, int day) async {
    final baseUrl = await ApiConfig.getZodiacBaseUrl();
    final token = await StorageService.getToken();

    final response = await http.get(
      Uri.parse("$baseUrl/$month/$day"),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token",
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to load zodiac data");
    }
  }

  static Future<List<dynamic>> getHistory() async {
    final baseUrl = await ApiConfig.getZodiacBaseUrl();
    final token = await StorageService.getToken();
    
    final response = await http.get(
      Uri.parse(baseUrl + "/history"),
      headers: {
        "Authorization": "Bearer $token",
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to load history");
    }
  }
}
