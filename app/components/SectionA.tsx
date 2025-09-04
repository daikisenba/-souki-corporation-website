"use client";
import { motion } from "framer-motion";
import { FileText, Building2, TrendingUp } from "lucide-react";

export default function SectionA({ className }: { className?: string }) {
  const services = [
    {
      icon: FileText,
      title: "助成金コンサルティング",
      description: "企業や個人事業主の皆さまが活用できる各種助成金制度について、情報収集から申請書類の作成、提出までを一貫してサポートいたします。",
      features: [
        "返済不要の資金調達手段として活用",
        "豊富な実務経験による最適な制度選定",
        "スムーズな受給に向けた具体的な支援"
      ],
      buttonText: "無料相談はこちら"
    },
    {
      icon: Building2,
      title: "公共事業入札支援",
      description: "官公庁や自治体が発注する公共事業は、安定性と規模の大きさが魅力ですが、入札や契約に至るまでのプロセスは複雑であり、専門的な知識と丁寧な準備が欠かせません。",
      features: [
        "公告情報の収集・分析から入札戦略立案",
        "必要書類の作成支援",
        "安定した事業基盤の構築サポート"
      ],
      buttonText: "無料相談はこちら"
    },
    {
      icon: TrendingUp,
      title: "営業業務の効率化",
      description: "最新のAI技術を活用し、営業活動の効率化と売上向上を実現します。顧客データの分析、リード管理の自動化、営業活動の最適化により、営業チームの生産性を大幅に向上させます。",
      features: [
        "顧客データ分析による営業戦略立案",
        "リード管理の自動化・効率化",
        "営業活動の最適化と売上向上支援"
      ],
      buttonText: "無料相談はこちら"
    }
  ];

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            事業内容
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            信頼性・安定性・実績を重視し、お客様の成長をサポートする3つのサービスを提供しています
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300">
                {service.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
