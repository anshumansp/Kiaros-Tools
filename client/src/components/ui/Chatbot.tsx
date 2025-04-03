'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Question = {
    id: string;
    text: string;
    answer: string;
};

const questions: Question[] = [
    {
        id: 'what-is-kiaros',
        text: 'What is Kiaros?',
        answer: 'Kiaros is a suite of premium tools designed to boost your productivity. We offer PDF tools, image converters, a resume maker, and more!'
    },
    {
        id: 'pricing',
        text: 'How much does it cost?',
        answer: 'We offer both free and premium tools. Basic functionality is free, while premium features are available with a subscription starting at $9.99/month.'
    },
    {
        id: 'tools-available',
        text: 'What tools are available?',
        answer: 'We currently offer PDF merger, PDF splitter, image converter, resume builder, and more tools are coming soon!'
    },
    {
        id: 'account-needed',
        text: 'Do I need an account?',
        answer: 'You can use basic features without an account, but creating an account lets you save your work and access premium features.'
    }
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show chatbot icon after a delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleQuestionClick = (question: Question) => {
        setSelectedQuestion(question);
    };

    const reset = () => {
        setSelectedQuestion(null);
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#142E54] text-white shadow-lg hover:bg-[#0e2240] transition-colors focus:outline-none"
                            aria-label="Open chat"
                        >
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                </svg>
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-[#142E54] text-white p-4">
                            <h3 className="font-medium">Kiaros Assistant</h3>
                            <p className="text-sm text-gray-200">How can we help you today?</p>
                        </div>

                        <div className="h-80 overflow-y-auto p-4">
                            {selectedQuestion ? (
                                <div className="space-y-4">
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <p className="font-medium">{selectedQuestion.text}</p>
                                    </div>
                                    <div className="bg-[#EAE6DF] p-3 rounded-lg">
                                        <p>{selectedQuestion.answer}</p>
                                    </div>
                                    <button
                                        onClick={reset}
                                        className="text-sm text-[#142E54] hover:underline"
                                    >
                                        Ask another question
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 mb-3">Frequently asked questions:</p>
                                    {questions.map((question) => (
                                        <button
                                            key={question.id}
                                            onClick={() => handleQuestionClick(question)}
                                            className="block w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            {question.text}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between">
                            <a
                                href="/contact"
                                className="text-sm font-medium text-[#142E54] hover:text-[#0e2240] transition-colors"
                            >
                                Inquire More
                            </a>
                            <a
                                href="/tools"
                                className="text-sm font-medium text-[#142E54] hover:text-[#0e2240] transition-colors"
                            >
                                Try Tools
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 