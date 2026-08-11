"use client";

import { useRef, useState } from "react";

import TerminalWindow from "@/components/ui/terminal-window";
import type { Dictionary } from "@/i18n";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type SubmissionState = "idle" | "success" | "error";

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

const FIELD_LABEL_CLASS_NAME = "block mb-2 font-mono text-[12px] tracking-[0.1em] text-primary-fixed opacity-70 uppercase";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const GENERIC_ERROR = t.genericError;
  const formStartedAtRef = useRef(Date.now());
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState("idle");
    setErrorMessage(GENERIC_ERROR);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      company: form.company.trim(),
      startedAt: formStartedAtRef.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        throw new Error(data.error ?? GENERIC_ERROR);
      }

      setForm(INITIAL_FORM);
      formStartedAtRef.current = Date.now();
      setSubmissionState("success");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }

      setSubmissionState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <TerminalWindow title="user@egekaya:~/contact_protocol" bodyClassName="p-6 md:p-8">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          Company
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(event) => {
              setForm((current) => ({ ...current, company: event.target.value }));
            }}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <div>
          <label htmlFor="contact-name" className={FIELD_LABEL_CLASS_NAME}>
            {t.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => {
              setForm((current) => ({ ...current, name: event.target.value }));
            }}
            required
            maxLength={120}
            className="terminal-field"
            placeholder={t.namePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={FIELD_LABEL_CLASS_NAME}>
            {t.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => {
              setForm((current) => ({ ...current, email: event.target.value }));
            }}
            required
            maxLength={320}
            className="terminal-field"
            placeholder={t.emailPlaceholder}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={FIELD_LABEL_CLASS_NAME}>
            {t.messageLabel}
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={(event) => {
              setForm((current) => ({ ...current, message: event.target.value }));
            }}
            required
            maxLength={5000}
            rows={5}
            className="terminal-field resize-none"
            placeholder={t.messagePlaceholder}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-mono text-[12px] text-on-surface-variant/60">
            {isSubmitting ? t.transmitting : t.awaiting}
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-sm bg-primary-fixed px-6 py-3 font-mono text-[13px] tracking-widest text-on-primary-fixed uppercase transition-colors hover:bg-primary-fixed-dim disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </div>
      </form>

      <div className="mt-4" aria-live="polite">
        {submissionState === "success" ? (
          <div className="rounded border border-primary-fixed/40 bg-primary-container/10 px-4 py-3 text-on-surface">
            <p className="font-mono text-[12px] tracking-[0.1em] text-primary-fixed uppercase">{t.successLabel}</p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed">
              {t.successBody}
            </p>
          </div>
        ) : null}

        {submissionState === "error" ? (
          <div className="rounded border border-error/40 bg-error-container/20 px-4 py-3 text-on-surface">
            <p className="font-mono text-[12px] tracking-[0.1em] text-error uppercase">{t.errorLabel}</p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed">{errorMessage}</p>
          </div>
        ) : null}
      </div>
    </TerminalWindow>
  );
}
