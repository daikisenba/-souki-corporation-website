"use client";
import { motion } from "framer-motion";

export default function Message() {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-4">
                {/* 代表メッセージ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
                        代表メッセージ
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 md:p-12">
                            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    私たちは、公共領域にも安心して導入できる仕組みと、最新の生成AIを組み合わせ、これからの社会に必要とされる業務スタイルを創り出していきます。
                                </p>
                                <p>
                                    テンプレではなく、一社ごとの課題に合わせたオーダーメイド型の解決策を提案し、「効率化」と「安心感」を同時に実現することを目指します。
                                </p>
                                <p>
                                    信頼を積み重ねながら革新を続け、人とテクノロジーが共に成長できる未来を描いていきます。
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 会社概要 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
                        会社概要
                    </h2>

                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="space-y-4 text-left">
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="font-semibold text-gray-700">会社名</span>
                                    <span className="text-gray-900">株式会社想樹</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="font-semibold text-gray-700">創業</span>
                                    <span className="text-gray-900">2024年3月</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="font-semibold text-gray-700">所在地</span>
                                    <span className="text-gray-900">東京都世田谷区松原5-58-17</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="font-semibold text-gray-700">代表取締役</span>
                                    <span className="text-gray-900">千羽 太樹</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span className="font-semibold text-gray-700">メール</span>
                                    <span className="text-gray-900">info@souki-cp.co.jp</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
