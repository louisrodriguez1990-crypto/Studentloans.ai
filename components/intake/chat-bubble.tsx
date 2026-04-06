'use client';

import { GraduationCap } from 'lucide-react';

interface ChatBubbleProps {
  role: 'bot' | 'user';
  text: string;
}

export function ChatBubble({ role, text }: ChatBubbleProps) {
  return (
    <div
      className={`flex gap-2.5 animate-fade-in-up ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {/* Bot avatar */}
      {role === 'bot' && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6faf6] mt-1">
          <GraduationCap className="h-4 w-4 text-[#00C9A7]" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          role === 'bot'
            ? 'bg-gray-100 text-gray-900 rounded-tl-none'
            : 'bg-[#00C9A7] text-white rounded-tr-none'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
