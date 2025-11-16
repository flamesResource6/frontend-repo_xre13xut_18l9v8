import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <div className="relative w-full h-[340px] sm:h-[420px] overflow-hidden rounded-b-3xl">
      <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A66CFF] via-[#C77DFF] to-[#E0AAFF]">
          ShootUp
        </h1>
        <p className="mt-2 text-gray-600 max-w-md">
          Join events with a scan. Create memories together. Explore journeys from around the world.
        </p>
      </div>
    </div>
  )
}
