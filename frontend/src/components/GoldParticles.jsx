import { useEffect, useRef } from 'react'

const GoldParticles = ({ count = 20 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = count

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedY = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.y -= this.speedY
        this.x += this.speedX

        if (this.y < 0) {
          this.y = canvas.height
          this.x = Math.random() * canvas.width
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#D4AF37'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default GoldParticles

