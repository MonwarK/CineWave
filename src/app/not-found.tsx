import BackgroundImage from "@/components/auth/BackgroundImage";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <BackgroundImage />

      <div className="flex flex-col  space-y-6 justify-center items-center">
        <p className="text-3xl font-bold tracking-wider">
          {"404 - Page Not Found :("}
        </p>
        <Link href={"/"}
        
        className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 w-fit border-white uppercase px-5 py-2  font-semibold"
        >
        Back To Home</Link>
      </div>
    </div>
  );
}
