import Link from "next/link";

const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'tour', label: 'Tour' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
];

export function NavigationLinks({ onClick, activeSection }: { onClick?: () => void, activeSection?: string }) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          onClick={onClick}
          className={`cursor-pointer hover:text-white px-3 py-2 text-sm font-medium transition ${activeSection === item.id ? 'text-white' : 'text-gray-300'}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}