window.Color4Bg = {
  BlurGradientBg: class {
    constructor({
      dom = "color-bg-box",
      colors = ["#11694E", "#48BF91", "#8FD9A8", "#15997A"],
      loop = true,
      seed = 1188,
      noise = 0,
      speed = 1.5,
    }) {
      this.canvas = document.createElement("canvas");
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.canvas.style.display = "block";
      this.canvas.style.position = "absolute";
      this.canvas.style.top = 0;
      this.canvas.style.left = 0;
      this.canvas.style.zIndex = "-1";

      const container = document.getElementById(dom);
      if (!container) throw new Error(`Element with id "${dom}" not found`);
      container.style.position = "relative";
      container.appendChild(this.canvas);

      this.ctx = this.canvas.getContext("2d");
      this.colors = colors;
      this.loop = loop;
      this.seed = seed;
      this.noise = Math.max(0, Math.min(10, noise));
      this.speed = speed <= 0 ? 1 : speed;

      this.running = true;
      this.time = 0;
      this.resize();
      window.addEventListener("resize", () => this.resize());

      this.play();
    }

    resize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }

    draw() {
      const { width, height } = this.canvas;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.min(width, height) / 1.5
      );

      const len = this.colors.length;
      for (let i = 0; i < len; i++) {
        const t = (Math.sin(this.time * 0.002 * this.speed + i) + 1) / 2;
        gradient.addColorStop(i / len, this.colors[i]);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (this.noise > 0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const noiseVal = (Math.random() - 0.5) * this.noise * 5;
          imageData.data[i] += noiseVal;
          imageData.data[i + 1] += noiseVal;
          imageData.data[i + 2] += noiseVal;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }

    tick = () => {
      if (!this.running) return;
      this.time += this.speed;
      this.draw();
      this.raf = requestAnimationFrame(this.tick);
    };

    play() {
      if (!this.running) {
        this.running = true;
        this.tick();
      }
    }

    pause() {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }
  }
};
