"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader2, Phone, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface InterviewBoothProps {
  interviewId: string;
  difficulty: string;
  category: string;
}

export function InterviewBooth({
  interviewId,
  difficulty,
  category,
}: InterviewBoothProps) {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [conversation, setConversation] = useState<any[]>([]);
  const conversationRef = useRef<any[]>([]);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleCallStart = () => {
      console.log("interview started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };
    const handleCallEnd = () => {
      console.log("Interview ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
      generateFeedback();
    };
    const handleSpeechStart = () => {
      console.log("AI started speaking");
      setIsSpeaking(true);
    };
    const handleSpeechEnd = () => {
      console.log("AI stopped speaking");
      setIsSpeaking(false);
    };
    const handleError = (error: any) => {
      console.log("Vapi error: ", error);
      setConnecting(false);
      setCallActive(false);
    };
    const handleMessage = (message: any) => {
      console.log("Message: ", message);
      if (message.type === "transcript" && message.transcriptType === "final") {
        const lastMessage =
          conversationRef.current[conversationRef.current.length - 1];
        if (lastMessage && lastMessage.role === message.role) {
          lastMessage.content += ` ${message.transcript}`;
        } else {
          conversationRef.current.push({
            role: message.role,
            content: message.transcript,
          });
        }

        setConversation([...conversationRef.current]);
      }
    };

    const generateFeedback = async () => {
      console.log("SENDING CONVERSATION", conversationRef.current);
      try {
        await axios.post("/api/feedback", {
          conversation: conversationRef.current,
          interviewId: interviewId,
        });
        toast.success("Your result card has been generated.");
        router.push(`/interview/${interviewId}/result`);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    } else {
      try {
        setConnecting(true);
        setCallEnded(false);

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID, {
          variableValues: {
            username: user?.firstName,
            category,
            difficulty,
          },
        });
      } catch (error) {
        console.log(error);
        setConnecting(false);
      }
    }
  };

  const aiStatusLabel = isSpeaking
    ? "Speaking"
    : callActive
      ? "Listening"
      : callEnded
        ? "Redirecting…"
        : "Standby";

  const btnLabel = callActive
    ? "End Interview"
    : connecting
      ? "Connecting"
      : callEnded
        ? "Processing…"
        : "Start Interview";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-0.5">
              Live Interview
            </p>
            <h1 className="text-lg font-bold text-gray-900 capitalize leading-tight">
              {category}{" "}
              <span className="text-gray-400 font-normal">· {difficulty}</span>
            </h1>
          </div>

          {callActive && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-1 bg-gradient-to-r from-violet-400 to-indigo-400" />
              <div className="flex flex-col items-center justify-center gap-4 py-10 px-6 relative">
                {isSpeaking && (
                  <>
                    <span className="absolute inset-0 m-auto w-36 h-36 rounded-full border-2 border-violet-300 animate-ping opacity-30" />
                    <span className="absolute inset-0 m-auto w-44 h-44 rounded-full border border-violet-200 animate-ping opacity-20 [animation-delay:0.2s]" />
                  </>
                )}

                <div
                  className={`relative w-28 h-28 rounded-full overflow-hidden border-4 transition-all duration-300 z-10 ${
                    isSpeaking
                      ? "border-violet-400 shadow-[0_0_0_6px_rgba(139,92,246,0.12)]"
                      : "border-gray-100"
                  }`}
                >
                  <Image
                    src={"/nova.png"}
                    alt="AI Assistant"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center z-10">
                  <p className="font-bold text-gray-900 text-base">Nova</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Smart Interviewer
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 z-10 ${
                    isSpeaking
                      ? "bg-violet-50 border-violet-200 text-violet-700"
                      : callActive
                        ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSpeaking
                        ? "bg-violet-500 animate-pulse"
                        : callActive
                          ? "bg-indigo-400 animate-pulse"
                          : "bg-gray-300"
                    }`}
                  />
                  {aiStatusLabel}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-1 bg-gradient-to-r from-sky-400 to-cyan-400" />
              <div className="flex flex-col items-center justify-center gap-4 py-10 px-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100">
                  <Image
                    src={user?.imageUrl || "/unknown-user.png"}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base">
                    {user
                      ? (user.firstName + " " + (user.lastName || "")).trim()
                      : "Guest"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Candidate</p>
                </div>

                <div
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium ${
                    callActive
                      ? "bg-sky-50 border-sky-200 text-sky-600"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      callActive ? "bg-sky-400" : "bg-gray-300"
                    }`}
                  />
                  {callActive ? "In Session" : "Ready"}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={toggleCall}
              disabled={connecting || callEnded}
              className={`
                relative inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-semibold
                transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                ${
                  callActive
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200"
                    : callEnded
                      ? "bg-gray-400 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                }
              `}
            >
              {connecting && (
                <span className="absolute inset-0 rounded-2xl animate-ping bg-indigo-400 opacity-30" />
              )}

              {connecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : callActive ? (
                <PhoneOff className="w-4 h-4" />
              ) : (
                <Phone className="w-4 h-4" />
              )}

              <span>{btnLabel}</span>
            </button>
          </div>

          {!callActive && !callEnded && !connecting && (
            <p className="text-center text-xs text-gray-400">
              Click{" "}
              <span className="font-semibold text-gray-600">
                Start Interview
              </span>{" "}
              when you're ready. The AI will guide the session.
            </p>
          )}
          {callEnded && (
            <p className="text-center text-xs text-gray-400 animate-pulse">
              Generating your feedback report…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
