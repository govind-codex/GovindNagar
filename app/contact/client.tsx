"use client";

import { Icon } from "@/components/icons";
import { TransitionLink } from "@/components/utils/link";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { appConfig } from "root/project.config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPageClient() {
  const reduceMotion = useReducedMotion();
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = EMAIL_PATTERN.test(senderEmail);
  const isMessageValid = message.trim().length >= 10;
  const canSubmit = isEmailValid && isMessageValid;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(false);

    if (!isEmailValid) {
      setError("Enter a valid email address.");
      return;
    }

    if (!isMessageValid) {
      setError("Your message needs at least 10 characters.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: senderEmail.trim(),
          message: message.trim(),
          website,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Your message could not be delivered.");
      }

      setSenderEmail("");
      setMessage("");
      setWebsite("");
      setSent(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Your message could not be delivered. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-3xl px-3 pb-24 pt-24 sm:px-6 sm:pt-28">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-x border-t border-border/70 bg-background"
      >
        <div className="border-b border-border/70 px-4 py-2.5 sm:px-5">
          <p className="text-lg font-medium text-muted-foreground sm:text-xl">
            Contact
          </p>
        </div>

        <div className="border-b border-border/70 px-4 py-3 sm:px-5">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Let&apos;s talk about what you&apos;re building
          </h1>
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-2.5 sm:px-5">
          <TransitionLink
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Home
          </TransitionLink>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:text-sm">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Open to work
          </span>
        </div>

        <section aria-labelledby="fastest-routes-heading">
          <div className="border-b border-border/70 px-4 py-2 sm:px-5">
            <h2 id="fastest-routes-heading" className="text-xl font-medium sm:text-2xl">
              Fastest routes
            </h2>
          </div>

          <div className="grid gap-3 border-b border-border/70 p-4 sm:grid-cols-2 sm:p-6">
            <a
              href={appConfig.social["cal.com"]}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-16 items-center gap-3 rounded-lg bg-foreground px-3 py-2.5 text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background/15">
                <CalendarDays className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Book a 15-minute call</span>
                <span className="block truncate text-xs opacity-65">Pick any open slot</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a
              href={appConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card/40 px-3 py-2.5 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Icon name="twitter" className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">DM me on X</span>
                <span className="block truncate text-xs text-muted-foreground">
                  @{appConfig.usernames.twitter}
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>

        <section aria-labelledby="message-heading">
          <div className="border-b border-border/70 px-4 py-2 sm:px-5">
            <h2 id="message-heading" className="text-xl font-medium sm:text-2xl">
              Send a message
            </h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5 p-4 sm:p-6">
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Write here and it lands in my inbox. Roles, freelance work, or a
              question about something I&apos;ve built — all welcome.
            </p>

            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={senderEmail}
                onChange={(event) => {
                  setSenderEmail(event.target.value);
                  setError(null);
                  setSent(false);
                }}
                placeholder="you@example.com"
                aria-invalid={Boolean(error && !isEmailValid)}
                className="h-10 w-full rounded-lg border border-input bg-muted/30 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 aria-invalid:border-destructive"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Your message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setError(null);
                  setSent(false);
                }}
                placeholder="What are you building, and where do you want help?"
                aria-describedby="message-help contact-error"
                aria-invalid={Boolean(error && !isMessageValid)}
                className="min-h-32 w-full resize-y rounded-lg border border-input bg-muted/30 px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 aria-invalid:border-destructive sm:min-h-36"
              />
              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <p id="message-help">At least 10 characters so I know what you need.</p>
                <span className={cn(message.length >= 10 && "text-emerald-500")}>
                  {message.length}/10+
                </span>
              </div>
            </div>

            <div aria-live="polite" className="min-h-5 text-sm">
              {error && <p id="contact-error" className="text-destructive">{error}</p>}
              {sent && (
                <p className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  Message sent. I&apos;ll get back to you soon.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              aria-busy={isSubmitting}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none"
            >
              {isSubmitting ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </form>
        </section>
      </motion.div>
    </main>
  );
}
