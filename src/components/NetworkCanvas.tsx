"use client";
import React, { useEffect, useRef } from "react";

class Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 0.5;
    }

    update(canvasWidth: number, canvasHeight: number, mouse: { x: number, y: number }) {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;

        // Mouse interaction (repel)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (distance < maxDist) {
            const force = (maxDist - distance) / maxDist;
            this.x -= (dx / distance) * force * 3;
            this.y -= (dy / distance) * force * 3;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.4)";
        ctx.fill();
    }
}

export default function NetworkCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: Node[] = [];

        let mouse = { x: -1000, y: -1000 };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNodes();
        };

        const initNodes = () => {
            nodes = [];
            // Scale node count by screen size for performance
            const numNodes = Math.floor((canvas.width * canvas.height) / 12000);
            // Cap max nodes to avoid mobile stuttering
            const cappedNodes = Math.min(numNodes, 80);
            for (let i = 0; i < cappedNodes; i++) {
                nodes.push(new Node(canvas.width, canvas.height));
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Because canvas is inset-0 fixed or absolute, window raw client coords map to canvas
            mouse = {
                x: e.clientX,
                y: e.clientY
            };
        };

        const handleMouseLeave = () => {
            mouse = { x: -1000, y: -1000 };
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        handleResize();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach(node => {
                node.update(canvas.width, canvas.height, mouse);
                node.draw(ctx);
            });

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        // Opacity fades out based on distance
                        ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - distance / 150) * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
}
