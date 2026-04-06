'use client';

interface ChatBubbleProps {
  role: 'bot' | 'user';
  text: string;
}

export function ChatBubble({ role, text }: ChatBubbleProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          role === 'bot'
            ? 'bg-gray-100 text-gray-900 rounded-tl-none'
            : 'bg-emerald-600 text-white rounded-tr-none'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
