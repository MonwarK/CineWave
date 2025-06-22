import TextBox from "../auth/TextBox";
import Header from "./Header";

export default function Hero() {
  return (
    <div className="relative h-[90vh] overflow-hidden p-5 flex flex-col">
      <img
        className="w-full h-full top-0 left-0 object-cover brightness-50 absolute -z-50"
        src="https://i.ibb.co/20WjVpkH/Chat-GPT-Image-Jun-3-2025-10-35-36-PM.png"
        alt="Background"
      />

      {/* Header */}
      <Header />

      {/* Central Form */}
      <div className="flex-1 grid place-items-center text-center">
        <div className="space-y-3 max-w-md">
          <h2 className="text-4xl font-semibold">
            Unlimited films, series and more
          </h2>

          <div className="text-gray-300 font-medium space-y-2">
            <p>Starts at £5.99. Cancel at any time.</p>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
          </div>

          <div className="flex space-x-4">
            <TextBox placeholder="Email address" />
            <button className="cursor-pointer md:text-lg tracking-wide px-5 py-2 bg-primary hover:brightness-80 transition rounded font-semibold w-1/2">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Fades */}
      <div className="h-1/5 -z-40 left-0 top-0 bg-gradient-to-b from-black to-transparent absolute w-full" />
      <div className="h-1/5 -z-40 left-0 bottom-0 bg-gradient-to-t from-black to-transparent absolute w-full" />

    </div>
  );
}
