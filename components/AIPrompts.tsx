
import React from 'react';

interface AIPromptsProps {
  prompts: string[];
}

const AIPrompts: React.FC<AIPromptsProps> = ({ prompts }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已複製到剪貼簿！');
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Gemini 影像生成指令</h2>
        <p className="text-gray-500 text-sm">複製以下指令到 Gemini 生成屬於你的旅遊美照</p>
      </header>

      <div className="space-y-4">
        {prompts.map((prompt, idx) => (
          <div key={idx} className="bg-purple-50 p-6 rounded-3xl border border-purple-100 relative group">
            <h3 className="text-purple-900 font-bold mb-3 uppercase text-xs tracking-widest">Day {idx + 1} Prompt</h3>
            <p className="text-sm text-purple-800 font-mono italic leading-relaxed">
              "{prompt}"
            </p>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-purple-700 transition-colors"
            >
              複製指令
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-2xl text-xs text-gray-400">
        <p className="font-bold mb-2 text-gray-500 uppercase">生成建議</p>
        <p>• 建議使用 Gemini-2.5-flash-image 進行生成。</p>
        <p>• 風格可加入：Ukiyo-e, Studio Ghibli style, 或 Cyberpunk Tokyo。</p>
      </div>
    </div>
  );
};

export default AIPrompts;
