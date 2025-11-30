"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

type QuizAnswer = {
  questionId: string;
  answer: string | string[];
};

const quizQuestions = [
  {
    id: 'years_smoking',
    title: 'Há quanto tempo você fuma?',
    type: 'single',
    options: [
      'Menos de 1 ano',
      '1-5 anos',
      '6-10 anos',
      '11-20 anos',
      'Mais de 20 anos'
    ]
  },
  {
    id: 'cigarettes_per_day',
    title: 'Quantos cigarros você fuma por dia?',
    type: 'single',
    options: [
      'Menos de 10',
      '10-20 (1 maço)',
      '20-40 (2 maços)',
      'Mais de 40 (2+ maços)'
    ]
  },
  {
    id: 'main_triggers',
    title: 'Quais são seus principais gatilhos para fumar?',
    subtitle: 'Selecione todos que se aplicam',
    type: 'multiple',
    options: [
      'Estresse e ansiedade',
      'Após as refeições',
      'Com café',
      'Com bebidas alcoólicas',
      'Em situações sociais',
      'Quando estou entediado',
      'Ao acordar',
      'Antes de dormir'
    ]
  },
  {
    id: 'previous_attempts',
    title: 'Quantas vezes você já tentou parar de fumar?',
    type: 'single',
    options: [
      'Esta é minha primeira vez',
      '1-2 vezes',
      '3-5 vezes',
      '6-10 vezes',
      'Mais de 10 vezes'
    ]
  },
  {
    id: 'methods_tried',
    title: 'Quais métodos você já tentou?',
    subtitle: 'Selecione todos que se aplicam',
    type: 'multiple',
    options: [
      'Força de vontade apenas',
      'Adesivos de nicotina',
      'Chicletes de nicotina',
      'Medicamentos (Champix, etc)',
      'Cigarro eletrônico/vape',
      'Hipnose',
      'Acupuntura',
      'Terapia',
      'Nenhum método formal'
    ]
  },
  {
    id: 'biggest_fear',
    title: 'Qual é seu maior medo ao tentar parar de fumar?',
    type: 'single',
    options: [
      'Sofrer muito com a abstinência',
      'Ganhar peso',
      'Não conseguir controlar a ansiedade',
      'Perder a concentração no trabalho',
      'Não conseguir socializar sem cigarro',
      'Ter uma recaída e me sentir fracassado'
    ]
  },
  {
    id: 'main_motivation',
    title: 'Qual é sua principal motivação para parar?',
    type: 'single',
    options: [
      'Saúde (medo de doenças)',
      'Família (filhos, cônjuge)',
      'Dinheiro (economia)',
      'Aparência (pele, dentes, cabelo)',
      'Liberdade (não ser escravo do cigarro)',
      'Performance física (esportes, energia)'
    ]
  },
  {
    id: 'health_concerns',
    title: 'Você já sente algum desses sintomas?',
    subtitle: 'Selecione todos que se aplicam',
    type: 'multiple',
    options: [
      'Tosse constante',
      'Falta de ar ao subir escadas',
      'Cansaço excessivo',
      'Dor no peito',
      'Catarro frequente',
      'Infecções respiratórias frequentes',
      'Nenhum sintoma ainda'
    ]
  },
  {
    id: 'social_impact',
    title: 'Como o cigarro afeta sua vida social?',
    type: 'multiple',
    options: [
      'Me sinto excluído em ambientes fechados',
      'Tenho vergonha de fumar perto de certas pessoas',
      'Evito situações onde não posso fumar',
      'Meus filhos/família pedem para eu parar',
      'Me sinto julgado por fumantes',
      'Não afeta minha vida social'
    ]
  },
  {
    id: 'commitment_level',
    title: 'Em uma escala de 1 a 10, o quanto você está comprometido em parar de fumar AGORA?',
    type: 'single',
    options: [
      '1-3 (Ainda tenho dúvidas)',
      '4-6 (Quero tentar, mas tenho medo)',
      '7-8 (Estou determinado)',
      '9-10 (Estou 100% comprometido)'
    ]
  }
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleOptionSelect = (option: string) => {
    if (question.type === 'single') {
      setSelectedOptions([option]);
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(o => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    const newAnswer: QuizAnswer = {
      questionId: question.id,
      answer: question.type === 'single' ? selectedOptions[0] : selectedOptions
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== question.id), newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions([]);
    } else {
      handleSubmit(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers.find(a => a.questionId === quizQuestions[currentQuestion - 1].id);
      if (previousAnswer) {
        setSelectedOptions(Array.isArray(previousAnswer.answer) ? previousAnswer.answer : [previousAnswer.answer]);
      }
    }
  };

  const handleSubmit = async (finalAnswers: QuizAnswer[]) => {
    setIsSubmitting(true);
    
    // Salvar respostas no localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(finalAnswers));
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirecionar para página de plano personalizado
    router.push('/plano-personalizado');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar</span>
            </Link>
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600">
                Pergunta {currentQuestion + 1} de {quizQuestions.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {!isSubmitting ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-gray-600">{question.subtitle}</p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => {
                const isSelected = selectedOptions.includes(option);
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-base sm:text-lg ${
                        isSelected ? 'text-emerald-900 font-semibold' : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {currentQuestion > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={selectedOptions.length === 0}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedOptions.length > 0
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finalizar' : 'Próxima'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Analisando Suas Respostas...
            </h2>
            <p className="text-xl text-gray-600">
              Estamos criando seu plano personalizado baseado no seu perfil
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
