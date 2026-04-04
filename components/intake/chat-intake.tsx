'use client';

import { useRef, useEffect } from 'react';
import { useChatIntake, QUESTIONS } from './use-chat-intake';
import { ChatBubble } from './chat-bubble';
import { Loader2 } from 'lucide-react';

export function ChatIntake() {
  const {
    messages,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    pendingMultiSelect,
    pendingNumber,
    email,
    isSubmitting,
    submitError,
    isDone,
    handleSingleSelect,
    handleBoolean,
    toggleMultiSelect,
    confirmMultiSelect,
    setNumberValue,
    confirmNumber,
    setEmail,
    submitChat,
  } = useChatIntake();

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const progress = Math.min((currentQuestionIndex / totalQuestions) * 100, 100);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 rounded-full mb-6">
        <div
          className="h-1.5 bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step counter */}
      <p className="text-xs text-gray-400 text-right mb-4">
        {Math.min(currentQuestionIndex + 1, totalQuestions)} of {totalQuestions}
      </p>

      {/* Message thread */}
      <div className="space-y-3 min-h-[300px] max-h-[55vh] overflow-y-auto pb-4 pr-1">
        {messages.map((m) => (
          <ChatBubble key={m.key} role={m.role} text={m.text} />
        ))}
        <div ref={endRef} />
      </div>

      {/* Answer area */}
      {!isDone && currentQuestion && (
        <div className="mt-6 border-t border-gray-100 pt-5">
          <AnswerArea
            question={currentQuestion}
            pendingMultiSelect={pendingMultiSelect}
            pendingNumber={pendingNumber}
            email={email}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onSingleSelect={handleSingleSelect}
            onBoolean={handleBoolean}
            onToggleMulti={toggleMultiSelect}
            onConfirmMulti={confirmMultiSelect}
            onSetNumber={setNumberValue}
            onConfirmNumber={confirmNumber}
            onSetEmail={setEmail}
            onSubmit={submitChat}
          />
        </div>
      )}

      {isDone && !isSubmitting && (
        <p className="mt-6 text-center text-sm text-gray-500">Preparing your assessment…</p>
      )}
    </div>
  );
}

// ─── Answer area ──────────────────────────────────────────────────────────────

import type { ChatQuestion } from './use-chat-intake';

interface AnswerAreaProps {
  question: ChatQuestion;
  pendingMultiSelect: string[];
  pendingNumber: string;
  email: string;
  isSubmitting: boolean;
  submitError: string | null;
  onSingleSelect: (value: string, label: string) => void;
  onBoolean: (value: boolean) => void;
  onToggleMulti: (value: string) => void;
  onConfirmMulti: () => void;
  onSetNumber: (value: string) => void;
  onConfirmNumber: () => void;
  onSetEmail: (value: string) => void;
  onSubmit: () => void;
}

function AnswerArea({
  question,
  pendingMultiSelect,
  pendingNumber,
  email,
  isSubmitting,
  submitError,
  onSingleSelect,
  onBoolean,
  onToggleMulti,
  onConfirmMulti,
  onSetNumber,
  onConfirmNumber,
  onSetEmail,
  onSubmit,
}: AnswerAreaProps) {
  if (question.type === 'single-select' && question.options) {
    return (
      <div className="flex flex-wrap gap-2">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSingleSelect(opt.value, opt.label)}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'multi-select' && question.options) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {question.options.map((opt) => {
            const selected = pendingMultiSelect.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onToggleMulti(opt.value)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onConfirmMulti}
          disabled={pendingMultiSelect.length === 0}
          className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continue →
        </button>
      </div>
    );
  }

  if (question.type === 'boolean') {
    return (
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onBoolean(true)}
          className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onBoolean(false)}
          className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
        >
          No
        </button>
        <button
          type="button"
          onClick={() => onBoolean(false)}
          className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm text-gray-500 hover:border-gray-400 transition-colors"
        >
          Not sure
        </button>
      </div>
    );
  }

  if (question.type === 'number') {
    const min = question.min ?? 0;
    const max = question.max ?? 99;
    const val = parseInt(pendingNumber, 10);
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onSetNumber(String(Math.max(min, (isNaN(val) ? min : val) - 1)))}
          disabled={isNaN(val) || val <= min}
          className="h-9 w-9 rounded-full border border-gray-300 text-lg font-medium text-gray-600 hover:border-emerald-400 disabled:opacity-30 transition-colors"
        >
          −
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={pendingNumber}
          onChange={(e) => onSetNumber(e.target.value)}
          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm focus:border-emerald-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => onSetNumber(String(Math.min(max, (isNaN(val) ? min : val) + 1)))}
          disabled={isNaN(val) || val >= max}
          className="h-9 w-9 rounded-full border border-gray-300 text-lg font-medium text-gray-600 hover:border-emerald-400 disabled:opacity-30 transition-colors"
        >
          +
        </button>
        <button
          type="button"
          onClick={onConfirmNumber}
          disabled={isNaN(val) || val < min || val > max}
          className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40 transition-colors"
        >
          Continue →
        </button>
      </div>
    );
  }

  if (question.type === 'email') {
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => onSetEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isSubmitting && onSubmit()}
            autoComplete="email"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || email.trim() === ''}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              'See my results'
            )}
          </button>
        </div>
        {submitError && (
          <p className="text-sm text-red-600">{submitError}</p>
        )}
        <p className="text-xs text-gray-400">
          No spam. Unsubscribe any time. This is not financial advice.
        </p>
      </div>
    );
  }

  return null;
}
