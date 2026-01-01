import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ showText = true, size = 'md' }: LogoProps) => {
  // Mobile: 3x larger (h-24 = 6rem = 96px base), Desktop uses size prop
  const sizeClasses = {
    sm: 'h-24 sm:h-12',
    md: 'h-24 sm:h-16',
    lg: 'h-24 sm:h-20',
  };

  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <img 
        src={logoImage} 
        alt="MithilaSanskar Logo" 
        className={`${sizeClasses[size]} w-auto`}
      />
      {showText && (
        <div className="flex flex-col hidden sm:flex">
          <span className="font-serif font-bold text-xl text-foreground leading-tight">
            MithilaSanskar
          </span>
          <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
            Culture · Craft · Community
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
