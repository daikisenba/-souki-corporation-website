// GA4イベント送信の薄いラッパー。
// gtag() は app/layout.tsx で読み込む GA4 スニペットがグローバルに定義する。
// SSR時(window未定義)やGA未ロード時は安全に何もしない。

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        gtag?: (command: string, eventName: string, params?: GtagParams) => void;
        dataLayer?: unknown[];
    }
}

/**
 * GA4へカスタムイベントを送る。計測が未設定でもアプリを壊さないよう防御的に呼ぶ。
 * 主要イベント:
 *  - generate_lead    … 資料請求・無料相談フォームの送信完了(コンバージョン)
 *  - brochure_download … サービス資料(PDF)ページを開いた
 *  - trial_click      … 14日間無料トライアル(Stripe)ボタンのクリック
 */
export function trackEvent(eventName: string, params: GtagParams = {}): void {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
}
