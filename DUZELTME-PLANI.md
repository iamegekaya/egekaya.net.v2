# egekaya.net — Fazlı Düzeltme Planı

**Kaynak:** [DENETIM-RAPORU.md](DENETIM-RAPORU.md)
**Tarih:** 2026-08-05
**Prensip:** Her faz tek başına merge edilebilir, tek başına doğrulanabilir ve geri alınabilir. Fazları karıştırma — bir sonrakine geçmeden önce doğrulama kriterini geçtiğinden emin ol.

---

## Durum — 2026-08-06

**Faz 0–7, davranış doğrulaması, CSP, Y4 ve galerinin DepthCarousel'e geçişi tamamlandı** — hepsi `main`'e merge edildi. **Kod tarafında planlanmış iş kalmadı.** Kalan: push, `vercel --prod` + F6 doğrulaması, CSP'nin zorunlu moda alınması.

> Aşağıdaki tamamlanmış faz bölümleri **silinmedi**; planlanan ile yapılan arasındaki farkın kaydı olarak duruyor. Her birinin başında ne değiştiğini anlatan bir not var.

| Faz | Odak | Durum | Commit'ler |
|---|---|---|---|
| **0** | Hazırlık ve ölçüm | ✅ Tamam | `ca29b2e`…`13107c9` (6 commit) |
| **1** | Güvenlik + çökme | ✅ Tamam | `4d141fb`, `7368512`, `33b9cd1` |
| **2** | Görünür hatalar | ✅ Tamam | `80f6d81`, `1ac7bbb`, `c5a6d9a` |
| **3** | Performans | ✅ Tamam | `a0cfad1`, `5e028ff` |
| **4** | Erişilebilirlik | ✅ Tamam | `3414ee6`, `0f81934`, `c69d49f` |
| **5** | SEO ve metadata | ✅ Tamam | `1e60e9a`…`623eff6` (GLM 5.2) + `ed93b08`, `ddb95e5`, `88a0ef2` (inceleme düzeltmeleri) |
| **6** | Sertleştirme | ✅ Tamam (CSP hariç) | `090f0d2`, `467348f`, `5e642d8`, `deb40c0` |
| **7** | Temizlik | ✅ Tamam (daraltılmış kapsam) | `99e9fb3`, `3ce97bb` |
| **—** | CSP | ✅ Tamam (report-only) | `3340710` |
| **—** | Y4 — ana sayfa varlıkları | ✅ Tamam | `144ef39`, `ad11cf6` |
| **—** | Galeri → DepthCarousel | ✅ Tamam | `caae6ae`, `212d53a` |

`main`, `origin/main`'in 28 commit önünde ve **henüz push edilmedi.**

### Faz 5 dış model tarafından yazıldı

Faz 5'i **GLM 5.2** uyguladı, ardından incelendi. Üç kusur bulunup düzeltildi:

| Kusur | Kök neden |
|---|---|
| OG kartında "Photography" sağdan kesiliyordu | Satori çok çocuklu elemanı varsayılan olarak flex **row** yapıyor; `flexDirection: "column"` tek metinli iç span'lere konmuştu, dış sarmalayıcıya değil |
| `og:site_name` ve `og:locale` beş sayfada da yoktu | Next, sayfa kendi `openGraph`'ını tanımlayınca nesnenin **tamamını** değiştiriyor, alan bazlı birleştirmiyor — kökteki alanlar sessizce kayboluyordu |
| R4'ün yarısı eksikti | `aria-current="page"` eklenmiş ama `globals.css`'te hiçbir stil yoktu; gören kullanıcı hâlâ hangi sayfada olduğunu anlayamıyordu |

Ders: **dış modelin ürettiği görsel çıktıyı gözle doğrula.** OG kartı build'den, lint'ten ve typecheck'ten temiz geçiyordu; kusur yalnızca üretilen PNG'ye bakınca görüldü.

### Ölçülen sonuçlar

| Ölçüm | Denetim öncesi | Şimdi |
|---|---|---|
| Sahte IP header'lı 20 POST | 20× kabul | 5× kabul, sonra `429` |
| `/photography` ilk yükleme | 35.15 MB | ~0.20 MB |
| Tüm galeri (13 fotoğraf) | ~119 MB | ~1 MB |
| `width`/`height` taşıyan görsel | 0 / 13 | 13 / 13 |
| 404 sayfası | Next'in çıplak varsayılanı | Sitenin kendi tasarımı |
| Menü klavye erişimi | Yok | Escape, focus trap, odak dönüşü |
| `/` transfer (soğuk) | 2528.2 KB | **239.1 KB** (−%90.5) |
| `pp.png` | 2028.9 KB | **21.5 KB** (iki avatar) |
| Shine maskesi | 304.8 KB (SVG) | **17.7 KB** (PNG) |
| Beş sayfada CSP ihlali | Politika yoktu | 0 (politikanın canlı olduğu kasten ihlalle doğrulandı) |
| Sayfa bazlı `<title>` | 5 sayfa tek `egekaya.net` | 5 özgün (template `%s — egekaya.net`) |
| `og:image` / `twitter:image` | Yok | 5 sayfada 1200×630 PNG (`og:image:width/height/alt` ile) |
| `link rel="canonical"` | Yok | 5 sayfada özgün `https://egekaya.net/<route>` |
| `sitemap.xml` / `robots.txt` | Yok | 5 rota + monthly + `/api/` disallow |
| Home CTA | `<button onClick={router.push}>` | `<a href="/contact" aria-label="Contact Ege Kaya">` |
| Aktif sayfa işareti | Yok | `aria-current="page"` (SSR) **+ accent rengi ve nokta işareti** |
| `Content-Type: text/plain` gönderimi | Kabul ediliyordu | `415` |
| 50 KB gövde | Parse ediliyordu | `413` (32 KB tavan, stream sayılarak) |
| `Origin` header'sız istek | Geçiyordu | `403` |
| Global limit tüketimi | Parse'tan önce, çöp istekler dahil | Yalnızca tam doğrulanmış istekler |
| Reveal tween'leri `revert()` sonrası | 1 tween sağ kalıyordu | 0 (Node'da izole ölçüldü) |
| `/photography` CLS (kısıtlı ağ) | Ölçülemiyordu | **0** — sıfır layout shift |
| Tüm galeri, 13 görsel yüklü | ~119 MB | **0.51 MB** (1.6 Mbps + 4× CPU ile ölçüldü) |
| `/photography` soğuk toplam | 35.15 MB | **431.3 KB** (karusel sonrası; masonry döneminde 499.5 KB'ydı) |
| Galeri görselleri | ~119 MB | **220.8 KB** (kart başına 384px) |
| Boştaki rAF döngüsü sayısı | 2 (glitch + tilt, tilt hiç durmuyordu) | 1 (yalnızca glitch) |

### Alınan kararlar

| Karar | Sonuç | Etkisi |
|---|---|---|
| **Deploy hedefi** | **Vercel** | Faz 1'den G5 (Docker sertleştirme) düştü. `output: "standalone"` kaldırıldı. |
| **Rate limiter** | **Mevcut bellek içi limiter düzeltildi** | Yeni bağımlılık yok. Kabul edilen sınır: Map lambda örneği başına, yani Vercel'de en iyi çaba. Daha sıkı limit gerekirse Vercel WAF. |
| **Docker** | **Kullanılmayacak** | `output: "standalone"` kaldırıldı; Y1 ve Y2 birlikte kapandı. |
| **Reduced motion kapsamı** | **Yalnızca `prefers-reduced-motion`** | `shouldReduceEffects` dokunmatik cihazları da kapsadığı için kullanılmadı — yoksa tüm telefonlarda reveal animasyonları kapanırdı. |
| **OG görseli** | **Dinamik `ImageResponse` (`next/og`)** | Yeni bağımlılık yok. Tek kök `opengraph-image.tsx` + `twitter-image.tsx` re-export. Tüm sayfalar aynı kartı paylaşır; `title`/`description` sayfa bazlıdır. |
| **OG kapsamı** | **Yalnızca kök** | Sayfa bazlı OG kartları yapılmadı — beş kart için ek modül/yük yok. |
| **R3 (Home CTA)** | **Faz 5'te yapıldı** | `ProfileCard`'a opsiyonel `contactHref?: Route` eklendi; `onContactClick` legacy API olarak korundu. `HomeProfileCard` server component'e döndü. |
| **R4 (aria-current)** | **Faz 5'te yapıldı** | `StaggeredMenu` zaten `"use client"` — `usePathname` doğrudan eklendi, sarmalayıcı gerekmedi. Next 16 SSR sırasında doğru pathname'i okuyor. |
| **R5 (Home menü öğesi)** | **Açık bırakıldı** | Eve dönüş marka linkinden veriliyor; bug değil, ux tercihi. Faz 7'de tekrar değerlendirilebilir. |
| **Manifest** | **Statik kaldı** | `public/site.webmanifest` korundu; `src/app/manifest.ts`'e taşınmadı. |
| **Sayfa bazlı `openGraph.images`** | **Her sayfada `src/lib/seo-image.ts`'ten import** | Next metadata merge whole-object olduğu için sayfa `openGraph`'ı kökün `images`'ını ezer; yardımcı dosya tekrarı azaltır. Aynı sebeple `siteName`/`locale` de `openGraphSiteDefaults` olarak spread ediliyor. |
| **CSP** | **Seçenek A — `'unsafe-inline'`, statik render korundu** (`3340710`) | Nonce'lu B reddedildi: Next nonce için dinamik render zorunlu tutuyor (beş sayfa da `ƒ` olurdu) ve nonce `style=""` özniteliklerini kapsamadığı için `style-src`'de `'unsafe-inline'` yine gerekiyordu — B'nin tek kazancı script tarafıydı. Report-only ile ship edildi, tek boolean ile zorunlu moda geçiyor. |
| **G7 (`startedAt` taklidi)** | **Bilerek ertelendi** | Spam gerçek bir sorun hâline gelmedikçe imzalı zaman damgası veya Turnstile eklemek orantısız karmaşıklık. |
| **Global rate limit konumu** | **Doğrulamadan sonraya alındı** | Önce ön kapıdaydı; tek bir host paylaşılan 120/pencere bütçesini çöp isteklerle harcayıp formu herkese kapatabiliyordu. Per-IP limiti ön kapıda kaldı (Vercel'de anahtarı sahtelenemez). |
| **`next-env.d.ts`** | **Takipten çıkarıldı, gitignore'landı** | Next `dev`/`build` arasında dosyayı yeniden yazıyordu ve her geçiş diff üretiyordu. Her çalıştırmada yeniden üretiliyor. |
| **Ref registrar'ın yeri** | **Hook döndürüyor, ayrı yardımcı değil** | Ref'i düz bir fonksiyona geçirmek `react-hooks/refs` kuralını tetikliyor; hook'a geçirmek tetiklemiyor. |
| **Docker dosyaları** | **Silindi** (`Dockerfile`, `compose.yaml`, `.dockerignore`) | Faz 1'de `output: "standalone"` kalkınca çalışmaz hâle gelmişlerdi ve deploy hedefi Vercel. Yedek alınmadı — geçmişte `ca29b2e`'de duruyorlar. |
| **R5 — menüye "Home"** | **Eklendi** | Faz 5'te açık bırakılmıştı. Menü 6 → 7 öğe, panel içi odaklanabilir sayısı 9 → 10. Ana sayfada accent rengi ve nokta işaretiyle aktif görünüyor. |

### Uygulama sırasında ortaya çıkanlar

Denetimde olmayan, iş sırasında bulunan şeyler:

- **Y1, Y2, Y3** — Faz 0 ölçümünde çıktı, [DENETIM-RAPORU.md §8](DENETIM-RAPORU.md)'e işlendi. Y1 ve Y2 Faz 1'de kapandı; Y3 (`next-env.d.ts` gürültüsü) Faz 6'ya kaldı.
- **G1'in şiddeti abartılmıştı.** Kod okunduğunda görüldü ki sahte IP header'ı per-IP limitini atlatıyor ama global limit (120/10 dk) yine devreye giriyor. "Sınırsız mail" değil. Asıl ciddi kısım, 429 yiyen isteklerin bile Map'e kalıcı kayıt eklemesi ve istek başına iki kez O(n) tarama tetiklemesiydi.
- **F2'nin iki katmanı vardı.** Kayıp `:hover` kuralını JS'e taşımak gerekliydi ama tek başına yetmedi — inline `--card-opacity: 0` stylesheet kurallarını ezdiği için çözüm zaten JS olmak zorundaydı.
- **Odak geri dönüşünde kusur.** Faz 4'ün ilk hâli "önceki odaklanmış eleman"a dönüyordu; bazı tarayıcılar butonu tıklamada odaklamadığı için odak `body`'ye düşüyordu. Toggle'a fallback eklendi.
- **`@property` yanlış tanı.** Faz 2'de glow transition'ının donmasını "kayıtsız custom property interpolasyonu" sanıp bir `@property` kuralı eklendi; ölçünce sebebin gizli sekme olduğu görülüp geri alındı. Commit'lere girmedi.
- **Vercel `x-forwarded-for`'u üzerine yazıyor.** Faz 1'de dokümandan doğrulandı: platform bu header'ı kendisi yazıyor ve dış değerleri iletmiyor. `cf-connecting-ip` ve `x-real-ip` ise platform tarafından set edilmiyor — açığın kaynağı tam olarak buydu.
- **Gövde limiti için platform garantisine dayanılmadı.** Vercel dokümanında bir istek gövdesi limiti doğrulanamadığı için 32 KB tavan, `content-length` kontrolü **ve** stream sayımıyla kodda uygulandı; `content-length` chunked istekte atlanabiliyor.
- **F5 doğrulaması tarayıcıda mümkün değildi.** Başarısızlık modu ciddi olduğu için (tüm başlıklar kalıcı görünmez kalabilirdi) kurulu `gsap` ile Node'da izole bir karşılaştırma çalıştırıldı: eski şekil `revert()` sonrası 1 tween sızdırıyor, yeni şekil 0. Bulgunun gerçekliği ve düzeltmenin etkisi birlikte kanıtlandı.
- **`next-env.d.ts` merge'de diskten silindi.** Takipten çıkarma commit'i `main`'e fast-forward edilince dosya çalışma ağacından da kalktı. `next build` yeniden üretiyor, `git status` temiz kalıyor — kendi kendini onarıyor, ama temiz bir checkout'ta `build`'den önce `typecheck` çalıştırmak artık daha da anlamsız. `npm run verify` tam olarak bunun için var.

### Davranış doğrulaması — 2026-08-06 ✅

Faz 1–6 boyunca yedi davranış doğrulanamamıştı: geliştirme sırasında kullanılan tarayıcı paneli `visibilityState: "hidden"` ve `document.hasFocus() === false` durumunda çalışıyor, bu yüzden `requestAnimationFrame` donuyor, CSS transition'ları ilerlemiyor ve hiçbir eleman `:focus` ile eşleşmiyor.

**Çözüm:** Kurulu **Brave** (Chromium 151) headless modda, geçici bir profille ve CDP üzerinden sürüldü. Ortam önce doğrulandı — `visible`, `hasFocus: true`, rAF 61 fps — sonra testler koşuldu. Test betikleri repo dışında (scratchpad); projede hiçbir değişiklik yapılmadı.

| # | Davranış | Sonuç | Kanıt |
|---|---|---|---|
| 1 | F1 — menü çift tıklama kilidi | ✅ Geçti | Aç → animasyon ortasında kapat → 150 ms sonra tekrar aç. Panel `left: 997` ölçüldü (tam açık 980, kapalı 1440 — yani kapanış **gerçekten uçuştaydı**, test hatayı tetikleyen senaryoyu yakaladı). Sonuç: `aria-expanded="true"` ve panel ekranda, tutarlı. |
| 2 | Skip-link | ✅ Geçti | Tab → `top: -96px → 16px`, `:focus` eşleşiyor, accent outline, ekranda |
| 3 | F2 — arka ışıma | ✅ Geçti | Boşta `0` → hover `0.8` → ayrılınca `0`. 200 ms fade ve rAF settle dönüşü çalışıyor |
| 4 | F4 — boşta rAF | ✅ Geçti | Boşta **1** sürekli döngü (LetterGlitch, 122 kare/2 sn); hover'da **2** — ikincisi `Math.exp(-l/(i<d?.6:.14))` imzalı, tilt motorunun tau sabitleri (`INITIAL_TAU=0.6`, `DEFAULT_TAU=0.14`) birebir eşleşiyor. Tilt döngüsü boştayken duruyor. |
| 5 | F6 — iOS hareket izni | 📋 **Yapılacak** | Gerçek iPhone gerekiyor. Repo sahibi `vercel --prod` sonrası canlı site üzerinden test edecek: HTTPS üzerinden Contact'a dokun, hareket izni penceresi **çıkmamalı**. |
| 6 | E4 — reduced motion | ✅ Geçti | `Emulation.setEmulatedMedia` ile: 6 kelime + 6 liste öğesi **inline stil olmadan** görünür (GSAP hiç dokunmamış), `scroll-behavior: auto` |
| 7 | P2 — gerçek CLS | ✅ Geçti | 1.6 Mbps + 4× CPU kısıtlamasıyla `/photography`: **CLS 0**, sıfır layout shift, 13/13 görsel yüklendi |

**Bonus 1 — F5'in çalışma anındaki kanıtı.** Test 6'nın normal modu kelimeleri `opacity: 1` inline stiliyle gösterdi, yani `animateIn` `self.add()` üzerinden çalışıp tamamlandı. Node harness'ı tween'in context'e kaydolduğunu kanıtlamıştı; bu da animasyonun gerçek tarayıcıda bittiğini gösteriyor.

**Bonus 2 — galeri tahminden iyi.** Kısıtlı bağlantıda 13 görselin **tamamı** yüklenmiş hâlde toplam transfer **0.51 MB**. Faz 3'te "~1 MB" öngörülmüştü; gerçek sayı yarısı.

**Ders:** Gizli/odaksız bir tarayıcıda rAF, CSS transition ve `:focus` davranışları hiç gözlemlenemez. Bu sınıftaki doğrulamalar için headless Chromium + CDP gerekiyor — panel yeterli değil.

**Neden bu sıra:** Faz 1 bugün sömürülebilir olanı ve ziyaretçiyi siteden düşüren iki senaryoyu kapattı. Faz 2 kullanıcının gözüyle bozuk olanı düzeltti. Faz 3 en ağır maliyeti kaldırdı. Faz 4–5 erişim ve keşfedilebilirlik. Faz 6–7 borç ödemesi — acelesi yok ama biriktikçe pahalılaşır.

---

## Faz 0 — Hazırlık ✅

> **Tamamlandı.** Dal açma, baseline commit ve `.gitignore` tek bir commit setinde halledildi. Ölçümler alındı ve [DENETIM-RAPORU.md §8](DENETIM-RAPORU.md)'e işlendi. Docker baseline'ı (`whoami` → root) alınamadı — Docker Desktop kapalıydı — ama Vercel kararından sonra gereksiz kaldı.

Kod yazmadan önce. Bunlar olmadan sonraki fazların "işe yaradı mı" sorusunu cevaplayamazsın.

1. **Dal aç:** `git checkout -b fix/audit-phase-1`. Her faz kendi dalında.
2. **Mevcut değişiklikleri commit'le.** Şu an `next.config.ts`, `(site)/layout.tsx`, `api/contact/route.ts`, `contact-form.tsx` ve untracked Docker dosyaları commit'lenmemiş durumda. Düzeltmeleri bunların üstüne yığma — önce bu çalışmayı kendi commit'ine al ki diff okunabilir kalsın.
3. **`.gitignore`'a `favicon_io/` ekle** (Faz 7'de silinecek, o zamana kadar gürültü yapmasın).
4. **Temel ölçüm al:**
   ```bash
   npm run build && npm run typecheck && npm run lint
   ```
   `.next/types/` dizini `build` sonrası oluşur — K1 gereği `typecheck`'i **build'den sonra** çalıştır.
5. **Lighthouse temel skoru** al (`/` ve `/photography` için ayrı ayrı). Faz 3 ve 4'ün etkisini bununla ölçeceksin.

**Doğrulama:** Build, typecheck, lint temiz. Baseline Lighthouse skorları kaydedildi.

---

## Faz 1 — Güvenlik ve Çökme Önleme ✅

> **Tamamlandı, kapsam değişti.** Deploy hedefi Vercel çıkınca **1.4 (Docker sertleştirme) tamamen düştü** — aşağıda tarihsel kayıt olarak duruyor, uygulanmadı. Yerine Y1 ve Y2 girdi: `output: "standalone"` kaldırıldı, bu tek değişiklik `npm run start`'ı geri getirdi ve `.env`'in build çıktısına kopyalanmasını durdurdu.
>
> 1.1'de IP kaynağı Vercel'e göre çözüldü: Vercel dokümanı `x-forwarded-for`'u kendisinin üzerine yazdığını ve dış değerleri iletmediğini söylüyor, dolayısıyla sahtelenemeyen tek kaynak o. `cf-connecting-ip` ve `x-real-ip` okuma tamamen kaldırıldı.
>
> **Yan etki:** `Dockerfile` ve `compose.yaml` artık çalışmıyor (`.next/standalone` üretilmiyor). Faz 7'de karara bağlanacak.

**Hedef:** Bugün sömürülebilir olan tek açığı kapat, ziyaretçiyi sitenin dışına atan iki senaryoyu ortadan kaldır.

### 1.1 — Rate limiter'ı düzelt (G1)
**Dosya:** `src/app/api/contact/route.ts:44-70`, `:107-115`

Üç ayrı düzeltme, üçü de gerekli:

**a) IP kaynağını güvenilir hale getir.** Şu an `cf-connecting-ip` ilk sırada okunuyor ve önünde bunu temizleyecek proxy yok. Deployment'a göre seç:
- **Vercel'de:** yalnızca `x-forwarded-for`'un **ilk** değerini kullan — platform bunu yazıyor. `cf-connecting-ip` ve `x-real-ip` okumayı tamamen bırak.
- **Self-hosted'da:** `TRUSTED_PROXY=true` gibi bir env değişkeni ile kapıla. Proxy yoksa header'lara hiç güvenme, sadece global limite düş.

**b) Kova sızıntısını kapat.** `||` kısa devresi yüzünden per-IP kova, global limit kontrol edilmeden önce yaratılıyor. Sırayı ters çevir:
```ts
// önce global — bu reddedilirse hiçbir kova yaratılmaz
if (globalCount >= MAX_GLOBAL_REQUESTS_PER_WINDOW) return false;
// sonra per-IP
```
Ayrıca `rateLimitBuckets.size` için sert bir tavan koy (örn. 10.000); aşılırsa en eski kayıtları at ya da doğrudan reddet.

**c) Vercel'de bunun zaten çalışmadığını kabul et.** Modül seviyesindeki `Map` lambda örneği başına. Ciddi bir limit istiyorsan Vercel KV / Upstash gerekli. *Karar senin:* portfolyo sitesi için bellek içi limiter + tavan yeterli olabilir; ama o zaman bunun "en iyi çaba" olduğunu bilerek bırak.

**Doğrulama:**
```bash
for i in $(seq 1 20); do curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -H "CF-Connecting-IP: 1.2.3.$i" -d '{"name":"t","email":"t@t.com","message":"test","startedAt":0}'; done
```
6. istekten itibaren `429` görmelisin. Şu an hepsi geçiyor.

---

### 1.2 — Hata ve 404 sayfaları ekle (R1)
**Dosyalar:** yeni `src/app/not-found.tsx`, `src/app/(site)/error.tsx`, `src/app/global-error.tsx`

- **`src/app/not-found.tsx`** — `(site)/layout.tsx`'in dışında render edildiği için `LetterGlitch`, `StaggeredMenu` ve footer'ı kendi içinde tekrar kurmalı ya da en azından siteye dönüş linki içermeli. Minimum: başlık + `/`'a `<Link>`.
- **`src/app/(site)/error.tsx`** — `"use client"` zorunlu, `{ error, reset }` prop'ları alır. `reset()` butonu koy.
- **`src/app/global-error.tsx`** — kendi `<html>` ve `<body>` etiketlerini render etmeli (root layout devrede olmaz).

### 1.3 — Fotoğraf okumasını sağlamlaştır (R1 devamı)
**Dosya:** `src/app/(site)/photography/page.tsx:13`

`readdirSync` modül seviyesinde; `ENOENT` build'i komple düşürüyor. `try/catch` ile sarmala ve boş diziye düş:
```ts
let fileNames: string[] = [];
try { fileNames = readdirSync(portfolioDir); } catch { fileNames = []; }
```
Sayfa da boş listede anlamlı bir mesaj göstermeli.

> **Bilinmesi gereken davranış:** Bu okuma build zamanında gerçekleşiyor ve sonuç prerender edilmiş sayfaya gömülüyor. Yeni fotoğraf eklemek **yeniden build gerektirir.** Bu Faz 3'te `next/image`'a geçince de değişmez. İstemiyorsan sayfayı `dynamic = "force-dynamic"` yapman gerekir — ama o zaman her istekte disk okursun. Portfolyo için build-time doğru tercih; sadece bunu bilerek yap.

### 1.4 — Docker'ı sertleştir (G5)
**Dosyalar:** `Dockerfile`, `compose.yaml`

- `Dockerfile` runner stage'inde `CMD`'den **önce** `USER node` ekle. (`node:22-bookworm-slim` imajında `node` kullanıcısı hazır geliyor.) Kopyalanan dosyaların sahipliğini de ayarla: `COPY --chown=node:node ...`.
- `compose.yaml`:
  ```yaml
  ports:
    - "127.0.0.1:3000:3000"   # 0.0.0.0 yerine
  read_only: true
  cap_drop: [ALL]
  security_opt: ["no-new-privileges:true"]
  mem_limit: 512m
  healthcheck:
    test: ["CMD", "node", "-e", "fetch('http://localhost:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
    interval: 30s
  ```
- `read_only: true` ile Next'in `.next/cache`'e yazması gerekebilir — gerekirse `tmpfs: [/app/.next/cache]` ekle.
- Önüne TLS sonlandıran bir reverse proxy koy. **Bu adım 1.1'in yarısını da çözer** çünkü proxy header'ları normalize eder.

**Faz 1 doğrulaması:**
- Yukarıdaki curl döngüsü 429 veriyor
- `/olmayan-sayfa` sitenin kendi 404'ünü gösteriyor, menü ve dönüş linki var
- `docker compose up` sonrası `docker exec <container> whoami` → `node` (root değil)
- `curl localhost:3000/api/health` → 200; dışarıdan (LAN IP) → bağlantı reddi
- `npm run build && npm run typecheck && npm run lint` temiz

---

## Faz 2 — Görünür Hatalar ✅

> **Tamamlandı, beşi de uygulandı.** F2'de "geri getir mi, sil mi" seçeneğinden **geri getirme** uygulandı. F3 görsel bir değişiklik yarattı: paneller artık `rgba(6,10,9,0.74)` — yani senin tanımladığın `--surface-card-bg` — koyu ve opak. Beğenilmezse `c5a6d9a` tek başına geri alınabilir.
>
> F1'de plandaki iki seçenekten **kök neden düzeltmesi** seçildi: `toggleMenu`'yü guard'lamak yerine `playOpen` uçuştaki kapanış tween'ini kesebiliyor, böylece animasyon sırasındaki tıklamalar yutulmuyor.

**Hedef:** Kullanıcının gözüyle bozuk olan her şeyi düzelt. Bu fazın büyük kısmı `ProfileCard`'da — aşağıdaki **Ek A**'yı önce oku, port'un neyi kaybettiğini anlamadan dokunma.

### 2.1 — Menü kilitlenmesini düzelt (F1)
**Dosya:** `src/components/navigation/staggered-menu.tsx:439-455`

Kök neden: `toggleMenu` state'i koşulsuz çeviriyor ama `playOpen` `busyRef.current` true'yken sessizce geri dönüyor. `playClose` açılış timeline'ını öldürdüğünde o timeline'ın `onComplete`'i (`:277-279`) hiç çalışmıyor, dolayısıyla `busyRef` temizlenmiyor.

**Tercih edilen çözüm — kök nedeni düzelt:** `playClose` içinde açılış timeline'ını `kill()` ettiğin yerde `busyRef.current = false` de ata. Böylece state ile animasyon asla ayrışmaz.

**Alternatif (daha güvenli ama kullanıcıyı yok sayıyor):** `toggleMenu`'nün başına `if (busyRef.current) return;` koy. Bu kilitlenmeyi engeller ama animasyon sırasındaki tıklamaları yutar — kullanıcı "tıkladım olmadı" hisseder. Kök neden düzeltmesini tercih et.

**Doğrulama:** Menüyü aç, animasyon ortasında hızlıca iki kez daha tıkla. Panel ile buton durumu (`aria-expanded`, ikon açısı) her zaman aynı olmalı.

### 2.2 — Arka ışımayı geri getir (F2)
**Dosya:** `src/components/profile/profile-card.tsx:283`, `:317`, `:457`

**Kök neden kesinleşti** (bkz. Ek A): Orijinal `ProfileCard.css`'te `--card-opacity`'yi 1'e çeken şey şu kuraldı:
```css
.pc-card-wrapper:hover, .pc-card-wrapper.active { --card-opacity: 1; }
```
Port CSS'in tamamını inline style'a çevirirken **bu kuralı taşımadı.** `globals.css`'te tek bir `.pc-*` kuralı yok — doğrulandı.

**Kritik incelik:** `--card-opacity: "0"` artık wrapper'ın **inline style'ında** (`:457`). Inline style özgüllük olarak stylesheet kurallarını yener. Yani `globals.css`'e `:hover { --card-opacity: 1 }` eklemek **işe yaramaz.** Çözüm JS olmalı.

**Çözüm — ölü `active` class'ını canlı bir değişken yazımıyla değiştir:**
- `:283`'teki `shell.classList.add("active")` yerine → `wrapRef.current?.style.setProperty("--card-opacity", "1")`
- `:317`'deki `shell.classList.remove("active")` yerine → `wrapRef.current?.style.setProperty("--card-opacity", "0")`
- `:430`'daki temizlikte de sıfırla

Bu, projedeki mevcut mimariyle tutarlı — diğer tüm pointer değişkenleri zaten `wrap.style.setProperty` ile yazılıyor (`:155-165`). **İki bulguyu birden kapatıyor:** ölü `"active"` class'ı ve görünmez glow.

**Alternatif:** Glow'u tamamen sil — `behindGlowEnabled` bloğu (`:560-570`), `behindGlowColor`/`behindGlowSize` propları ve `home-profile-card.tsx:25`'teki geçiş. *Bu estetik bir karar, senin.* Işımayı hiç görmediğin için özlemiyorsan silmek daha az kod demek.

> `entering` class'ı **silinmemeli** — `:318`'de JS tarafından gerçekten okunuyor. Sadece `active` ölü.

### 2.3 — GlarePanel renk ezmesini düzelt (F3)
**Dosya:** `src/components/ui/glare-hover.tsx:117-124`

`GlareHover` `background` ve `borderColor`'ı koşulsuz inline style olarak basıyor; inline style Tailwind class'ını her zaman yener. Sonuç: `GlarePanel`'in `bg-[var(--surface-card-bg)]` / `border-[var(--surface-border-medium)]` class'ları sitede hiç etki etmiyor ve üç CSS değişkeni runtime'da ölü.

**Çözüm:** Prop varsayılanlarını `undefined` yap ve yalnızca açıkça geçirildiğinde inline style'a koy:
```tsx
style={{
  ...(background !== undefined && { background }),
  ...(borderColor !== undefined && { borderColor }),
  ...
}}
```
**Doğrulama:** Bu görsel bir değişiklik. Düzeltmeden önce ve sonra üç sayfanın (`/about`, `/cyber-security`, `/photography`) ekran görüntüsünü al ve karşılaştır. `--surface-card-bg` değerini bilinçli olarak seçtiysen panel renkleri hafifçe değişecek — istediğin bu değilse CSS değişkenlerinin değerlerini ayarla, düzeltmeyi geri alma.

### 2.4 — Sonsuz rAF döngüsünü durdur (F4)
**Dosya:** `src/components/profile/profile-card.tsx:194`

`if (stillFar || document.hasFocus())` → `if (stillFar)`.

Bu, React Bits'ten aynen gelen bir kusur (bkz. Ek A) — `document.hasFocus()` disjunct'ı döngünün sekme odaktayken **hiç durmamasına** sebep oluyor. Tek token'lık düzeltme, ana sayfada sürekli %100 bir çekirdek tüketimini bitiriyor.

**Doğrulama:** Ana sayfayı aç, imleci karttan uzaklaştır, birkaç saniye bekle. Chrome DevTools → Performance → kayıt al: `step` fonksiyonu artık çağrılmıyor olmalı.

### 2.5 — iOS hareket izni penceresini ayır (F6)
**Dosya:** `src/components/profile/profile-card.tsx:405`

`handleClick` `shellRef`'e bağlı ve Contact butonu bu shell'in torunu — iOS'ta Contact'a dokunmak navigasyonun ortasında yerel izin diyaloğu açıyor. Bu da upstream'den gelen bir kusur.

**Çözüm:** `handleClick` başında etkileşimli torunları ele:
```ts
if ((event.target as HTMLElement).closest("button, a, input")) return;
```

**Faz 2 doğrulaması:** Yukarıdaki dört doğrulama + `npm run build && npm run typecheck && npm run lint` temiz + üç sayfanın önce/sonra ekran görüntüsü karşılaştırıldı.

---

## Faz 3 — Performans ✅

> **2026-08-07 notu:** Bu fazın kurduğu masonry ızgara sonradan **DepthCarousel** ile değiştirildi (`caae6ae`, `212d53a`). Faz 3'ün asıl kazancı — görselleri `next/image` üzerinden servis etmek — korundu ve büyüdü: `/photography` soğuk toplamı 431.3 KB, görseller 220.8 KB. Bu fazda yazılan `read-image-size.ts` ise silindi; masonry'ye intrinsic boyut vermek için vardı, karusel'de kutuyu kart belirliyor. Aşağısı fazın kendi kaydı.

> **Yol A (next/image) uygulandı; Yol B (kaynak dosyaları küçültme) hâlâ karar bekliyor** — `public/images/portfolio` 119 MB olarak duruyor.
>
> Planda öngörülmeyen bir alt problem çıktı: `next/image` build zamanında keşfedilen her dosya için intrinsic boyut istiyor, fotoğraflar ise karışık yönde (4 dikey, 9 yatay), yani tek en-boy oranı varsayılamıyor. `sharp` node_modules'te var ama yalnızca `next`'in geçişli bağımlılığı olarak — ona dayanmak npm hoisting'ine bağımlı olurdu. Çözüm: JPEG SOFn ve PNG IHDR başlıklarını okuyan bağımlılıksız bir yardımcı (`src/lib/read-image-size.ts`, commit `a0cfad1`). 13 dosyanın hepsinde `sips` ile birebir eşleşti.
>
> **3.2 (`.home-main` yükseklik çakışması) uygulanmadı** — Faz 7'ye taşındı.

**Hedef:** 119 MB'lık transferi ve galeri CLS'ini bitir. Bu tek faz muhtemelen Lighthouse skorunu diğer hepsinden fazla oynatacak.

### 3.1 — Galeriyi `next/image`'a geçir (P1, P2)
**Dosya:** `src/components/photography/portfolio-card-view.tsx:27-32`

Şu an: 13 dosya, 7–12 MB arası ham JPEG, tam çözünürlükte, `<img>` ile, dördü `eager`. `/photography` ilk boyamada ~40 MB çekiyor.

**İki yol var, biri diğerini dışlamıyor:**

**Yol A — `next/image` (önerilen).** Kaynak dosyalara dokunmadan Next'in optimizer'ı devreye girer, AVIF/WebP üretir, responsive `srcset` verir.
- `<img>` yerine `<Image>`, `width`/`height` **zorunlu** — bu P2'yi (CLS) otomatik çözer.
- Boyutları build zamanında oku: `photography/page.tsx`'te `readdirSync`'in yanında görsel boyutlarını da çıkar, ya da `fill` + `sizes` kullan (masonry düzeninde `fill` daha zahmetli — açık `width`/`height` tercih et).
- `sizes` prop'unu masonry sütunlarına göre ver: `sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"`.
- `loading="eager"` yerine yalnızca ilk 1–2 görselde `priority`.
- `lint`'teki `@next/next/no-img-element` bastırmasını (`:1`) **kaldır** — artık gerekmeyecek ve gelecekte seni koruyacak.
- **Docker notu:** Optimizer runtime'da çalışır ve `sharp` gerektirir; `output: "standalone"` ile genelde dahil gelir ama imajda doğrula.

**Yol B — kaynak dosyaları küçült.** 12 MB'lık orijinaller repoda ve her Docker katmanında duruyor. Web için 2500px uzun kenar + kaliteli JPEG genelde 400–800 KB. Bu, repo boyutunu, build context'ini ve optimizer'ın iş yükünü aynı anda düşürür.
- Orijinalleri repo dışında sakla (bunlar senin ham fotoğrafların, git bunun için doğru yer değil).
- **Karar senin:** Yol A tek başına ziyaretçi tarafını çözer. Yol B repo/build tarafını çözer. İkisini birden yaparsan hem 119 MB git geçmişinden hem de transferden kurtulursun. En az Yol A'yı yap.

**Doğrulama:** `/photography`'de DevTools → Network → Disable cache → sayfa yükle. Toplam transfer **5 MB altına** inmeli (şu an ~40 MB fold üstü). Lighthouse'da CLS 0.1 altında, LCP belirgin düşmüş olmalı.

### 3.2 — `.home-main` yükseklik çakışması
**Dosya:** `src/app/globals.css:75-79` vs `src/app/(site)/page.tsx:5`

`.home-main` layer'sız olduğu için `min-height: 100vh` kuralı Tailwind'in `min-h-[100svh]` utility'sini yeniyor — mobilde `svh` kullanma amacın boşa gidiyor (adres çubuğu yüzünden sayfa taşıyor). İkisinden birini seç: ya CSS kuralından `min-height`'ı çıkar, ya Tailwind class'ını kaldır. Tek kaynak bırak.

---

## Faz 4 — Erişilebilirlik ✅

> **Tamamlandı, bir madde hariç.** 4.1–4.4 ve 4.5'in çoğu uygulandı. **Fotoğraf `alt` metinleri (E5) yapılmadı** — bu bir içerik kararı, senin yazman gerekiyor; Faz 7'ye taşındı.
>
> `aria-hidden` yerine `inert` kullanıldı ve React 19 boolean `inert`'i doğru render ediyor (`inert=""` olarak doğrulandı). Reduced motion kontrolü kasıtlı olarak `shouldReduceEffects` yerine doğrudan `prefers-reduced-motion` — yoksa dokunmatik cihazların tamamında reveal animasyonları kapanacaktı.

**Hedef:** Klavye ve ekran okuyucu kullanıcıları için siteyi kullanılabilir hale getir. En büyük boşluk menüde.

### 4.1 — Menü klavye erişimi (E1) — bu fazın çekirdeği
**Dosya:** `src/components/navigation/staggered-menu.tsx`

Şu an dosyada **hiç `keydown` handler'ı yok.** Dört parça:
1. **Escape ile kapat** — panel açıkken `document`'e `keydown` dinleyicisi.
2. **Focus trap** — panel açıldığında odağı içine al, Tab paneli terk etmesin. Basit bir implementasyon: panel içindeki odaklanabilir öğeleri sorgula, ilk/son arasında döngü kur.
3. **Focus geri dönüşü** — kapanışta odağı toggle butonuna geri ver.
4. **Açılışta ilk öğeye odak** — panel açıldığında ilk menü linkine odaklan.

### 4.2 — `inert` ile aria-hidden çakışmasını çöz (E3)
**Dosya:** `staggered-menu.tsx:555` ve `:499-501`

Kapanış sırasında 320 ms boyunca panel hem `aria-hidden="true"` hem odaklanabilir link içeriyor. Panele `inert={!open ? "" : undefined}` ekle — `inert` hem odaklanmayı hem erişilebilirlik ağacını aynı anda keser, `aria-hidden`'a gerek kalmaz.

### 4.3 — Landmark semantiği (E2)
`<aside>` → `<nav aria-label="Ana menü">` (`:551-557`). `<aside>` ARIA'da `complementary` demek; ana navigasyonun "yardımcı içerik" olarak duyurulması ekran okuyucu kullanıcılarının landmark kısayolunu kaybetmesine yol açıyor.

### 4.4 — Reduced motion (E4)
**Dosya:** `src/components/about/split-reveal.tsx`, `stagger-list.tsx`

`letter-glitch.tsx` ve `profile-card.tsx` zaten `shouldReduceEffects`'i doğru kontrol ediyor — bu iki dosya hiç kontrol etmiyor. Aynı yardımcıyı `useGsapIntersectionReveal` hook'una tak; reduced motion aktifse animasyonu atlayıp doğrudan son duruma geç (öğeler görünür kalmalı, gizli değil).

Ayrıca `globals.css:50`'deki global `scroll-behavior: smooth` için override ekle:
```css
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

### 4.5 — Küçük düzeltmeler (E5, E6)
- `staggered-menu.tsx:596` — `aria-label` rolsüz `<div>`'de yok sayılıyor. `role="group"` ekle ya da label'ı `:598`'deki `<ul>`'ye taşı.
- `split-reveal.tsx:66-69` — çift etiketleme. `aria-label` alt ağacı ezdiği için `sr-only` span ölü; birini sil.
- **Skip-to-content linki ekle** — sabit tam-viewport header overlay'i var, klavye kullanıcısı her sayfada menüyü aşmak zorunda.
- **Fotoğraf `alt` metinleri** (E5) — `"Portfolio Photo 1"` teknik olarak geçerli ama bilgi taşımıyor. Dosya adına göre bir başlık/açıklama haritası tut. *Bu senin içerik kararın; en azından bir yer tutucu yapı kur.*

**Faz 4 doğrulaması:** Fareyi bırak, siteyi baştan sona **sadece klavyeyle** gez. Menü Tab ile açılıp kapanmalı, Escape çalışmalı, odak asla görünmez bir öğeye gitmemeli. Lighthouse Accessibility skoru 95+ olmalı.

---

## Faz 5 — SEO ve Metadata ✅

> **Tamamlandı, `fix/audit-phase-5` dalında 5 commit.** Plandaki tüm maddeler uygulandı; ek olarak R3 (`<Link>`) ve R4 (`aria-current`) kararı gereği Faz 5'e taşındı ve kapatıldı. R5 (Home menü öğesi) bilinçli tasarım kararı olarak açık bırakıldı.
>
> **İş sırasında ortaya çıkan incelik:** Next 16'da sayfa `metadata.openGraph` objesi kökün `openGraph`'ını **tam** ezer (deep merge değil, whole-object). Bu yüzden köke `images` eklemek yeterli olmadı; `src/lib/seo-image.ts`'te shared `openGraphImage`/`twitterImage` export edildi ve her sayfada import edilerek bağlandı. Bu tekrar Faz 7'deki "tekrarı azalt" maddesiyle birlikte değerlendirilebilir — `metadata` için partial-merge yardımcısı düşünülebilir.
>
> **SSR sürprizi (olumlu):** `usePathname` Next 16'da SSR sırasında doğru pathname'i okuyor. `aria-current="page"` statik prerender edilmiş HTML'de doğru öğede görünüyor — yalnızca client-side değil. Böylece `disableJavaScript` altında da aktif öğe işaretli.

**Hedef:** Beş sayfanın arama sonuçlarında ve paylaşımlarda birbirinden ayrılması.

### 5.1 — Sayfa bazlı metadata (R2)
**Dosyalar:** `src/app/layout.tsx:5-18` + her sayfa

Şu an tüm `src/` ağacında **tek** `metadata` export'u var; beş sayfa da `<title>egekaya.net</title>` gösteriyor.

1. Root layout'a şablon ekle:
   ```ts
   title: { default: "egekaya.net", template: "%s · egekaya.net" }
   metadataBase: new URL("https://egekaya.net")
   ```
2. Her sayfaya kendi `export const metadata` — özgün `title` ve `description`.
3. `openGraph` ve `twitter` bloklarını root'a ekle. Şu an bu siteye verilen hiçbir link (LinkedIn, WhatsApp, Slack) önizleme kartı göstermiyor.
4. Bir OG görseli ekle — `src/app/opengraph-image.tsx` ile Next'in `ImageResponse`'unu kullanabilirsin. **Bunu yapınca `metadataBase` zorunlu hale gelir**, o yüzden 1. adımda zaten ekliyoruz.
5. `alternates.canonical` ekle.

### 5.2 — `sitemap.ts` ve `robots.ts`
`src/app/sitemap.ts` ve `src/app/robots.ts` — beş rota için birkaç satır. Portfolyo sitesi için ucuz kazanç.

### 5.3 — Navigasyon iyileştirmeleri (R3, R4, R5)
- **R3:** Ana sayfadaki Contact CTA'sı `router.push()` yapan bir `<button>`. `<Link href="/contact">`'a çevir (buton gibi stille). Orta tıklama, yeni sekme, prefetch ve crawler görünürlüğü kazanırsın.
- **R4:** `usePathname()` ile aktif sayfayı işaretle — görsel vurgu + `aria-current="page"`. Hem UX hem a11y.
- **R5:** Menüye "Home" öğesi ekleyip eklemeyeceğine karar ver. Şu an eve dönüş sadece marka işaretinden.

---

## Faz 6 — Sertleştirme ✅

> **Tamamlandı, CSP hariç.** 6.2 (CSP) talimatla ayrı bir işe çıkarıldı — aşağıda tarihsel kayıt olarak duruyor, uygulanmadı. G7 bilerek ertelendi.
>
> Plana göre iki ek iş buraya çekildi: F7'nin ortak ref-toplayıcı yardımcısı (iki dosyadaki birebir aynı kod hook'a taşındı) ve Faz 5 incelemesinden kalan üç küçük madde (`sitemap` `lastModified`, `robots` `host`, menüdeki tekrar eden protokol kontrolü). K1 için `npm run verify` script'i eklendi ve README'ye işlendi.

**6.2 (CSP) sonradan ayrı iş olarak tamamlandı** — `3340710`. Kayıt için bkz. [İş 2 — CSP](#i̇ş-2--csp-tamamlandı-).

**Hedef:** Bugün sömürülemeyen ama yarın bir hatayı büyütecek şeyleri kapat. Acelesi yok; Faz 1–5 bittikten sonra rahatça yap.

### 6.1 — İstek gövdesi doğrulaması (G3)
**Dosya:** `src/app/api/contact/route.ts:127`

`request.json()` öncesinde:
- `Content-Type` `application/json` değilse 415 dön
- `content-length` tavanı koy (örn. 32 KB) — mevcut alan limitleri (`:177`) parse'tan **sonra** çalıştığı için savunma değil

### 6.2 — CSP ekle (G4)
**Dosya:** `next.config.ts:7-47`

Header bloğun zaten sağlam; eksik tek parça CSP. **`Content-Security-Policy-Report-Only` ile başla**, birkaç gün rapor topla, sonra zorunlu moda al. Bunun bugün canlı bir açığı kapatmadığını, gelecekteki bir hatayı sınırladığını unutma.

> **Düzeltme:** Bu maddenin ilk hâli `'unsafe-inline'` ihtiyacını "Tailwind inline style üretiyor" diye gerekçelendiriyordu. Yanlış — Tailwind harici bir stylesheet üretiyor. `'unsafe-inline'`'ı zorunlu kılan şey bileşenlerdeki React `style={{…}}` öznitelikleri (`/` sayfasında 27 tane) ve Next'in inline script'leri (7 tane).

### 6.3 — API küçük düzeltmeleri (G6, G7, G9)
- **G9:** `:194-199`'daki `"Mail server credentials are missing."` yerine genel 500 mesajı. Konfigürasyon durumunu kimliksiz çağırana söyleme.
- **G6:** Origin kontrolü header yokken açık düşüyor (`:75-77`). `Origin` yoksa 403 dön. Bunun yalnızca scripted abuse çıtasını yükselttiğini bilerek yap — gerçek koruma değil.
- **G7:** İstemciden gelen `startedAt` taklit edilebilir. Spam gerçek bir sorun haline gelirse sunucu tarafından imzalanmış zaman damgası (kısa TTL'li HMAC) veya Turnstile'a geç. **Şimdilik dokunma** — spam yoksa karmaşıklık eklemenin anlamı yok.

### 6.4 — GSAP context kaçışını düzelt (F5)
**Dosya:** `src/components/about/use-gsap-intersection-reveal.ts:44`

`animateIn` `IntersectionObserver` callback'inden çağrıldığı için tween'ler `gsap.context`'e kaydolmuyor ve `revert()` onları öldürmüyor. `context.add(() => animateIn(targets))` kullan. Bu, dev'deki StrictMode titremesini de bitirir.

### 6.5 — Ref temizliğini düzelt (F7)
**Dosya:** `stagger-list.tsx:51-57`, `split-reveal.tsx:78-84`

`splice(index, 1)` sonraki tüm index'leri kaydırıyor. `delete itemRefs.current[index]` yap. **Faz 7'deki ortak yardımcı çıkarmasıyla birlikte yap** — aynı kod iki dosyada, tek yerde düzelt.

### 6.6 — CI typecheck sırası (K1)
`tsconfig.typecheck.json` `.next/dev/types/**/*.ts`'i include'dan düşürüyor; o dizin yalnızca `next build` sonrası var oluyor. Temiz checkout'ta typed-route hataları sessizce atlanıyor. CI'da sırayı `build` → `typecheck` yap, ya da include'u geri ekle. Ayrıca `.tsbuildinfo`'nun gitignore'landığını doğrula.

---

## Faz 7 — Temizlik

**Hedef:** Ölü kodu sil, tekrarı azalt. Hiçbiri kullanıcıyı etkilemiyor — en son, rahat rahat.

> **2026-08-06 planı.** Aşağıdaki liste denetimden çıkan ham envanter. Uygulama sırası, risk gruplaması ve doğrulama stratejisi için [§ Faz 7 Uygulama Planı](#faz-7-uygulama-planı) bölümüne bakın. Madde 6'nın ilk şıkkı (ortak ref-toplayıcı) **Faz 6'da yapıldı** (`467348f`).

> ### ⚠️ 2026-08-07 — bu envanterin büyük kısmı geçersiz
>
> Repo sahibi React Bits'in **StaggeredMenu** upstream kaynağını sağladı ve karşılaştırma yapıldı. Sonuç: aşağıda "ölü kod" diye işaretlenen maddelerin çoğu **upstream API'sinin sadık taşınması** — port'un bıraktığı çöp değil.
>
> Denetim bu ayrımı yapmamıştı: "bu proje kullanıyor mu" diye sordu, "bu bileşenin kendi API'sinin parçası mı" diye sormadı. Silmek temizlik değil, **React Bits'ten forklama kararı** olurdu.
>
> Geçerli kapsam için [§ Faz 7 Uygulama Planı](#faz-7-uygulama-planı)'ndaki daraltılmış listeye bakın. Aşağısı tarihsel kayıt.

**Envanter (ham, filtrelenmemiş):**
1. **`favicon_io/` sil** — 634 KB, `public/`'takilerle bayt bayt aynı, hiçbir yerden referanslanmıyor.
2. **Ölü dalları kaldır:**
   - `profile-card.tsx` — `"active"` class'ı (Faz 2.2'de zaten değişecek), `className="group"` (`:572`, sıfır `group-*` varyantı var), `cardRadius`'un `useMemo` deps'inde durması
   - `staggered-menu.tsx` — `layerColors` IIFE'si (`:480-489`, `colors.slice(0,4)`'e indirgeniyor), `changeMenuColorOnOpen` dalları (`:358-364`, `:377-381`), `position === "left"` dalları (`:112`, `:296`), `<li>No items</li>` fallback'i (`:586-592`), `setMenuSurfaceVisibility` dolaylılığı (`:89-91`)
   - `glare-hover.tsx` — 3 haneli hex / `rgba()` parse dalları (`:40-52`), `playOnce` erken dönüşü (`:94-98`)
   - `letter-glitch.tsx` — `smooth` false dalları (`:226-227`), `outerVignette`/`centerVignette` ternary'leri (`:388-389`)
3. **Ölü CSS:** `globals.css:238-241` ve `:268-273`'teki `[data-position="left"]` kuralları erişilemez. `sm-icon-line-v` ve `sm-socials-item` class'ları JSX'te var ama karşılık gelen kural yok — ya kuralı yaz ya class'ı sil.
4. **`StaggeredMenuProps`'un `export`'unu kaldır** (`:27`) — sadece kendi dosyasında kullanılıyor.
5. **Hiç geçirilmeyen prop'ları buda.** `ProfileCard` 11, `StaggeredMenu` 12, `GlareHover` 9 prop'u hiç almıyor. **Dikkat:** Bunlar upstream API'sinin parçası (bkz. Ek A). Silmek "React Bits ile senkron kalma" seçeneğini kapatır. *Karar senin:* bileşenleri artık kendi kodun sayıyorsan sil; upstream güncellemelerini takip etmeyi düşünüyorsan bırak ve bir yorumla işaretle.
6. **Tekrarı azalt** (öncelik sırasıyla):
   - Ortak ref-toplayıcı → `useGsapIntersectionReveal` içine `registerTarget(index)` (F7'yi de kapatır)
   - `staggered-menu.tsx`'te menü element sorgusu + reset bloğu, iki yerde birebir aynı ~25 satır → `queryPanelElements` + `resetPanelElements`
   - `FactCard` bileşeni — üç sayfada tekrarlanan ~60 satır
   - `contact-form.tsx`'te üç kez geçen hata mesajı → modül sabiti
   - İki hex parser (`letter-glitch.tsx`, `glare-hover.tsx`) → `src/lib/`'de tek uygulama
7. **`glare-panel.tsx:1`'deki gereksiz `"use client"`** — bileşende hook, handler, browser API'si yok; `GlareHover` zaten kendi direktifini taşıyor.
8. **`mobile-effects-policy.ts:52-60`'taki legacy `addListener` fallback'i** — Safari ≤13 hedeflemiyorsan sil.

---

## Ek A — ProfileCard: Upstream mi, Port Hatası mı?

Paylaştığın React Bits kaynağı iki soruyu kesin olarak cevaplıyor: hangi kusurlar upstream'den miras, hangileri porta özgü. Bu ayrım önemli çünkü **upstream kusurlarını düzeltirken kaynaktan bilinçli olarak sapıyorsun** — bunu kod içinde bir yorumla işaretle, yoksa bir sonraki güncellemede geri gelir.

### Port'un yaptığı temel dönüşüm
`ProfileCard.css`'in **tamamı** inline style ve Tailwind class'larına çevrilmiş. `globals.css`'te tek bir `.pc-*` kuralı yok — doğrulandı. Bileşen ayrıca JS'ten TS'e çevrilmiş, `useRouter` entegrasyonu ve `mobile-effects-policy` desteği eklenmiş.

### Port sırasında kaybedilen: `--card-opacity` (F2)

Upstream CSS'te ışımayı açan tek satır:
```css
.pc-card-wrapper:hover, .pc-card-wrapper.active { --card-opacity: 1; }
```
Bu kural porta hiç taşınmadı. `:root`'taki `--card-opacity: 0` başlangıç değeri ise porta **inline style olarak** taşındı (`:457`).

**Sonuç ve kritik incelik:** Inline style, stylesheet kurallarını özgüllük olarak yener. Yani kaybolan `:hover` kuralını `globals.css`'e geri eklesen bile **çalışmaz** — inline `--card-opacity: 0` onu ezer. Bu yüzden Faz 2.2'deki çözüm JS tabanlı: değişkeni `wrap.style.setProperty` ile yaz, ki bu zaten diğer tüm pointer değişkenlerinin (`:155-165`) çalışma şekli.

### Upstream'de de bozuk olan: `"active"` class'ı

Upstream'de `handlePointerEnter` şunu yapıyor:
```js
shell.classList.add('active');   // shellRef = .pc-card-shell
```
Ama CSS kuralları `.pc-card-wrapper.active` ve `.pc-card.active`. **`.pc-card-shell.active` hiçbirine uymuyor.** Yani `active` class'ı React Bits'in kendisinde de hiçbir zaman iş yapmıyor — tüm görsel etkiyi `:hover` varyantları üretiyor.

Port bunu sadakatle kopyalamış. `active` gerçekten ölü; ama Faz 2.2 onu silmek yerine anlamlı bir işe (glow'u açmak) koşuyor.

> `entering` class'ı bundan farklı — port'ta `:318`'de JS tarafından **okunuyor** (`shell.classList.contains("entering")`). Ona dokunma.

### Upstream'den miras alınan diğer kusurlar

| Kusur | Upstream konumu | Bulgu | Not |
|---|---|---|---|
| `stillFar \|\| document.hasFocus()` | `step()` içinde, aynen | **F4** | Sekme odaktayken rAF hiç durmuyor. Upstream'in kusuru; düzeltirken saptığını yaz. |
| Motion izni shell click'inde | `shell.addEventListener('click', handleClick)` | **F6** | Contact butonu shell'in torunu; iOS'ta ikisi birden tetikleniyor. |
| `title` prop'u erişilemez | — | Ölü kod | Port `titleLines` eklemiş; çağıran hep onu geçirdiği için upstream'in `title` dalı hiç render edilmiyor. |
| Kullanılmayan 11 prop | Upstream API yüzeyi | Ölü kod | Silmek upstream ile senkronu bitirir. Faz 7.5'teki karar. |

### Port'un upstream'den **iyileştirdiği** yerler

Bunları geri alma — bilinçli ve doğru sapmalar:
- **`touch-action: pan-y`** (upstream: `none`) — mobilde kartın üstünden sayfa kaydırılabiliyor. Upstream'de kaydırma kilitleniyordu.
- **`mobile-effects-policy` entegrasyonu** — upstream'de `prefers-reduced-motion` desteği hiç yok; port `:490`'da holo animasyonunu kapatıyor.
- **`mask-repeat: space` + `mask-size: 15%`** (upstream: `repeat` / `150%`) — ikon desen ölçeği bilinçli değiştirilmiş.
- **`grainUrl` kaldırılmış** — kullanılmayan bir upstream prop'u zaten temizlenmiş.

### Yaklaşım önerisi

`ProfileCard` artık upstream'in bir kopyası değil — TypeScript'e çevrilmiş, Next router'a bağlanmış, mobil politikası eklenmiş, CSS'i tamamen yeniden yazılmış bir türev. **Kendi kodun gibi davran.** Bu şu demek:
- Upstream kusurlarını (F4, F6) çekinmeden düzelt
- Kullanılmayan prop'ları silmek meşru (Faz 7.5)
- Ama sapmaları dosyanın başında kısa bir yorumla belgele: nereden geldi, neyi bilerek değiştirdin

---

## Karar Bekleyen Konular

Faz 2 ve 3'ün kararları verildi (yukarıdaki karar tablosuna bakın). Kalan üçü Faz 7'de toplanacak:

1. **Kaynak fotoğraflar** — `public/images/portfolio` hâlâ 119 MB. Ziyaretçiler artık indirmiyor ama her `git clone` ve her Vercel build'i bu yükü taşıyor. Küçültüp orijinalleri repo dışına almak ister misin?
2. **Docker dosyaları** — `Dockerfile`, `compose.yaml` ve `.dockerignore` Faz 1'den beri çalışmıyor. Sil, README'ye "devre dışı" notu düş, ya da olduğu gibi bırak.
3. **Fotoğraf `alt` metinleri** — şu an `"Portfolio Photo 1"`…`"Portfolio Photo 13"`. Teknik olarak geçerli, bilgi olarak boş. Dosya adına göre bir başlık haritası yazmak senin içerik kararın.
4. **R5 — Menüye "Home" öğesi** — Faz 5'te bilinçli olarak açık bırakıldı. Eve dönüş marka linkinden veriliyor; eklemek istenirse küçük bir layout değişikliği yeterli.

---

## Kalan İş Planı

**İş 1 (davranış doğrulaması), İş 2 (CSP), İş 2b (Y4), İş 2c (galeri → DepthCarousel) ve İş 3 (Faz 7) tamamlandı.**

**Kod tarafında planlanmış iş kalmadı.** Kalan sıra tamamen operasyonel: **push → `vercel --prod` → F6 doğrulaması → CSP'yi zorunlu moda al.**

---

### İş 1 — Davranış doğrulaması ✅ TAMAMLANDI

Yedi maddeden **altısı geçti, biri yapılamadı.** Sonuçlar ve yöntem yukarıdaki [Davranış doğrulaması](#davranış-doğrulaması--2026-08-06-) bölümünde.

Planda "elle doğrulama" olarak yazılmıştı; kurulu Brave headless + CDP ile otomatikleştirildi, böylece sonuçlar tekrarlanabilir ve ölçülmüş oldu.

**Kalan tek madde — F6 (iOS hareket izni): 📋 yapılacak.** Gerçek bir iPhone gerektiriyor, simüle edilemez. Repo sahibi `vercel --prod` ile yayına aldıktan sonra canlı site üzerinden görsel olarak teyit edecek: HTTPS üzerinden Contact'a dokun, hareket izni penceresi **çıkmamalı**.

---

### İş 2 — CSP ✅ TAMAMLANDI {#i̇ş-2--csp-tamamlandı-}

**Seçenek A uygulandı, `3340710`, report-only modda.**

#### Ölçülen envanter

Politika şablondan değil, sayfaların gerçekten ne yüklediği ölçülerek yazıldı:

| Ne | Bulgu |
|---|---|
| Harici `<script src>` | 0 |
| Inline `<script>` | 7 (Next hydration + RSC payload) |
| `<style>` elemanı | 0 |
| `style=""` özniteliği | 27 |
| Görsel / CSS kaynağı | Tamamı same-origin (`/_next/image`, `/_next/static`) |
| `data:` / `blob:` | 0 |
| Font | `@font-face` yok, sistem font yığını |

#### Uygulanan politika

`img-src`'ye `blob:` konmadı (hiç kullanılmıyor), `data:` ise ileride blur placeholder eklenirse sessizce kırılmasın diye bırakıldı.

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none';
base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
```

#### Doğrulama

| Kontrol | Sonuç |
|---|---|
| Beş sayfa + galeri + menü açık + kart hover | **0 ihlal** |
| **Politika canlı mı** | ✅ Kasten ihlal: harici script `script-src-elem`'e, harici fetch `connect-src`'ye takıldı (`disposition: report`) |
| İletişim formu POST'u | ✅ Geçti — `400`, sunucu geçersiz e-postayı reddetti, mail gönderilmedi |
| Build render modu | ✅ Beş sayfa hâlâ `○ (Static)` |
| Engellenen kaynak | 0 |

"Politika canlı mı" testi olmasa "0 ihlal", header'ın hiç uygulanmadığı durumda da çıkardı — bu yüzden ayrıca yapıldı.

#### Zorunlu moda geçiş

`next.config.ts:10` → `CSP_REPORT_ONLY = false`. Canlıda birkaç gün izledikten sonra.

---

<details>
<summary>Karar gerekçesi — A neden B'ye tercih edildi (tarihsel kayıt)</summary>

**Doküman araştırması seçenekleri belirgin şekilde değiştirdi** — aşağıdaki tablo eski A/B tarifinin yerine geçmişti.

| | **A — statik korunur** | **B — nonce'lu** |
|---|---|---|
| Süre | ~45 dk | ~3 sa |
| Yeni dosya | Yok | `proxy.ts` (Next 16'da `middleware` bu ada geçti) |
| **Render modu** | **Statik kalır** | **Beş sayfa da dinamiğe döner** — nonce çıkarımı `connection()` ile dinamik render gerektiriyor |
| Script koruması | `'unsafe-inline'` — zayıf | `'nonce-…' 'strict-dynamic'` — güçlü |
| Stil koruması | `'unsafe-inline'` | **Yine `'unsafe-inline'` gerekiyor** |

**B'nin beklenmedik iki maliyeti:**

1. **Statik render kaybı.** Next dokümanı nonce için `connection()` ile dinamik render'ı zorunlu tutuyor. Şu an beş sayfa da `○ (Static)`; B'den sonra hepsi `ƒ (Dynamic)` olur. HTML'in CDN'de önbelleklenmesi biter, TTFB artar, Vercel'de fonksiyon çağrısı sayısı artar. Bir portfolyo sitesi için bu ağır bir takas.
2. **Nonce inline stilleri kurtarmıyor.** Nonce yalnızca `<style>` elemanlarına uygulanır, `style=""` özniteliklerine değil. Bu proje her yerde React `style={{…}}` kullanıyor (`profile-card.tsx` neredeyse tamamen), yani `style-src-attr 'unsafe-inline'` yine gerekli. B'nin A'ya karşı kazancı **sadece script tarafında**.

**Önerim: A.** Bugün sömürülebilir bir açık yok — sitede yansıtılan kullanıcı girdisi yok, üçüncü parti script yok, `dangerouslySetInnerHTML` yok. CSP'nin buradaki değeri gelecekteki bir hatayı sınırlamak; bunun için statik render'ı feda etmek orantısız.

Bu gerekçe aynen korundu ve A uygulandı; nihai politika yukarıda.

</details>

---

### İş 2b — Y4: Ana sayfa varlıkları ✅ TAMAMLANDI

`144ef39` (maske rasterize) ve `ad11cf6` (fotoğraf `next/image`'a). **`/` soğuk transferi 2528.2 → 239.1 KB.** Ayrıntı, kararlar ve doğrulama: [DENETIM-RAPORU.md §8.5](DENETIM-RAPORU.md).

Aşağıdaki ölçümler işin başlangıç durumudur, tarihsel kayıt olarak duruyor.

| Sayfa | Soğuk transfer |
|---|---|
| **`/`** | **2528.2 KB** |
| `/about` | 190.7 KB |
| `/cyber-security` | 190.7 KB |
| `/photography` | 494.5 KB |
| `/contact` | 191.1 KB |

`/` sayfasının %92'si iki dosya: `pp.png` **2028.9 KB** (2048×2048, ham `<img>`, ~384 CSS px'te render) ve `spyware.svg` **304.8 KB** (CSS `mask-image`). Bu ikisi olmasa `/` da ~194 KB olurdu.

**Plan:** `pp.png` → `next/image` (P1'le aynı kalıp, tahmini ~60 KB). `spyware.svg` → `next/image` uygulanamaz, SVG'nin kendisi sadeleştirilmeli.

**Doğrulama:** `/` soğuk transferi 2528 KB'dan belirgin şekilde düşmeli; profil kartı görsel olarak değişmemeli (önce/sonra ekran görüntüsü); `npm run verify` temiz.

---

### İş 2c — Galeri → DepthCarousel ✅ TAMAMLANDI

React Bits'in **DepthCarousel**'i masonry ızgaranın yerini aldı. `caae6ae` (bileşen + CSS), `212d53a` (entegrasyon).

**Onaylanan dört karar:** kare-ye yakın kart · karusel ızgaranın yerini alsın · ön karta tıklayınca orijinal açılsın · autoplay açık.

| Ölçüm | Masonry | Karusel |
|---|---|---|
| `/photography` soğuk toplam | 499.5 KB | **431.3 KB** |
| Görseller | 292 KB | **220.8 KB** |
| İstenen genişlik | 33vw kolonlar | **384px** (`1x`), 750px (`2x`) |
| CLS | 0 | **0** |

**Kart oranı neden 340×380:** Fotoğraflar 0.64–1.28 arasında; `object-fit: cover` taşan ekseni kırpıyor. Upstream'in 300×380 varsayılanı her yatay kareden **%62** genişlik alırdı; kare-ye yakın kart kaybı %40 / %43 olarak dengeliyor.

**Yol boyunca çıkan iki şey:**

1. **`fill` tuzağı.** İlk hâlinde görseller 514 KB'a çıktı. `fill` kullanınca next/image srcset'i yalnızca `deviceSizes`'tan üretiyor ve en küçüğü 640px — yani 340px'lik karta 640px'lik dosya iniyordu. Açık `width`/`height` ile `imageSizes` devreye girdi, 384px'e düştü.
2. **React 19 uyumsuzlukları.** Upstream iki yerde React 19'un reddettiği kalıbı kullanıyor: ref callback'inin değer döndürmesi (React bunu cleanup fonksiyonu sanıyor) ve render gövdesinde ref'e yazma. İkisi de düzeltildi ve dosyada yorumla işaretlendi.

**Y5 dersine uyuldu:** upstream prop yüzeyi olduğu gibi taşındı, budanmadı; üç bilinçli sapma (TS, `next/image`, `href`) dosyada belgelendi.

**Doğrulama:** 13 kart / 13 nokta / 2 ok render ediliyor · hepsi `/_next/image` üzerinden · CLS 0 · sıfır CSP ihlali · sağ ok tuşu ve geri butonu odağı değiştiriyor · autoplay normalde 8 saniyede 3 fotoğraf ilerletiyor, `prefers-reduced-motion`'da **hiç ilerletmiyor**.

**Yan etki:** `read-image-size.ts` silindi (masonry'ye özgüydü), `portfolio-card-view.tsx` silindi.

> **E5 artık daha görünür.** `alt` metinleri hâlâ `"Portfolio Photo 1"`…`"13"`. Izgarada bunlar sessiz bir eksiklikti; karusel her kartı `aria-roledescription="slide"` ile duyurduğu ve ekran okuyucu odağı takip ettiği için artık doğrudan okunuyorlar.

---

### İş 3 — Faz 7 ✅ TAMAMLANDI {#faz-7-uygulama-planı}

`99e9fb3` (ölü kod), `3ce97bb` (tekrar + yükseklik çakışması).

**Yapılanlar:**

| Grup | Madde |
|---|---|
| 7.1 | `StaggeredMenuProps` export'u · `className="group"` (projede 0 `group-*` varyantı) · `glare-panel` `"use client"` · legacy `addListener` fallback'i → `Object.values(queries)` döngüsü · `favicon_io/` (gitignore'lu olduğu için git'te iz yok) |
| 7.2 | `setMenuSurfaceVisibility` dolaylılığı (üç deps dizisinden düştü) · `cardRadius`'un `useMemo` deps'inde durması |
| 7.4 | `contact-form`'da üç kez geçen hata mesajı → modül sabiti · `.home-main` yükseklik çakışması |

**Bilerek yapılmayanlar ve gerekçeleri:**

| Madde | Neden |
|---|---|
| İki hex parser'ın birleştirilmesi | `LetterGlitch` ve `GlareHover` içindeler; upstream kaynakları yok, zaten kapsam dışıydılar |
| Menü sorgu + reset bloğu | **Upstream'de de birebir aynı şekilde tekrarlanıyor** — doğrulandı |
| Ortak `FactCard` | Üç blok yedi ayrı değerde farklı (`min-h`, glare rengi/opaklık/boyut, etiket opaklığı, değer font boyutu, detay opaklığı). Görünümü korumak yedi prop'luk bir bileşen gerektirirdi; farkları eşitlemek ise **görünümü değiştirirdi** — bu fazın sözleşmesi tam tersi. Eşitleme istenirse ayrı bir tasarım kararı olarak ele alınmalı. |

**Ölçüm — hiçbir sayfada büyüme yok:**

| Sayfa | Önce | Sonra |
|---|---|---|
| `/` | 249.3 KB | **240.6** |
| `/about`, `/cyber-security` | 196.2 | **195.9** |
| `/photography` | 431.3 | **430.9** |
| `/contact` | 196.5 | **196.4** |

**Piksel diff'i yapılmadı, gerekçesi kayda değer:** `LetterGlitch` her karede rastgele karakter üretiyor ve paneller yarı saydam, yani iki ekran görüntüsü hiçbir zaman aynı olmuyor. Onun yerine dokunulan her şey davranışsal olarak doğrulandı: `.home-main` yüksekliği artık utility'den geliyor (hesaplanan `min-height` = viewport yüksekliği), kart tilt'i değişkenleri sürüyor, menü `visibility`/`inert` geçişlerini doğru yapıyor ve `scrollLeft` 0 kalıyor, karusel 13 kart/13 nokta ile sağlam.

**Uygulama sırasında çıkan bir hata:** `mobile-effects-policy`'de yerel değişkene fonksiyon parametresiyle aynı ad verilip build kırıldı; `Object.values(queries)` ile çözüldü — ki bu zaten denetimin önerdiği hâliydi.

---

<details>
<summary>Faz 7 uygulama planı (tarihsel kayıt)</summary>

Envanter yukarıdaki Faz 7 bölümünde. Riske göre dört gruba ayırıp **her grubu ayrı commit** yapmak mantıklı; hepsi "hiçbir şey değişmemeli" işi olduğu için doğrulama da buna göre.

**Doğrulama stratejisi — tüm gruplar için ortak:**
- **Route boyutu tablosu kullanılamaz** — Next 16'nın build çıktısında boyut sütunu yok, doğrulandı. Yerine soğuk önbellekli transfer ölçümü: `/` 239.1 KB (JS 182.5) · `/about` ve `/cyber-security` 195.7 · **`/photography` 431.3** · `/contact` 196.1.
- Beş sayfa için önce/sonra piksel diff'i. Bu fazda görsel değişiklik yok, yani fark **0'a yakın** olmalı.
- Her gruptan sonra `npm run verify` + menü aç/kapa, focus trap, tilt, glow testleri.

### Kapsam nasıl daraldı — 2026-08-07

Repo sahibi React Bits **StaggeredMenu** upstream kaynağını sağladı. Her madde upstream'le karşılaştırıldı; ölçüt şu oldu: **"bu proje kullanmıyor" ile "bu, bileşenin kendi API'si değil" aynı şey değil.**

Denetim yalnızca birinciyi sormuştu. Sonuç: 7.1'in sekiz maddesinden **beşi** kaldı (üçü upstream olduğu için tutuluyor), 7.2 dokuz maddeden **ikiye** indi, 7.3 tamamen iptal.

**Grup 7.1 — Sıfır riskli silmeler** (~15 dk)

| Madde | Upstream'de | Karar |
|---|---|---|
| `favicon_io/` | Alakasız | **Sil** |
| `StaggeredMenuProps` `export`'u | Upstream JS, tip yok | **Kaldır** |
| `glare-panel.tsx` `"use client"` | Port kodu | **Kaldır** |
| `mobile-effects-policy` legacy `addListener` | Port kodu | **Kaldır** |
| `profile-card` `className="group"` | ❌ Upstream'de yok, 0 `group-*` varyantı | **Kaldır** |
| ~~`[data-position="left"]` CSS~~ | ✅ Upstream CSS'inde var | **TUT** |
| ~~`sm-icon-line-v`~~ | ✅ Upstream JSX'inde var (CSS kuralı upstream'de de yok — GSAP `plusVRef` ile hedefliyor) | **TUT** |
| ~~`sm-socials-item`~~ | ✅ Upstream JSX'inde var, CSS kuralı orada da yok | **TUT** |

**Grup 7.2 — Ölü dallar** (~15 dk)

| Madde | Upstream'de | Karar |
|---|---|---|
| `setMenuSurfaceVisibility` dolaylılığı | Port'a özgü (upstream'de `panelVisible` yok) | **Sadeleştir** |
| `profile-card` `cardRadius`'un deps'te durması | Port'a özgü | **Kaldır** |
| ~~`layerColors` IIFE'si~~ | ✅ Upstream'de birebir aynı | **TUT** |
| ~~`changeMenuColorOnOpen` dalları~~ | ✅ Upstream prop'u | **TUT** |
| ~~`position === "left"` dalları~~ | ✅ Upstream prop'u | **TUT** |
| ~~"No items" fallback'i~~ | ✅ Upstream'de aynen var | **TUT** |

**Kapsam dışı — upstream kaynağı elimizde yok:** `GlareHover` (3 haneli hex / `rgba()` parse dalları, `playOnce`), `LetterGlitch` (`smooth` false dalları, vignette ternary'leri). Bunlar da React Bits bileşeni olabilir; kaynakları sağlanmadan aynı tuzağa düşme riski var. Değerlendirilmek isteniyorsa ilgili "copy prompt" içerikleri gerekiyor.

**Grup 7.3 — Prop budama — İPTAL**

| Bileşen | Toplam prop | Upstream API'sinden | Port'a özgü |
|---|---|---|---|
| `StaggeredMenu` | 17 | **15** | `brand`, `brandHref` (`logoUrl` yerine) |
| `ProfileCard` | 20 | **18** | `contactHref`, `titleLines` (`grainUrl` port'ta çıkarılmış) |

Yani "35 kullanılmayan prop" sanılan şeyin ezici çoğunluğu React Bits'in kendi API yüzeyi. Budamak fork kararı olurdu; yapılmıyor.

**Grup 7.4 — Tekrar azaltma** (~1 sa) — en yüksek refactor riski, en sona
`staggered-menu`'de iki yerde birebir aynı ~25 satırlık sorgu + reset bloğu → `queryPanelElements` + `resetPanelElements` · üç sayfada tekrarlanan fact-card markup'ı → `FactCard` · `contact-form`'daki üç kez geçen hata mesajı → modül sabiti · iki hex parser → `src/lib/`'de tek uygulama.
*Ayrıca:* `.home-main` yükseklik çakışması (layer'sız `min-height: 100vh`, Tailwind'in `min-h-[100svh]`'ini eziyor) — CSS kuralından `min-height`'ı çıkar ya da Tailwind class'ını kaldır, tek kaynak bırak.

**Faz 7'ye girmeyen, senin kararına bağlı üç madde:** kaynak fotoğraflar, Docker dosyaları, `alt` metinleri — aşağıdaki karar listesine bakın.

</details>

---

### İş 4 — Push

`main`, `origin/main`'in 28 commit önünde ve hiç push edilmedi. Git ajanına hiçbir aşamada push yetkisi verilmedi. Zamanlama ve karar repo sahibinde.

---

### Karar bekleyen iki madde

Docker (silindi) ve R5 (Home eklendi) karara bağlandı — yukarıdaki karar tablosuna bakın. Kalan ikisi Faz 7'nin kapsamını etkiliyor:

1. **119 MB kaynak fotoğraf** — ziyaretçiler indirmiyor artık (kısıtlı ağda tüm galeri 0.51 MB ölçüldü), ama her `clone` ve her Vercel build'i bu yükü taşıyor. Küçültüp orijinalleri repo dışına al?
2. **Fotoğraf `alt` metinleri** — `"Portfolio Photo 1"`…`"13"`. Dosya adına göre başlık haritası senin içerik kararın.

Ayrıca Faz 7.3'ün **prop budama** kararı da açık (bkz. Faz 7 uygulama planı).

### Açık gözlem — ana sayfada çift `aria-current`

Home menü öğesi eklenince `/` sayfasında **iki** eleman `aria-current="page"` taşıyor: header'daki marka linki (Faz 5'te eklendi) ve yeni Home öğesi. Geçersiz değil — ikisi de gerçekten geçerli sayfaya işaret ediyor — ama ekran okuyucu menü açıkken "geçerli sayfa" ifadesini iki kez duyuruyor.

Menü kapalıyken panel `inert` olduğu için yalnızca marka işaretli kalıyor; yani gereksizlik sadece panel açıkken oluşuyor. Markanınkini kaldırmak menü kapalıyken hiçbir işaret bırakmayacağı için **ikisi de korundu**. Rahatsız ederse `staggered-menu.tsx`'teki marka linkinden `aria-current`'ı kaldırmak tek satır.

---

*Bu belge hiçbir kod değiştirmiyor. Son güncelleme: 2026-08-06, Faz 6 sonrası.*
