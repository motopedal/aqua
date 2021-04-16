import Link from "next/link";
import { useCart } from "react-use-cart";
import "tailwindcss/tailwind.css";

export default function Navbar() {
  const { totalUniqueItems } = useCart();
  return (
    <div className="flex flex-row justify-between px-16">
      <Link href="/">
        <img className="w-20 h-full self-center" src="logo.svg" />
      </Link>
      <div className="flex gap-20 py-4">
        <div className="font-bold">about us</div>
        <div className="font-bold">contact</div>
        <Link href="/products">
          <div className="font-bold">products</div>
        </Link>
      </div>
      <div className="py-4 flex">
        <span className="font-bold mr-3">{totalUniqueItems}</span>
        <Link href="/order">
          <img className="w-5" src="bag-png.png" />
        </Link>
      </div>
    </div>
  );
}
