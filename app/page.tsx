import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Clock,
  Mic,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const features = [
  {
    icon: Mic,
    title: "Voice Interviews",
    desc: "Answer questions out loud like a real interview instead of typing into a chatbot.",
  },
  {
    icon: Brain,
    title: "Role-Based Questions",
    desc: "Practice Frontend, Backend, DevOps, System Design, and more.",
  },
  {
    icon: BarChart3,
    title: "Detailed Feedback",
    desc: "See where your answers were strong and where you need improvement.",
  },
  {
    icon: Clock,
    title: "Start Anytime",
    desc: "No scheduling or waiting. Open the app and start practicing.",
  },
  {
    icon: ShieldCheck,
    title: "Real Interview Flow",
    desc: "Follow-up questions and conversational responses that feel natural.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    desc: "Review old sessions and compare how your performance improves over time.",
  },
];

const categories = [
  "Frontend",
  "Backend",
  "DevOps",
  "System Design",
  "Machine Learning",
  "Data Structures",
];

function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      {" "}
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {" "}
        <Link href="/" className="flex items-center gap-2">
          {" "}
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
            {" "}
            <Mic className="w-4 h-4" />{" "}
          </div>
          <span className="font-semibold text-lg tracking-tight">PrepCall</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <Link href="#features" className="hover:text-black">
            Features
          </Link>

          <Link href="#categories" className="hover:text-black">
            Categories
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="text-sm text-gray-600 hover:text-black">
                Sign in
              </button>
            </SignInButton>

            <SignInButton>
              <button className="bg-black text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="bg-black text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </Link>

            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    return redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-white text-black">
      {" "}
      <Navbar />
      {/* Hero */}
      <section className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 text-sm border border-gray-200 rounded-full px-3 py-1 mb-6 bg-gray-50">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                AI mock interviews
              </div>

              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                Mock interviews
                <br />
                that actually
                <br />
                feel real
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-8">
                Start a voice interview, answer technical questions out loud,
                and get instant feedback after every session.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <SignedOut>
                  <SignInButton>
                    <button className="bg-black text-white px-6 py-3 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                      Start Interview
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="bg-black text-white px-6 py-3 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </SignedIn>

                <Link
                  href="#features"
                  className="border border-gray-200 px-6 py-3 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                >
                  See Features
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="border-b border-gray-100 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Frontend Interview</p>
                  <p className="text-sm text-gray-500">Intermediate Level</p>
                </div>

                <div className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
                    AI
                  </div>

                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-sm">
                    Explain the difference between server components and client
                    components in Next.js.
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-black text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-sm">
                    Server components run on the server by default and reduce
                    client-side JavaScript...
                  </div>

                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    U
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
                    AI
                  </div>

                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-sm">
                    When would you choose a client component instead?
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 p-5 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold">8.2</p>
                  <p className="text-xs text-gray-500">Technical</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">7.8</p>
                  <p className="text-xs text-gray-500">Communication</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">8.9</p>
                  <p className="text-xs text-gray-500">Confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section
        id="features"
        className="py-24 border-t border-gray-100 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-14">
            <p className="text-sm text-gray-500 mb-3">Features</p>

            <h2 className="text-4xl font-black tracking-tight">
              Built for technical interview practice
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-semibold text-lg mb-2">{title}</h3>

                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Categories */}
      <section id="categories" className="py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <p className="text-sm text-gray-500 mb-3">Categories</p>

          <h2 className="text-4xl font-black tracking-tight mb-5">
            Practice different interview tracks
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Choose a topic and difficulty level based on the role you are
            preparing for.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 border border-gray-200 bg-gray-50 px-4 py-2 rounded-full text-sm font-medium"
              >
                <ChevronRight className="w-4 h-4" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-24 border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5">
          <div className="bg-black rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Start your first mock interview
            </h2>

            <p className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Pick a role, answer questions in a live voice session, and get
              detailed interview feedback instantly.
            </p>

            <SignedOut>
              <SignInButton>
                <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold inline-flex items-center gap-2 hover:bg-gray-100 transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="bg-white text-black px-6 py-3 rounded-2xl font-semibold inline-flex items-center gap-2 hover:bg-gray-100 transition-colors"
              >
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>

            <span className="font-semibold">PrepCall</span>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PrepCall
          </p>

          <div className="flex items-center gap-5 text-sm text-gray-500">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
