import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={` my-[110px] w-[90%] max-w-full mx-auto px-5`}>
      <h1 className="text-2xl md:text-4xl pt-5 text-center">
        Welcome to this demo website
      </h1>
      <h4 className="h-[450px] flex items-center justify-center">
        <div className="text-center font-semibold">
          Navigate to Product List Page from{" "}
          <Link href="/productList" className="text-purple-700 underline">
            {" "}
            here{" "}
          </Link>{" "}
          or click the link in the navbar
        </div>
      </h4>
    </main>
  );
}
