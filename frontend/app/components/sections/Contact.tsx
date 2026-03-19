"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { FreeAnalysisSection } from "../ui/FreeAnalysisSection";

type ToastType = "success" | "error";

type ToastState = {
  message: string;
  type: ToastType;
  phase: "enter" | "visible" | "exit";
};

export function Contact() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    };
  }, []);

  const showToast = (message: string, type: ToastType) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (removeTimerRef.current) clearTimeout(removeTimerRef.current);

    setToast({ message, type, phase: "enter" });

    requestAnimationFrame(() => {
      setToast((prev) => (prev ? { ...prev, phase: "visible" } : null));
    });

    hideTimerRef.current = setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, phase: "exit" } : null));
    }, 2800);

    removeTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3400);
  };

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = newsletterEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast("Informe um email valido.", "error");
      return;
    }

    setIsSubmittingEmail(true);

    try {
      const response = await fetch("https://letrascalc-repo-production.up.railway.app/sitemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar o email.");
      }

      setNewsletterEmail("");
      showToast("Email enviado com sucesso.", "success");
    } catch {
      showToast("Nao foi possivel enviar seu email agora. Tente novamente em instantes.", "error");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <section className="relative overflow-hidden" id="contato">
      {toast && (
        <div
          className={`fixed top-5 z-50 transition-transform duration-500 ease-out ${
            toast.phase === "enter"
              ? "-translate-x-[120%]"
              : toast.phase === "visible"
                ? "translate-x-4"
                : "-translate-x-[120%]"
          }`}
        >
          <div
            className={`min-w-[18rem] max-w-88 rounded-xl px-4 py-3 shadow-xl border text-sm font-medium ${
              toast.type === "success"
                ? "bg-green-600 border-green-700 text-white"
                : "bg-red-600 border-red-700 text-white"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="relative w-full flex items-center justify-center py-2">
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#D9D9D9] -translate-y-1/2"></div>

        <div className="relative z-10 px-8 py-1 lg:py-3 rounded-full border border-[#D9D9D9] bg-white">
          <span className="text-orange-500 font-medium text-sm lg:text-lg">
            Nossos contatos
          </span>
        </div>
      </div>

      {/* Background dividido */}
      <div className="absolute inset-0 bg-linear-to-b from-white from-50% to-[#0F2747] to-50% -z-20"></div>

      {/* CONTAINER */}
      <div className="container mx-auto px-4 py-10 md:py-24 relative z-10">

        <FreeAnalysisSection />

      </div>

      {/* NEWSLETTER */}
      <div className="relative z-10 pb-16">
        <div className="container mx-auto px-4 flex justify-center">

          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 text-white">

            {/* TEXTO */}
            <p className="text-sm md:text-base max-w-md">
              Se inscreva no Clodonews e receba semanalmente notícias e conteúdos
              acerca de seus direitos como servidor
            </p>

            {/* INPUT + BOTÃO */}
            <form className="flex items-center gap-4 w-full md:w-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Seu email"
                className="w-full md:w-72 px-6 py-3 rounded-full text-sm bg-white text-black focus:outline-none"
                required
              />

              <button
                type="submit"
                disabled={isSubmittingEmail}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed transition text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:send" />
              </button>
            </form>

          </div>
        </div>
      </div>

    </section>
  );
}