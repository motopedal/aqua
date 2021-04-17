import Link from "next/link";
import { useCart } from "react-use-cart";
import "tailwindcss/tailwind.css";

export default function Navbar() {
  const { totalItems } = useCart();
  return (
    <div className="flex flex-row justify-between px-16">
      <Link href="/">
        <img
          className="w-20 h-full self-center cursor-pointer"
          src="logo.svg"
        />
      </Link>
      <div className="flex gap-20 py-4">
        <div className="font-bold cursor-pointer">about us</div>
        <div className="font-bold cursor-pointer">contact</div>
        <Link href="/products">
          <div className="font-bold cursor-pointer">products</div>
        </Link>
      </div>
      <div className="py-4 flex">
        <span className="font-bold mr-3">{totalItems || 0}</span>
        <Link href="/order">
          <img className="w-5 cursor-pointer" src="bag-png.png" />
        </Link>
      </div>
    </div>
  );
}
