// particles.js
class Particle {
  constructor(canvasContext, width, height, removedStarsCount, mouseX = Math.random() * width, mouseY = Math.random() * height, index) {
    this.canvasContext = canvasContext;
    this.width = width;
    this.height = height;
    this.removedStarsCount = removedStarsCount; // 追加
    this.x = mouseX;
    this.y = mouseY;
      this.size = Math.random() * 0 + 0.5; // Adjust initial size
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.hue = Math.random() * 360; // Set hue once
      this.saturation = 50;
      this.lightness = 50;
      this.index = index;
      this.opacity = 1; // New property for opacity
    }
  
    // Add a method to change the size of the particle based on the mouse position
    mouseEffect(mouseX, mouseY) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 30 + this.removedStarsCount * 0.1) { // Increase the reaction distance
        this.size = 5 + this.removedStarsCount * 0.03; // Increase the size when the mouse is near
      } else {
        this.size -= 0.1;
        if (this.size < 0.2) this.size = 0.2;
      }
    }
  
    update(mouseX, mouseY) {
      // Calculate the direction vector from the particle to the mouse cursor
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
    
      // Normalize the direction vector and scale it by the particle's speed
      const dirX = dx / dist * this.speedX;
      const dirY = dy / dist * this.speedY;
    
      // Move the particle towards the mouse cursor
      this.x += dirX;
      this.y += dirY;
    
      if (this.size > 0.2) this.size -= 1/(100 + this.removedStarsCount*10);
      // Assuming 60 frames per second, decrease opacity by 1/120 per frame to disappear in 2 seconds
      if (this.opacity > 0) this.opacity -= 1/(100 + this.removedStarsCount*10); 
      else {
        this.resetParticle();
      }
    
      if (this.size <= 0.2) {
        this.resetParticle();
      }
    }

    resetParticle() {
      // パーティクルの位置をランダムにリセット
      this.x = Math.random() * this.width;
      this.y = Math.random() * this.height;
      this.size = Math.random() * 0 + 0.5;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.hue = Math.random() * 360;
      this.opacity = 1;
    }
  
    draw() {
      this.canvasContext.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity})`; // Use the same color
      if (this.index % 2 >= 0) {
        // Draw a star
this.canvasContext.beginPath();
for (let i = 0; i < 5; i++) {
  this.canvasContext.lineTo(this.x + this.size * Math.cos((Math.PI * 2 * i - Math.PI / 2) / 5), this.y + this.size * Math.sin((Math.PI * 2 * i - Math.PI / 2) / 5));
  this.canvasContext.lineTo(this.x + this.size/2 * Math.cos((Math.PI * 2 * (i + 0.5) - Math.PI / 2) / 5), this.y + this.size/2 * Math.sin((Math.PI * 2 * (i + 0.5) - Math.PI / 2) / 5));
}
this.canvasContext.closePath();
      } else {
        // Draw a heart
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.x, this.y - this.size / 4);
        this.canvasContext.bezierCurveTo(this.x, this.y - this.size, this.x + this.size, this.y - this.size, this.x + this.size, this.y - this.size / 2);
        this.canvasContext.bezierCurveTo(this.x + this.size, this.y + this.size, this.x - this.size, this.y + this.size, this.x - this.size, this.y - this.size / 2);
        this.canvasContext.bezierCurveTo(this.x - this.size, this.y - this.size, this.x, this.y - this.size, this.x, this.y - this.size / 4);
        this.canvasContext.closePath();
      }
      this.canvasContext.fill();
    }
  }
  
  export default Particle;