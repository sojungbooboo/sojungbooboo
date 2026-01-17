import { HTMLAttributes, useEffect, useRef } from "react"

export const LazyDiv = (props: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef({} as HTMLDivElement)

  useEffect(() => {
    const divElement = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // requestAnimationFrame을 사용하여 스크롤 중이 아닐 때 애니메이션 실행
            requestAnimationFrame(() => {
              entry.target.classList.add("lazy-active")
            })
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2, // 요소가 20% 보일 때 트리거 (더 늦게 트리거하여 스크롤 중 애니메이션 방지)
        rootMargin: "0px 0px -100px 0px", // 하단 100px 여유를 두고 트리거
      }
    )
    observer.observe(divElement)

    return () => observer.unobserve(divElement)
  }, [])
  return <div ref={ref} {...props} />
}

