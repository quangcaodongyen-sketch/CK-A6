
import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS } from './data.ts';
import { QuestionType, QuizState } from './types.ts';
import { GoogleGenAI } from "@google/genai";
import { 
  Trophy, CheckCircle, XCircle, ChevronRight, RotateCcw, 
  Award, Lightbulb, Music, BookOpen, Sparkles, BrainCircuit,
  Loader2
} from 'lucide-react';

const CORRECT_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
const WRONG_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3';
const HAPPY_NEW_YEAR_SOUND = 'https://www.mboxdrive.com/happynewyear_short.mp3'; // Generic celebratory track for demo

const OPTION_COLORS = [
  { bg: 'bg-blue-500', shadow: 'bg-blue-700', text: 'text-blue-700', ring: 'ring-blue-100' },
  { bg: 'bg-indigo-500', shadow: 'bg-indigo-700', text: 'text-indigo-700', ring: 'ring-indigo-100' },
  { bg: 'bg-purple-500', shadow: 'bg-purple-700', text: 'text-purple-700', ring: 'ring-purple-100' },
  { bg: 'bg-rose-500', shadow: 'bg-rose-700', text: 'text-rose-700', ring: 'ring-rose-100' },
];

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
    userAnswers: {}
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [floatingPoints, setFloatingPoints] = useState<{ id: number; show: boolean }>({ id: 0, show: false });
  const [blossoms, setBlossoms] = useState<{ id: number; left: string; delay: string }[]>([]);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  
  const audioCorrect = useRef<HTMLAudioElement | null>(null);
  const audioWrong = useRef<HTMLAudioElement | null>(null);
  const audioFinish = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioCorrect.current = new Audio(CORRECT_SOUND);
    audioWrong.current = new Audio(WRONG_SOUND);
    audioFinish.current = new Audio(HAPPY_NEW_YEAR_SOUND);
  }, []);

  useEffect(() => {
    if (state.isFinished) {
      audioFinish.current?.play().catch(() => {});
    }
  }, [state.isFinished]);

  const currentQuestion = QUESTIONS[state.currentQuestionIndex];
  const categoryLower = currentQuestion.category.toLowerCase();
  const isReading = categoryLower.includes('reading');
  const isListening = categoryLower.includes('listening');

  const triggerBlossoms = () => {
    const newBlossoms = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1}s`
    }));
    setBlossoms(newBlossoms);
    setTimeout(() => setBlossoms([]), 3000);
  };

  const getAiExplanation = async () => {
    if (isLoadingAi) return;
    setIsLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Bạn là một giáo viên tiếng Anh lớp 6 vui tính. Hãy giải thích ngắn gọn (dưới 50 từ) tại sao đáp án "${currentQuestion.correctAnswer}" là đúng cho câu hỏi: "${currentQuestion.question}". 
      Học sinh chọn: "${selectedOption}". Giải thích bằng tiếng Việt dễ hiểu cho trẻ em.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiExplanation(response.text || "Gia sư AI đã có câu trả lời nhưng bị trống nội dung!");
    } catch (error) {
      console.error("AI Error:", error);
      setAiExplanation("Gia sư AI đang bận một chút, bạn hãy xem đáp án đúng bên dưới nhé!");
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;

    const correct = option === currentQuestion.correctAnswer;
    setSelectedOption(option);
    setIsCorrect(correct);
    setShowFeedback(true);
    setAiExplanation(null);

    if (correct) {
      audioCorrect.current?.play().catch(() => {});
      setState(prev => ({
        ...prev,
        score: prev.score + 10,
        userAnswers: { ...prev.userAnswers, [currentQuestion.id]: option }
      }));
      setFloatingPoints({ id: Date.now(), show: true });
      triggerBlossoms();
      setTimeout(() => setFloatingPoints({ id: 0, show: false }), 1500);
    } else {
      audioWrong.current?.play().catch(() => {});
      setState(prev => ({
        ...prev,
        userAnswers: { ...prev.userAnswers, [currentQuestion.id]: option }
      }));
    }
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < QUESTIONS.length - 1) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
      setSelectedOption(null);
      setShowFeedback(false);
      setAiExplanation(null);
    } else {
      setState(prev => ({ ...prev, isFinished: true }));
    }
  };

  const restartQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: {}
    });
    setSelectedOption(null);
    setShowFeedback(false);
    setAiExplanation(null);
    if (audioFinish.current) {
        audioFinish.current.pause();
        audioFinish.current.currentTime = 0;
    }
  };

  const progress = ((state.currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  if (state.isFinished) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-[#F0F4F8] font-sans overflow-hidden">
        {/* Falling blossoms on finish screen too */}
        <div className="fixed inset-0 pointer-events-none z-50">
           {Array.from({length: 20}).map((_, i) => (
             <span key={i} className="blossom-particle" style={{left: `${Math.random()*100}%`, animationDelay: `${Math.random()*5}s`}}>🌸</span>
           ))}
        </div>
        
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-md w-full text-center space-y-8 border-b-[12px] border-blue-200 z-10">
          <div className="relative inline-block">
            <div className="bg-yellow-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-inner border-4 border-yellow-200">
              <Trophy className="text-yellow-600 w-16 h-16" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={32} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">XUẤT SẮC!</h1>
            <p className="text-gray-500 font-medium text-lg italic">"Happy New Year! Bạn giỏi lắm!"</p>
          </div>

          <div className="py-8 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] border-2 border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-5 -mr-4 -mt-4">
              <Award size={120} />
            </div>
            <p className="text-blue-600 font-black uppercase tracking-widest text-sm">Tổng Điểm</p>
            <p className="text-7xl font-black text-blue-600 mt-2 tabular-nums">{state.score}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 text-green-700 p-4 rounded-3xl border-2 border-green-100 shadow-sm">
              <p className="text-[10px] font-black uppercase mb-1">Đúng</p>
              <p className="text-2xl font-black">{state.score / 10}</p>
            </div>
            <div className="bg-red-50 text-red-700 p-4 rounded-3xl border-2 border-red-100 shadow-sm">
              <p className="text-[10px] font-black uppercase mb-1">Sai</p>
              <p className="text-2xl font-black">{QUESTIONS.length - (state.score / 10)}</p>
            </div>
          </div>

          <button 
            onClick={restartQuiz}
            className="w-full relative group"
          >
            <div className="absolute -inset-1 bg-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] transition-all active:translate-y-1 border-b-8 border-blue-800 shadow-xl text-lg uppercase tracking-wider">
              <RotateCcw size={22} /> Thử lại lần nữa
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-4 bg-[#F8FAFC] md:max-w-lg lg:max-w-xl font-sans selection:bg-blue-100 relative">
      {/* Blossom Particles Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {blossoms.map((b) => (
          <span 
            key={b.id} 
            className="blossom-particle"
            style={{ left: b.left, animationDelay: b.delay }}
          >
            🌸
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-4 shadow-xl mb-6 flex justify-between items-center sticky top-4 z-20 border-b-4 border-gray-100/50 backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg rotate-3">
            <Award className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">English 6</p>
            <p className="text-sm font-black text-gray-800">Review Term I</p>
          </div>
        </div>
        <div className="bg-blue-50 px-5 py-2 rounded-2xl border-2 border-blue-100 relative group overflow-hidden">
          <div className="absolute inset-0 bg-blue-100/30 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          <div className="relative flex flex-col items-end">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Points</span>
            <span className="text-2xl font-black text-blue-600 tabular-nums leading-none">
              {state.score}
              {floatingPoints.show && (
                <span className="absolute -top-16 right-0 text-4xl text-green-500 font-black animate-float-up drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
                  +10 ✨
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6 px-2">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Câu {state.currentQuestionIndex + 1} <span className="text-gray-300 mx-1">/</span> {QUESTIONS.length}
          </span>
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md text-[10px] font-black">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-4 bg-gray-200/50 rounded-full overflow-hidden p-1 shadow-inner border border-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Main Area */}
      <div className="flex-grow flex flex-col gap-6 pb-28">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-b-[10px] border-gray-200 transition-all duration-300">
          <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 scale-150 rotate-12 pointer-events-none">
              <BrainCircuit size={120} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-black mb-4 uppercase backdrop-blur-md border border-white/30 tracking-widest">
              <Sparkles size={12} />
              {currentQuestion.category}
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight drop-shadow-md">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Reading or Listening Passage - SHOWN WHILE ANSWERING */}
            {currentQuestion.passage && (isReading || isListening) && (
              <div className="p-6 rounded-[2rem] bg-amber-50 border-2 border-amber-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  {isListening ? <Music size={48} className="text-blue-800" /> : <BookOpen size={48} className="text-amber-800" />}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`${isListening ? 'bg-blue-200' : 'bg-amber-200'} p-1.5 rounded-lg`}>
                    {isListening ? <Music className="text-blue-700" size={18} /> : <BookOpen className="text-amber-700" size={18} />}
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest ${isListening ? 'text-blue-600' : 'text-amber-600'}`}>
                    {isListening ? 'Listening Script' : 'Reading Passage'}
                  </span>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
                  "{currentQuestion.passage}"
                </p>
              </div>
            )}

            {/* Answer Options */}
            <div className={`grid ${currentQuestion.type === QuestionType.TRUE_FALSE ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {(currentQuestion.type === QuestionType.TRUE_FALSE ? ['T', 'F'] : currentQuestion.options)?.map((option, idx) => {
                const color = OPTION_COLORS[idx % OPTION_COLORS.length];
                const isPick = selectedOption === option;
                const isCorrectAnswer = showFeedback && currentQuestion.correctAnswer === option;
                const isWrongPick = showFeedback && isPick && !isCorrect;

                return (
                  <button
                    key={option}
                    disabled={showFeedback}
                    onClick={() => handleOptionSelect(option)}
                    className={`relative group transition-all transform active:translate-y-0 text-left
                      ${showFeedback ? '' : 'hover:-translate-y-1'}
                    `}
                  >
                    <div className={`absolute inset-0 rounded-2xl translate-y-1.5 
                      ${showFeedback 
                        ? (isCorrectAnswer ? 'bg-green-700' : isWrongPick ? 'bg-red-700' : 'bg-gray-200') 
                        : color.shadow}`} 
                    />
                    <div className={`relative p-5 rounded-2xl border-2 font-bold flex items-center gap-4 transition-all
                      ${showFeedback 
                        ? (isCorrectAnswer ? 'bg-green-500 text-white border-green-400 shadow-lg' : isWrongPick ? 'bg-red-500 text-white border-red-400 shadow-lg' : 'bg-white text-gray-300 border-gray-100 opacity-60')
                        : `bg-white text-gray-700 border-gray-100 hover:border-blue-200 shadow-sm ring-4 ring-transparent hover:ring-blue-50`}`}
                      style={!showFeedback ? { transform: 'translateY(-6px)' } : {}}
                    >
                      <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-black shrink-0 shadow-sm text-lg
                        ${showFeedback 
                          ? (isCorrectAnswer || isWrongPick ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-300')
                          : `${color.bg} text-white`}`}>
                        {currentQuestion.type === QuestionType.TRUE_FALSE ? (option === 'T' ? 'T' : 'F') : String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-lg flex-grow leading-tight font-black">
                        {currentQuestion.type === QuestionType.TRUE_FALSE ? (option === 'T' ? 'True' : 'False') : option}
                      </span>
                      {isCorrectAnswer && <CheckCircle className="text-white drop-shadow-md animate-pulse" size={28} />}
                      {isWrongPick && <XCircle className="text-white drop-shadow-md" size={28} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* AI Explanation Button & Content */}
            {showFeedback && (
              <div className="space-y-4 pt-2">
                <div className={`p-6 rounded-[2rem] border-2 animate-in zoom-in-95 duration-500 shadow-xl relative overflow-hidden
                  ${isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white shadow-lg shrink-0`}>
                      {isCorrect ? <Trophy size={24} /> : <Lightbulb size={24} />}
                    </div>
                    <div className="flex-grow">
                      <p className="font-black text-[10px] uppercase tracking-[0.2em] mb-1 opacity-60">
                        {isCorrect ? 'Tuyệt vời!' : 'Học từ lỗi sai'}
                      </p>
                      <p className="text-xl font-black tracking-tight leading-tight mb-2">
                        {currentQuestion.correctAnswer}
                      </p>
                      
                      {!aiExplanation ? (
                        <button 
                          onClick={getAiExplanation}
                          disabled={isLoadingAi}
                          className="flex items-center gap-2 text-sm font-bold bg-white/50 hover:bg-white px-4 py-2 rounded-xl transition-colors border border-black/5"
                        >
                          {isLoadingAi ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <BrainCircuit size={16} />
                          )}
                          Hỏi Gia sư AI giải thích
                        </button>
                      ) : (
                        <div className="bg-white/60 p-4 rounded-2xl border border-black/5 text-sm font-medium leading-relaxed italic animate-in fade-in slide-in-from-top-2">
                          <Sparkles className="inline-block mr-2 text-indigo-500" size={14} />
                          {aiExplanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Navigation */}
      {showFeedback && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-30 shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleNext}
              className="w-full relative group transform transition-all active:scale-95 hover:scale-[1.02]"
            >
              <div className="absolute -inset-1 bg-blue-600 rounded-[2rem] opacity-25 group-hover:opacity-40 blur transition duration-300"></div>
              <div className="relative flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-black py-5 rounded-[1.8rem] transition-all border-b-8 border-gray-700 shadow-2xl tracking-[0.1em] text-lg uppercase">
                {state.currentQuestionIndex < QUESTIONS.length - 1 ? 'Tiếp tục thôi' : 'Xem kết quả'} 
                <ChevronRight size={26} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatUp {
          0% { opacity: 0; transform: translate(-50%, 40px) scale(0.6) rotate(-10deg); }
          30% { opacity: 1; transform: translate(-50%, -20px) scale(1.4) rotate(10deg); }
          70% { opacity: 1; transform: translate(-50%, -80px) scale(1.2) rotate(-5deg); }
          100% { opacity: 0; transform: translate(-50%, -140px) scale(1) rotate(0deg); }
        }
        @keyframes falling {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up {
          animation: floatUp 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          position: absolute;
          left: 50%;
          pointer-events: none;
          white-space: nowrap;
          text-shadow: 0 10px 20px rgba(34, 197, 94, 0.4);
          z-index: 50;
        }
        .blossom-particle {
          position: absolute;
          top: -50px;
          font-size: 24px;
          animation: falling 3s linear forwards;
          z-index: 100;
          pointer-events: none;
        }
        body {
            overflow-x: hidden;
            -webkit-tap-highlight-color: transparent;
            background-color: #F8FAFC;
        }
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;
