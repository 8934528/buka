import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../services/zodiac_service.dart';

class ZodiacScreen extends StatefulWidget {
  const ZodiacScreen({super.key});

  @override
  State<ZodiacScreen> createState() => _ZodiacScreenState();
}

class _ZodiacScreenState extends State<ZodiacScreen>
    with SingleTickerProviderStateMixin {
  DateTime? selectedDate;
  Map<String, dynamic>? zodiacResult;
  int currentIndex = 0;

  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;
  late Animation<Offset> _slideAnimation;

  final List<Map<String, dynamic>> zodiacSigns = [
    {"sign": "Aries", "icon": Icons.emoji_emotions, "dates": "Mar 21 - Apr 19"},
    {"sign": "Taurus", "icon": Icons.agriculture, "dates": "Apr 20 - May 20"},
    {"sign": "Gemini", "icon": Icons.chat, "dates": "May 21 - Jun 20"},
    {"sign": "Cancer", "icon": Icons.water, "dates": "Jun 21 - Jul 22"},
    {"sign": "Leo", "icon": Icons.whatshot, "dates": "Jul 23 - Aug 22"},
    {"sign": "Virgo", "icon": Icons.fitness_center, "dates": "Aug 23 - Sep 22"},
    {"sign": "Libra", "icon": Icons.scale, "dates": "Sep 23 - Oct 22"},
    {"sign": "Scorpio", "icon": Icons.bolt, "dates": "Oct 23 - Nov 21"},
    {"sign": "Sagittarius", "icon": FontAwesomeIcons.arrowRight, "dates": "Nov 22 - Dec 21"},
    {"sign": "Capricorn", "icon": Icons.terrain, "dates": "Dec 22 - Jan 19"},
    {"sign": "Aquarius", "icon": Icons.water_drop, "dates": "Jan 20 - Feb 18"},
    {"sign": "Pisces", "icon": Icons.set_meal, "dates": "Feb 19 - Mar 20"},
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );

    _fadeAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeIn,
    );

    _scaleAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.elasticOut,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutCubic,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime(2000),
      firstDate: DateTime(1950),
      lastDate: DateTime.now(),
      builder: (context, child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: const ColorScheme.light(
              primary: Colors.deepPurple,
              onPrimary: Colors.white,
              surface: Colors.white,
              onSurface: Colors.black,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      setState(() {
        selectedDate = picked;
        zodiacResult = null;
      });
    }
  }

  void calculateZodiac() async {
    if (selectedDate == null) return;

    int day = selectedDate!.day;
    int month = selectedDate!.month;

    final result = await ZodiacService.getZodiac(month, day);

    setState(() {
      zodiacResult = result;
    });

    _animationController.reset();
    _animationController.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: const Text("Zodiac Finder"),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.history),
            onPressed: () {
              Navigator.pushNamed(context, '/history');
            },
          ),
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () {
              Navigator.pushNamed(context, '/profile');
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Date picker section
          Container(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: InkWell(
                    onTap: pickDate,
                    borderRadius: BorderRadius.circular(20),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.calendar_today, size: 24),
                          const SizedBox(width: 12),
                          Text(
                            selectedDate == null
                                ? "Select Birth Date"
                                : "${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}",
                            style: TextStyle(
                              fontSize: 16,
                              color: selectedDate == null 
                                  ? Colors.grey[600] 
                                  : Colors.black87,
                              fontWeight: selectedDate != null 
                                  ? FontWeight.bold 
                                  : FontWeight.normal,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: calculateZodiac,
                    icon: const Icon(Icons.auto_awesome),
                    label: const Text("Find My Sign"),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Zodiac result section with animation
          if (zodiacResult != null)
            Expanded(
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: SlideTransition(
                  position: _slideAnimation,
                  child: ScaleTransition(
                    scale: _scaleAnimation,
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      child: Card(
                        elevation: 12,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25),
                        ),
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(24),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Container(
                                width: 120,
                                height: 120,
                                decoration: BoxDecoration(
                                  color: Colors.deepPurple.withValues(alpha: 0.1),
                                  shape: BoxShape.circle,
                                ),
                                child: Image.asset(
                                  "assets/images/zodiac/${zodiacResult!["sign"].toLowerCase()}.png",
                                  errorBuilder: (context, error, stackTrace) {
                                    return Icon(
                                      Icons.star,
                                      size: 60,
                                      color: Colors.deepPurple,
                                    );
                                  },
                                ),
                              ),
                              const SizedBox(height: 16),
                              Text(
                                zodiacResult!["sign"],
                                style: const TextStyle(
                                  fontSize: 32,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.deepPurple,
                                ),
                              ),
                              const SizedBox(height: 20),
                              _buildInfoRow(Icons.favorite, "Strengths", zodiacResult!["strengths"]),
                              const SizedBox(height: 12),
                              _buildInfoRow(Icons.warning, "Weaknesses", zodiacResult!["weaknesses"]),
                              const SizedBox(height: 12),
                              _buildInfoRow(Icons.color_lens, "Colors", zodiacResult!["colors"]),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          
          if (zodiacResult == null)
            Expanded(
              child: GridView.builder(
                padding: const EdgeInsets.all(16),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.2,
                ),
                itemCount: zodiacSigns.length,
                itemBuilder: (context, index) {
                  return Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(15),
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Colors.deepPurple.withValues(alpha: 0.1),
                            Colors.deepPurple.withValues(alpha: 0.05),
                          ],
                        ),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            zodiacSigns[index]["icon"],
                            size: 40,
                            color: Colors.deepPurple,
                          ),
                          const SizedBox(height: 8),
                          Text(
                            zodiacSigns[index]["sign"],
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            zodiacSigns[index]["dates"],
                            style: TextStyle(
                              fontSize: 11,
                              color: Colors.grey[600],
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        onTap: (index) {
          setState(() {
            currentIndex = index;
          });
          if (index == 1) {
            Navigator.pushNamed(context, '/history');
          } else if (index == 2) {
            Navigator.pushNamed(context, '/profile');
          }
        },
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.white,
        selectedItemColor: Colors.deepPurple,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.auto_awesome),
            label: 'Zodiac',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.history),
            label: 'History',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, size: 20, color: Colors.deepPurple),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
