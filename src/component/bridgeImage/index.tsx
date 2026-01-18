import { useEffect, useRef, useState } from "react"
import "./index.scss"

interface BridgeImageProps {
  imagePath: string
  alt?: string
  enableParallax?: boolean
}

export const BridgeImage = ({ 
  imagePath, 
  alt = "Bridge Image",
  enableParallax = true 
}: BridgeImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intersection Observer로 화면에 보일 때 애니메이션
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!enableParallax) return

    const handleScroll = () => {
      if (!imageRef.current) return

      const rect = imageRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // 이미지가 화면에 보이는 범위에서만 parallax 효과 적용
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = window.scrollY
        const imageTop = rect.top + scrolled
        const parallax = (scrolled - imageTop + windowHeight) * 0.1 // 약한 효과
        setParallaxOffset(parallax)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableParallax])

  const fullImagePath = `${import.meta.env.BASE_URL}images/${imagePath}`

  return (
    <div 
      ref={imageRef}
      className={`bridge-image ${isVisible ? 'visible' : ''}`}
    >
      <div 
        className="bridge-image-inner"
        style={enableParallax ? { transform: `translateY(${parallaxOffset}px)` } : {}}
      >
        <img src={fullImagePath} alt={alt} />
      </div>
    </div>
  )
}
