import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

const BG_IMAGE = "https://cdn.poehali.dev/projects/1217ed65-88cc-409e-96ee-8322a5f64a63/bucket/bbf3e4bd-35fb-4902-88c6-5b5969deac45.jpg"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const accumulatedScrollRef = useRef(0)
  const touchStartY = useRef<number>(0)
  const lastTouchY = useRef<number>(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const atTopOfPage = window.scrollY === 0

      if (atTopOfPage && !animationComplete) {
        e.preventDefault()
        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))
        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)
        if (newProgress >= 1) setAnimationComplete(true)
        applyTextTransform(newProgress)
      } else if (atTopOfPage && animationComplete && e.deltaY < 0) {
        e.preventDefault()
        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))
        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)
        if (newProgress < 1) setAnimationComplete(false)
        applyTextTransform(newProgress)
      }
    }

    const applyTextTransform = (progress: number) => {
      if (contentRef.current) {
        const translateY = progress * 180
        const opacity = 1 - progress * 1.5
        const scale = 1 - progress * 0.15
        contentRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
        contentRef.current.style.opacity = String(Math.max(0, opacity))
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTopOfPage = window.scrollY === 0
      const currentTouchY = e.touches[0].clientY
      const deltaY = lastTouchY.current - currentTouchY

      if (atTopOfPage && !animationComplete) {
        e.preventDefault()
        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 3))
        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)
        if (newProgress >= 1) setAnimationComplete(true)
        if (contentRef.current) {
          const translateY = newProgress * 180
          const opacity = 1 - newProgress * 1.5
          const scale = 1 - newProgress * 0.15
          contentRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
          contentRef.current.style.opacity = String(Math.max(0, opacity))
        }
      } else if (atTopOfPage && animationComplete && deltaY < 0) {
        e.preventDefault()
        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 3))
        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)
        if (newProgress < 1) setAnimationComplete(false)
        if (contentRef.current) {
          const translateY = newProgress * 180
          const opacity = 1 - newProgress * 1.5
          const scale = 1 - newProgress * 0.15
          contentRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
          contentRef.current.style.opacity = String(Math.max(0, opacity))
        }
      }

      lastTouchY.current = currentTouchY
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [animationComplete])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фон паркета — нижний слой */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: "#8B6914" }}>
        <img
          src={BG_IMAGE}
          alt="Паркетная карта Крыма"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Текст — средний слой, уходит под карту */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
        style={{ willChange: "transform, opacity", transition: "none" }}
      >
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-center text-white mb-4 drop-shadow-lg">
            {"Укладка паркета и ламината"}
          </p>
          <h1
            ref={titleRef}
            className="text-6xl font-medium text-balance text-center text-white mb-0 tracking-tight leading-[0.95] lg:text-8xl drop-shadow-xl"
          >
            {"Паркетные работы в Крыму"}
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-center text-white mt-6 font-normal drop-shadow-lg">
            {"Идеальный пол в вашем доме"}
          </p>
        </div>
      </div>

      {/* Карта — верхний слой, текст уходит под неё */}
      <div
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
        style={{
          opacity: 0.001 + animationProgress * 0.999,
          transform: `scale(${0.85 + animationProgress * 0.15})`,
          transition: "none",
        }}
      >
        <img
          src={BG_IMAGE}
          alt="Паркетная карта Крыма"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {animationComplete && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-30">
          <ArrowDown className="w-5 h-5 text-amber-200" />
        </div>
      )}
    </section>
  )
}