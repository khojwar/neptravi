import Link from "next/link";

const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'tour', label: 'Tour' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
];

interface Props {
  activeSection?: string;
  onLinkClick?: (id: string) => void;
  className?: string; 
}

export function NavigationLinks({ activeSection, onLinkClick, className }: Props) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          onClick={() => onLinkClick?.(item.id)}
          className={`cursor-pointer px-3 py-2 text-sm font-medium transition 
          hover:text-white 
          ${activeSection === item.id ? "text-white" : "text-gray-300"}
          ${className ?? ""}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}