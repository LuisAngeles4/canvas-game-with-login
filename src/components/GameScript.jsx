import React, { useRef, useEffect } from "react";

const GameScript = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const window_height = window.innerHeight;
    const window_width = window.innerWidth;

    canvas.height = window_height;
    canvas.width = window_width;
    canvas.style.background = "#ff8";

    class Circle {
      constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
      }

      draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
      }

      update(context) {
        this.draw(context);
        this.posX += this.dx;
        this.posY += this.dy;

        // Verificar y corregir colisiones con los bordes
        if (this.posX + this.radius > window_width) {
          this.posX = window_width - this.radius;
          this.dx = -this.dx;
        } else if (this.posX - this.radius < 0) {
          this.posX = this.radius;
          this.dx = -this.dx;
        }

        if (this.posY - this.radius < 0) {
          this.posY = this.radius;
          this.dy = -this.dy;
        } else if (this.posY + this.radius > window_height) {
          this.posY = window_height - this.radius;
          this.dy = -this.dy;
        }
      }

      handleCollision(otherCircle) {
        const dx = otherCircle.posX - this.posX;
        const dy = otherCircle.posY - this.posY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + otherCircle.radius;

        if (distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const thisVx = this.dx * cos + this.dy * sin;
          const thisVy = this.dy * cos - this.dx * sin;

          const otherVx = otherCircle.dx * cos + otherCircle.dy * sin;
          const otherVy = otherCircle.dy * cos - otherCircle.dx * sin;

          const newThisVx = otherVx;
          const newOtherVx = thisVx;
          const newThisVy = thisVy;
          const newOtherVy = otherVy;

          this.dx = newThisVx * cos - newThisVy * sin;
          this.dy = newThisVy * cos + newThisVx * sin;
          otherCircle.dx = newOtherVx * cos - newOtherVy * sin;
          otherCircle.dy = newOtherVy * cos + newOtherVx * sin;

          const moveX = (minDistance - distance) * Math.cos(angle);
          const moveY = (minDistance - distance) * Math.sin(angle);

          if (this.posX - this.radius < 0) {
            this.posX = this.radius;
          } else if (this.posX + this.radius > window_width) {
            this.posX = window_width - this.radius;
          }
          if (this.posY - this.radius < 0) {
            this.posY = this.radius;
          } else if (this.posY + this.radius > window_height) {
            this.posY = window_height - this.radius;
          }
        }
      }
    }

    const getColor = () => {
      return (
        "#" +
        [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)
          .join("")
      );
    };

    const arrayCircle = [];
    for (let i = 0; i < 10; i++) {
      const randomRadius = Math.floor(Math.random() * 100 + 20);
      let randomX, randomY;
      do {
        randomX = Math.random() * window_width;
        randomY = Math.random() * window_height;
        const tooClose = arrayCircle.some((circle) => {
          const dx = circle.posX - randomX;
          const dy = circle.posY - randomY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < circle.radius + randomRadius + 60;
        });
        if (!tooClose) {
          break;
        }
      } while (true);

      const myCircle = new Circle(
        randomX,
        randomY,
        randomRadius,
        getColor(),
        i + 1,
        2
      );
      arrayCircle.push(myCircle);
      arrayCircle[i].draw(ctx);
    }

    const position = (posX1, posY1, posX2, posY2) => {
      const distanciaCentros = Math.sqrt(
        Math.pow(posX2 - posX1, 2) + Math.pow(posY2 - posY1, 2)
      );

      return distanciaCentros;
    };

    const updateCircle = () => {
      requestAnimationFrame(updateCircle);

      ctx.clearRect(0, 0, window_width, window_height);

      for (let i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update(ctx);
      }

      for (let i = 0; i < arrayCircle.length; i++) {
        for (let j = i + 1; j < arrayCircle.length; j++) {
          const distance = position(
            arrayCircle[i].posX,
            arrayCircle[i].posY,
            arrayCircle[j].posX,
            arrayCircle[j].posY
          );
          if (distance <= arrayCircle[i].radius + arrayCircle[j].radius) {
            arrayCircle[i].handleCollision(arrayCircle[j]);
            arrayCircle[i].color = getColor();
            arrayCircle[j].color = getColor();
          }
        }
      }
    };

    updateCircle();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default GameScript;
