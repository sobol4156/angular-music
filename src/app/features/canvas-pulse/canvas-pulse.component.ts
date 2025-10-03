import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-pulse',
  template: `<canvas #pulseCanvas class="pulse-canvas"></canvas>`,
  styleUrls: ['./canvas-pulse.component.less']
})
export class PulseCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pulseCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  private particles: { x: number; y: number; radius: number; alpha: number; speed: number; }[] = [];
  private waves: { radius: number; alpha: number; speed: number; }[] = [];
  private hue: number = 0; // глобальный цвет для плавного перелива
  private animationSpeedFactor: number = 6; // замедление анимации

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.startAnimation();
  }

  @HostListener('window:resize')
  onResize() {
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
  }

  private startAnimation(): void {
    const createParticle = () => {
      const radius = Math.random() * 3 + 2;
      const sideMargin = window.innerWidth * 0.15;

      // x выбирается случайно либо в левой, либо в правой зоне
      const x = Math.random() < 0.5
        ? Math.random() * sideMargin // слева
        : window.innerWidth - Math.random() * sideMargin; // справа
      const y = window.innerHeight - radius; // снизу

      this.particles.push({
        x,
        y,
        radius,
        alpha: 0, // начинаем с прозрачности 0 для плавного появления
        speed: (0.5 + Math.random() * 1) / this.animationSpeedFactor
      });
    };

    const createWave = () => {
      this.waves.push({
        radius: 0,
        alpha: 0.3,
        speed: (2 + Math.random() * 1) / this.animationSpeedFactor
      });
    };

    const draw = () => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // плавное увеличение hue
      this.hue += 0.2 / this.animationSpeedFactor;
      if (this.hue > 360) this.hue -= 360;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // центральное свечение
      const glow = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 450);
      glow.addColorStop(0, `hsla(${this.hue}, 80%, 70%, 0.3)`);
      glow.addColorStop(1, `hsla(${this.hue}, 80%, 70%, 0)`);
      this.ctx.fillStyle = glow;
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // частицы
      this.particles.forEach((p, i) => {
        p.y -= p.speed;

        // плавное появление
        if (p.alpha < 1) p.alpha += 0.01;
        p.alpha -= 0.0005; // медленное исчезновение

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const color = `hsla(${this.hue}, 80%, 60%, ${p.alpha})`;
        this.ctx.fillStyle = color;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = color;
        this.ctx.fill();

        if (p.alpha <= 0) this.particles.splice(i, 1);
      });

      // волны
      this.waves.forEach((w, i) => {
        w.radius += w.speed;
        w.alpha -= 0.0005; // медленное исчезновение

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, w.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `hsla(${this.hue}, 80%, 60%, ${w.alpha})`;
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 15]);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        if (w.alpha <= 0) this.waves.splice(i, 1);
      });

      this.animationId = requestAnimationFrame(draw);
    };

    setInterval(createParticle, 200 * this.animationSpeedFactor);
    setInterval(createWave, 1000 * this.animationSpeedFactor);
    draw();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }
}
