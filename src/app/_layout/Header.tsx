"use client";

import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <div className="bg-slate-900 p-4">
      <div className="flex justify-between">
        <div>
          <Link className="text-white" href="/">
            BLOG
          </Link>
        </div>
        <div>
          <Link className="text-white" href="/contact">
            お問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
};
