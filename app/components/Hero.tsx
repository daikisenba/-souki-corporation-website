import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden
             bg-gradient-to-br from-[#EAF2FF] via-[#EEF4FF] to-[#E7F0FF]
             dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900">
      {/* 動くグラデブロブ */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />
      <div className="container grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-slate-600 bg-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> 生成AIで、業務はもっと軽く
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            信頼と革新で未来を創る
          </h1>

          {/* 成長の道を、共に歩むパートナー - モバイル版でも一行になるよう字のサイズ調整 */}
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 leading-tight">
            成長の道を、共に歩むパートナー
          </h2>

          <p className="text-slate-600">
            公共事業の確実性と生成AIによる効率化を両立し、信頼できる伴走パートナーとして企業・社会の生産性向上に貢献します。
          </p>

          <div className="flex gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              無料相談
            </Link>
            <Link href="/demos" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              デモを見る
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-6 bg-white/80 backdrop-blur border rounded-2xl">
            <div className="text-sm grid gap-2">
              <div><strong>例：</strong> 問い合わせ一次対応の自動化 / 議事録要約とタスク抽出 / 見積・帳票の下書き生成</div>
              <div className="text-slate-500">スモールスタート → 効果検証 → 本格導入の流れで安心です。</div>
            </div>
          </div>
          <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden border">
            {/* 抽象イラスト/図解/写真 どれでもOK：あとで差し替え */}
            <Image src="/hero-abstract.png" alt="業務効率化イメージ" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
