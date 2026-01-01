import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ showText = true, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
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
