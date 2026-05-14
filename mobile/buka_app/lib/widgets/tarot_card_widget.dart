import 'dart:math';
import 'package:flutter/material.dart';

class TarotCardWidget extends StatefulWidget {
  final String cardName;
  final String imageUrl;
  final String description;
  final bool isReversed;

  const TarotCardWidget({
    super.key,
    required this.cardName,
    required this.imageUrl,
    required this.description,
    this.isReversed = false,
  });

  @override
  State<TarotCardWidget> createState() => _TarotCardWidgetState();
}

class _TarotCardWidgetState extends State<TarotCardWidget> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  bool _isFront = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutBack),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _flipCard() {
    if (_isFront) {
      _controller.reverse();
    } else {
      _controller.forward();
    }
    _isFront = !_isFront;
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _flipCard,
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          final angle = _animation.value * pi;
          final isUnder = angle > pi / 2;
          
          return Transform(
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001)
              ..rotateY(angle),
            alignment: Alignment.center,
            child: isUnder ? _buildFront() : _buildBack(),
          );
        },
      ),
    );
  }

  Widget _buildFront() {
    return Transform(
      transform: Matrix4.identity()..rotateY(pi)..rotateZ(widget.isReversed ? pi : 0),
      alignment: Alignment.center,
      child: Container(
        width: 200,
        height: 320,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 10,
              spreadRadius: 2,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            fit: StackFit.expand,
            children: [
              // Use a placeholder if image url is empty or failing
              widget.imageUrl.isNotEmpty
                  ? Image.network(
                      widget.imageUrl,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) => _buildFallbackFront(),
                    )
                  : _buildFallbackFront(),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.transparent, Colors.black87],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    stops: const [0.6, 1.0],
                  ),
                ),
              ),
              Positioned(
                bottom: 16,
                left: 16,
                right: 16,
                child: Text(
                  widget.cardName + (widget.isReversed ? ' (Reversed)' : ''),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFallbackFront() {
    return Container(
      color: Colors.deepPurple[800],
      child: Center(
        child: Icon(
          Icons.auto_awesome,
          color: Colors.amber[300],
          size: 64,
        ),
      ),
    );
  }

  Widget _buildBack() {
    return Container(
      width: 200,
      height: 320,
      decoration: BoxDecoration(
        color: Colors.indigo[900],
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.amber, width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 10,
            spreadRadius: 2,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Center(
        child: Container(
          width: 170,
          height: 290,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.amber.withValues(alpha: 0.5), width: 1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: CustomPaint(
            painter: StarPatternPainter(),
          ),
        ),
      ),
    );
  }
}

class StarPatternPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.amber.withValues(alpha: 0.3)
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;

    final center = Offset(size.width / 2, size.height / 2);
    final radius = min(size.width, size.height) / 3;

    for (int i = 0; i < 6; i++) {
      final angle = i * pi / 3;
      final x1 = center.dx + radius * cos(angle);
      final y1 = center.dy + radius * sin(angle);
      final x2 = center.dx + radius * cos(angle + pi);
      final y2 = center.dy + radius * sin(angle + pi);
      
      canvas.drawLine(Offset(x1, y1), Offset(x2, y2), paint);
    }
    
    canvas.drawCircle(center, radius * 0.8, paint);
    canvas.drawCircle(center, radius * 0.4, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
