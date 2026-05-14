import 'dart:convert';
import 'package:http/http.dart' as http;
import 'api_config.dart';
import 'storage_service.dart';

class TarotService {
  Future<Map<String, String>> _getHeaders() async {
    final token = await StorageService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  Future<Map<String, dynamic>> drawCard() async {
    try {
      final baseUrl = await ApiConfig.getTarotBaseUrl();
      final response = await http.get(
        Uri.parse('$baseUrl/draw'),
        headers: await _getHeaders(),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to draw tarot card. Status: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to connect to tarot service: $e');
    }
  }

  Future<List<dynamic>> getReadingHistory() async {
    try {
      final baseUrl = await ApiConfig.getTarotBaseUrl();
      final response = await http.get(
        Uri.parse('$baseUrl/history'),
        headers: await _getHeaders(),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to get reading history. Status: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to connect to tarot service: $e');
    }
  }
}
