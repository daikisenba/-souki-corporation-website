"use client";
import { motion } from "framer-motion";
import { Brain, BarChart3, Globe, Zap } from "lucide-react";

export default function SectionB({ className }: { className?: string }) {
  const technologies = [
    {
      icon: Brain,
      title: "AI開発",
      description: "最新の生成AI技術を活用したカスタムソリューション開発"
    },
    {
      icon: BarChart3,
      title: "データ分析",
      description: "ビッグデータ分析による業務効率化と意思決定支援"
    },
    {
      icon: Globe,
      title: "Webシステム",
      description: "スケーラブルでセキュアなWebアプリケーション構築"
    },
    {
      icon: Zap,
      title: "自動化",
      description: "RPAとAIを組み合わせた業務プロセス自動化"
    }
  ];

  const effects = [
    {
      title: "業務効率化",
      description: "定型業務の自動化により、生産性が向上"
    },
    {
      title: "コスト削減",
      description: "助成金活用とAI導入で経費を大幅削減"
    },
    {
      title: "競争力向上",
      description: "最新技術導入で市場での優位性確保"
    },
    {
      title: "新規事業創出",
      description: "AI技術を活用した新しいビジネスモデル"
    }
  ];

  return (
    <section className={`py-16 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* 技術力セクション */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              技術力
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              最新技術を駆使し、お客様のビジネスに革新的なソリューションを提供します
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <tech.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 期待できる効果セクション */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              期待できる効果
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              お客様の課題解決に向けた具体的な成果
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {effects.map((effect, index) => (
              <motion.div
                key={effect.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  {effect.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {effect.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
