import { Link } from "react-router-dom"
import logoImage from "@/assets/logo.png"

type LogoProps = {
  showText?: boolean
  showTagline?: boolean
  size?: "sm" | "md" | "lg"
}

export default function Logo({
  showText = true,
  showTagline = true,
  size = "md",
}: LogoProps) {
  // Logo size – height based only (no distortion)
  const logoSizeClasses = {
    sm: "h-20 sm:h-30",
    md: "h-20 sm:h-35",
    lg: "h-20 sm:h-30",
  }

  const textSizeClasses = {
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
  }

  const taglineSizeClasses = {
    sm: "text-[9px] sm:text-xs",
    md: "text-xs sm:text-sm",
    lg: "text-sm sm:text-base",
  }

  return (
    <Link
      to="/"
      className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
    >
      {/* Logo */}
      <img
        src={logoImage}
        alt="Mithila Sanskar Logo"
        className={`${logoSizeClasses[size]} object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300`}
      />

      {/* Text section */}
      {showText && (
        <div className="hidden sm:flex flex-col leading-tight">
          {/* Brand Name */}
          <span
            className={`font-bold ${textSizeClasses[size]} bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent tracking-wide`}
          >
            MithilaSanskar
          </span>

          {/* Tagline */}
          {showTagline && (
            <span
              className={`${taglineSizeClasses[size]} text-gray-500 tracking-widest uppercase font-medium mt-0.5`}
            >
              Culture · Craft · Community
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
