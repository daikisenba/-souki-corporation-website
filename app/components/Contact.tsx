"use client";
import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section id="contact" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
                        無料相談・お問い合わせ
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        お気軽にお問い合わせください。24時間以内にご返信いたします。
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    お名前 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                                    placeholder="お名前を入力してください"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                    会社名
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                                    placeholder="会社名を入力してください"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                                    ご相談内容
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                                >
                                    <option value="">選択してください</option>
                                    <option value="subsidy">助成金コンサルティング</option>
                                    <option value="bidding">公共事業入札支援</option>
                                    <option value="sales">営業業務の効率化</option>
                                    <option value="other">その他</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    お問い合わせ内容 <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 resize-none"
                                    placeholder="お問い合わせ内容を詳しく入力してください"
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
                                >
                                    無料相談を申し込む
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                            <p className="text-gray-600 mb-4">
                                お電話でのお問い合わせも承っております
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                                080-2256-9062
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                平日 9:00〜18:00
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
