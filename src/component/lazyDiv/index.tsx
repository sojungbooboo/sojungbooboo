import { HTMLAttributes, useEffect, useRef } from "react"

export const LazyDiv = (props: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef({} as HTMLDivElement)

  useEffect(() => {
    const divElement = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lazy-active")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1, // 요소가 10% 보일 때 트리거
        rootMargin: "0px 0px -50px 0px", // 하단 50px 여유를 두고 트리거
      }
    )
    observer.observe(divElement)

    return () => observer.unobserve(divElement)
  }, [])
  return <div ref={ref} {...props} />
}

