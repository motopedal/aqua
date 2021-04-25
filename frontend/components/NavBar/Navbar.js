import Link from "next/link";
import { useCart } from "react-use-cart";

export default function Navbar() {
  const { totalItems } = useCart();
  return (
    <div className="flex flex-row justify-between px-16 border-b">
      <Link href="/">
        <img
          className="w-20 h-full self-center cursor-pointer"
          src="logo.svg"
        />
      </Link>
      <div className="flex gap-20 py-3">
        <div className="text-lg cursor-pointer">about us</div>
        <div className="text-lg cursor-pointer">contact</div>
        <Link href="/products">
          <div className="text-lg cursor-pointer ">products</div>
        </Link>
      </div>
      <div className="py-4 flex">
        <span className="font-bold mr-3">{totalItems || 0}</span>
        <Link href="/cart">
          <img className="w-5 cursor-pointer" src="bag-png.png" />
        </Link>
      </div>
    </div>
  );
}
