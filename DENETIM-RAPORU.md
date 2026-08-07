# egekaya.net — Kod Tabanı Denetim Raporu

**Tarih:** 2026-08-05
**Kapsam:** Tüm proje (`src/`, `public/`, config, Docker, git geçmişi)
**Yöntem:** Salt-okunur statik analiz. Üç paralel alt ajan (güvenlik / ölü kod / routing-correctness) + doğrulama.
**Not:** Bu denetimde **hiçbir kod değişikliği yapılmadı.** Aşağıdaki her bulgu dosya + satır numarasıyla kaynak koddan doğrulanmıştır.

---

## Özet

| Kategori | Kritik | Yüksek | Orta | Düşük/Bilgi |
|---|---|---|---|---|
| Güvenlik | 0 | 1 | 5 | 6 |
| Fonksiyonel hata | 0 | 3 | 3 | — |
| Routing / SEO | 0 | 2 | 2 | 1 |
| Erişilebilirlik | 0 | 1 | 4 | 3 |
| Yapılandırma / build | 0 | 0 | 1 | 2 |
| Ölü kod | — | — | 2 | ~25 |

> **2026-08-06 güncellemesi:** Faz 0 baseline ölçümü sırasında üç ek bulgu (Y1–Y3) çıktı ve birkaç tahmin ölçülmüş sayıya dönüştü. Bkz. [§8](#8-ek-bulgular--faz-0-ölçümü-2026-08-06).

---

## Çözüm Durumu — 2026-08-07

[DUZELTME-PLANI.md](DUZELTME-PLANI.md)'nin **Faz 0–6'sı tamamlandı, davranış doğrulaması yapıldı ve CSP ayrı iş olarak eklendi** — hepsi `main`'e merge edildi. Aşağıda her bulgunun güncel durumu.

**✅ Çözüldü (34 bulgu)**

| Bulgu | Commit |
|---|---|
| G1 — Rate limiter IP sahteciliği ve sınırsız kova büyümesi | `4d141fb` |
| R1 — Hata/404 route dosyalarının yokluğu | `7368512` |
| Y1 — `npm run start` standalone ile çalışmıyor | `33b9cd1` |
| Y2 — `.env` standalone çıktısına kopyalanıyor | `33b9cd1` |
| F1 — Menü "açık ama görünmez" kilitlenmesi | `80f6d81` |
| F2 — Arka ışımanın kalıcı görünmezliği | `1ac7bbb` |
| F4 — Sonsuz rAF döngüsü | `1ac7bbb` |
| F6 — iOS hareket izni penceresi | `1ac7bbb` |
| F3 — `GlareHover` inline stil ezmesi | `c5a6d9a` |
| P1 — 119 MB optimize edilmemiş fotoğraf | `5e028ff`, sonra `212d53a` (galeri karusele geçti) |
| P2 — Galeride `width`/`height` yokluğu | `5e028ff`, sonra `212d53a` — karusel mutlak konumlandırma kullanıyor, CLS yapısal olarak 0 |
| E1 — Menüde focus trap / Escape / odak dönüşü yok | `3414ee6` |
| E2 — Ana navigasyon `<nav>` değil | `3414ee6` |
| E3 — `aria-hidden` odaklanabilir linklerde | `3414ee6` |
| E4 — Reveal animasyonları reduced motion'ı yok sayıyor | `0f81934`, `c69d49f` |
| E6 — `aria-label` rolsüz div'de, çift etiketleme, skip-link | `3414ee6`, `0f81934`, `c69d49f` |
| R2 — Beş sayfa tek başlık/açıklama paylaşıyor, OG yok | `1e60e9a`, `debd878`, `d9c10e1` (Faz 5) + `ed93b08`, `ddb95e5` (inceleme) |
| R3 — Ana sayfa CTA'sı `<button>`, `<Link>` değil | `001d324` (Faz 5) |
| R4 — Aktif sayfa göstergesi yok | `623eff6` (Faz 5) + `88a0ef2` (görsel vurgu — inceleme) |
| G2 — Global rate limit ucuz bir DoS kolu | `090f0d2` |
| G3 — `Content-Type` ve gövde boyutu doğrulaması yok | `090f0d2` |
| G6 — Origin kontrolü fail-open | `090f0d2` |
| G9 — Hata yanıtında konfigürasyon sızıntısı | `090f0d2` |
| F5 — GSAP tween'leri `gsap.context`'ten kaçıyor | `467348f` |
| F7 — Ref temizliğinde `splice` index kaydırıyor | `467348f` |
| K1 — `typecheck` kapsamı build sırasına bağlı | `deb40c0` (`npm run verify`) |
| Y3 — `next-env.d.ts` dev/build arası değişiyor | `deb40c0` (takipten çıkarıldı) |
| R5 — Menüde "Home" öğesi yok | `73a245d` |
| G5 — Docker root olarak çalışıyor | `398662e` — Docker kurulumu tamamen silindi, konu kapandı |
| G4 — CSP yok | `3340710` — report-only modda, tek boolean ile zorunlu moda geçiyor |
| Y4 — Ana sayfanın iki büyük varlığı | `144ef39` (maske), `ad11cf6` (fotoğraf) — `/` soğuk transferi 2528.2 → **239.1 KB** |
| Y5 — §6 envanterinin geçersizliği | `61f46fa` — kapsam upstream karşılaştırmasına göre daraltıldı, bkz. §8.6 |
| §6 — ölü kod, ölü dallar, `.home-main` çakışması, `favicon_io/` | `99e9fb3`, `3ce97bb` — daraltılmış kapsamda; upstream API'si olan maddeler bilerek korundu |

**⬜ Açık — bilinçli erteleme**

| Bulgu | Not |
|---|---|
| G7 — `startedAt` istemciden, taklit edilebilir | Spam gerçek bir sorun hâline gelmedikçe imzalı zaman damgası veya Turnstile orantısız karmaşıklık. |

**⬜ Açık — içerik kararı**

| Bulgu | Not |
|---|---|
| E5 — Fotoğraf `alt` metinleri betimleyici değil | Repo sahibinin yazması gereken metin. **Karusel sonrası daha görünür** — her kart `aria-roledescription="slide"` ile duyuruluyor, ekran okuyucu bu metinleri doğrudan okuyor. |

**Bilgi amaçlı, aksiyon gerekmedi:** G8 (sır hijyeni — git temiz çıktı), G10 (`/api/health` sızıntı yok), G11 (bağımlılıklar).

**Araç durumu:** `npm run typecheck` → 0 hata. `npm run lint` → 0 uyarı. `npm run build` → temiz, 12 route (5 sayfa + 4 metadata route + 2 API + `_not-found`). Yani aşağıdaki bulguların **tamamı tooling'in yakalayamadığı semantik sorunlar.**

**Faz 5 ölçülen sonuçlar:**

| Ölçüm | Öncesi | Şimdi |
|---|---|---|
| Sayfa bazlı `<title>` | 5 sayfa tek `egekaya.net` | 5 özgün (`egekaya.net`, `About — egekaya.net`, `Cyber Security — egekaya.net`, `Photography — egekaya.net`, `Contact — egekaya.net`) |
| `meta description` | 5 sayfa tek ortak | 5 özgün, sayfa içeriğine göre |
| `og:title` / `og:description` | Yok | 5 sayfada özgün |
| `og:image` / `twitter:image` | Yok | Tüm sayfalarda 1200×630 PNG, `og:image:width/height/alt` ile birlikte |
| `link rel="canonical"` | Yok | 5 sayfada özgün `https://egekaya.net/<route>` |
| `sitemap.xml` | Yok | 5 rota, monthly, önceliklikil bazlı |
| `robots.txt` | Yok | `Allow: /`, `Disallow: /api/`, sitemap + host |
| Home CTA'Element türü | `<button onClick={router.push}>` | `<a href="/contact" aria-label="Contact Ege Kaya">` |
| Aktif sayfa işareti | Yok | SSR sırasında doğru öğede `aria-current="page"` (Next 16 `usePathname` SSR okumasıyla) |

**Genel değerlendirme:** Saldırı yüzeyi gerçekten küçük — auth yok, veritabanı yok, kullanıcı içeriği render edilmiyor. İnsanların genelde batırdığı şeyler (e-posta header injection, mail gövdesinde HTML injection, git'e sızmış sır) burada **doğru yapılmış.** Gerçek zayıflıklar `POST /api/contact`'ın kötüye kullanıma direncinde ve deployment sertleştirmesinde toplanıyor. Fonksiyonel tarafta ise iki adet "sessizce çalışmayan özellik" ve bir adet menü kilitlenme hatası var.

---

## 1. Güvenlik Bulguları

### 🔴 G1 — Rate limiter sahte IP header'ı ile atlatılabiliyor + sınırsız bellek büyümesi
**Önem:** Yüksek (self-hosted Docker) / Orta (Vercel)
**Dosya:** `src/app/api/contact/route.ts:44-70`, kapı: `:107-115`

İki kusur birbirini besliyor:

`getClientIp` sırasıyla `cf-connecting-ip` → `x-real-ip` → `x-forwarded-for` okuyor. **Üçü de saldırgan kontrolünde** — `compose.yaml` uygulamayı `3000:3000` ile doğrudan yayınlıyor, önünde bu header'ları temizleyecek bir reverse proxy yok. Vercel'de bile `cf-connecting-ip` platform tarafından set edilmiyor, yani saldırgandan geliyor ve platformun `x-forwarded-for`'una tercih ediliyor.

```
POST /api/contact
CF-Connecting-IP: <her istekte rastgele>
```

Her istek yepyeni bir kovaya düşüyor, `MAX_REQUESTS_PER_WINDOW = 5` hiç tetiklenmiyor.

Daha kötüsü: `checkRateLimit` içinde per-IP kova, global limit kontrol edilmeden **önce** yaratılıyor (`||` soldan sağa kısa devre yapıyor, `:107-110`). Yani **reddedilen** istekler bile Map'e kalıcı kayıt ekliyor. Map sadece her istekte O(n) tam tarama ile temizleniyor (`:55-59`) → istek başına bir kalıcı kayıt + tam tarama = bellek büyümesi ve karesel CPU. Saniyede birkaç yüz istekte Node süreci bozulup OOM'a gidiyor.

**Saldırı:** Dönen `CF-Connecting-IP` ile POST döngüsü → sahibin Gmail kutusuna sınırsız mail (kutu taşması, `GMAIL_USER` hesabının Gmail gönderim limitine takılıp kilitlenmesi) + kademeli kaynak tüketimi.

**Açık relay DEĞİL:** `to` sabit olarak `gmailUser` (`:214`), `from` sunucu kontrolünde (`:213`). Sadece `replyTo` ve gövde saldırgan kontrolünde — yani hasar alanı sahibin kendi kutusu.

**Ek not:** Vercel'de modül seviyesindeki `Map` (`:18`) lambda örneği başına ve örnekler geçici/paralel, dolayısıyla orada limiter zaten büyük ölçüde dekoratif.

**Çözüm:** IP'yi yalnızca güvenilen proxy'den doğrulanmış kaynaktan türet (veya Upstash/Vercel KV gibi paylaşımlı store kullan); global limiti per-IP kova yaratılmadan önce kontrol et; `rateLimitBuckets.size`'a tavan koy.

---

### 🟠 G2 — Global rate limit ucuz bir DoS kolu
**Önem:** Orta
**Dosya:** `src/app/api/contact/route.ts:9,109`

`MAX_GLOBAL_REQUESTS_PER_WINDOW = 120` tüm kullanıcılar arasında paylaşılıyor. Tek bir hosttan 10 dakikada 121 istek — header sahteciliği gerekmiyor, geçerli payload bile gerekmiyor (limit gövde parse edilmeden kontrol ediliyor) — iletişim formunu pencerenin geri kalanında **tüm gerçek ziyaretçiler için 429'a düşürüyor.** 5 saniyede bir istekle süresiz sürdürülebilir.

**Çözüm:** Global sınırı emniyet supabı olarak tut ama atlatılamayan per-IP throttle ile eşle; ya da global sayacı yalnızca doğrulamayı geçen isteklere uygula.

---

### 🟠 G3 — `Content-Type` kontrolü ve gövde boyut sınırı yok
**Önem:** Orta
**Dosya:** `src/app/api/contact/route.ts:127`

`await request.json()` hiçbir `Content-Type` doğrulaması ve boyut tavanı olmadan çalışıyor. App Router route handler'larında yerleşik gövde limiti **yok** (eski 4 MB `bodyParser` limiti sadece Pages API route'ları için). Self-hosted Docker'da saldırgan yüzlerce MB'lık JSON gövdesi POST edebilir; bu gövde herhangi bir uzunluk doğrulamasından (`:177`) **önce** tamamen belleğe alınıp parse edilir. Alan uzunluk kontrolleri savunma olarak işe yaramıyor çünkü parse'tan sonra çalışıyorlar.

Eksik `Content-Type` kontrolü ayrıca `text/plain` "simple request"lerin (CORS preflight'sız) kabul edilmesi anlamına geliyor.

**Çözüm:** `application/json` olmayan istekleri reddet; parse etmeden önce `content-length` kontrolü veya limitli stream ile açık bir bayt tavanı uygula.

---

### 🟠 G4 — Content-Security-Policy header'ı yok
**Önem:** Orta (defense-in-depth; bugün sömürülebilir değil)
**Dosya:** `next.config.ts:7-47`

Header bloğu bunun dışında sağlam: HSTS + preload, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `COOP: same-origin`, `X-Permitted-Cross-Domain-Policies: none`, `poweredByHeader: false`. Eksik olan tek parça CSP (ve daha az önemli olarak CORP/COEP).

**Dürüst çerçeve:** Bu teorik, şu an sömürülebilir değil. Sitede hiçbir yerde yansıtılan veya depolanan kullanıcı girdisi render edilmiyor ve üçüncü parti script yok. CSP'nin buradaki değeri **gelecekteki bir hatayı veya ele geçirilmiş bir bağımlılığı sınırlamak**, canlı bir açığı kapatmak değil.

> **Düzeltme (2026-08-07):** Bu paragrafın ilk hâli "inline `<script>` yok" diyordu. Yanlış — CSP uygulanırken ölçüldü: `/` sayfasında **7 inline `<script>`** var (Next'in hydration ve RSC payload script'leri). Sonuç değişmiyor, çünkü bunlar Next'in kendi çıktısı, saldırgan girdisi değil; ama `script-src`'de `'unsafe-inline'`'ı zorunlu kılan şey tam olarak bunlar.

**Çözüm:** CSP ekle (Next 16 + Tailwind için `style-src 'self' 'unsafe-inline'` gerekecek; script'ler middleware üzerinden nonce alabilir). `Content-Security-Policy-Report-Only` ile başlamak güvenli.

---

### 🟠 G5 — Docker imajı root olarak çalışıyor, container sertleştirilmemiş
**Önem:** Orta
**Dosya:** `Dockerfile:17-29`, `compose.yaml:1-12`

`runner` stage'inde hiç `USER` satırı yok (doğrulandı: `FROM`/`CMD` var, `USER` yok) → `node server.js` **root (uid 0)** olarak çalışıyor. Next.js'te veya bir bağımlılıkta RCE sınıfı bir hata, container içinde root'a dönüşür. `compose.yaml` `"3000:3000"` yayınlıyor (`0.0.0.0`'a bağlanıyor, LAN'dan erişilebilir), `read_only` yok, `cap_drop` yok, `security_opt: no-new-privileges` yok, bellek limiti yok, healthcheck yok, reverse proxy yok — ki bu sonuncusu G1'i sömürülebilir kılan şey.

**İyi haber — sırlar temiz:** Multi-stage build doğru kurulmuş; `.dockerignore` `.env`, `.env.local`, `.env*.local`, `.git`, `.next` hariç tutuyor, dolayısıyla `Dockerfile:14`'teki `COPY . .` **hiçbir katmana kimlik bilgisi gömmüyor.** `compose.yaml` sırları `env_file: .env` ile runtime'da enjekte ediyor — doğru desen. İmaja sadece `.env.example` (placeholder) ulaşıyor.

**Çözüm:** Runner stage'inde `CMD`'den önce `USER node`; compose'a `read_only: true`, `cap_drop: [ALL]`, `security_opt: ["no-new-privileges:true"]`, bellek limiti; portu `127.0.0.1:3000:3000` olarak TLS sonlandıran proxy arkasına al.

---

### 🟡 G6 — Origin/Referer kontrolü header yokken açık düşüyor (fail-open)
**Önem:** Düşük
**Dosya:** `src/app/api/contact/route.ts:72-93` (özellikle `:75-77`)

```ts
const source = request.headers.get("origin") ?? request.headers.get("referer");
if (!source) { return true; }
```

Tarayıcı olmayan her istemci (curl, script, bot) iki header'ı da atlayarak geçiyor. Kontrol sadece tarayıcı kaynaklı cross-origin gönderimleri durduruyor.

**Etki gerçekten düşük:** Oturum yok, çerez yok, kullanıcıya bağlı state değiştiren eylem yok — bu endpoint'e "CSRF" sadece sahibe e-posta göndermek demek, ki bunu zaten herkes iletişim sayfasından yapabiliyor. Kontrolün asıl amacı anti-spam ve o rolde gerçek spam'cilerin hepsi tarafından atlatılıp kimseyi engellemiyor. Kısa bir kasis, kontrol değil.

**Çözüm:** `Origin` header'ını zorunlu kıl ve allowlist ile eşleştir (yokken 403 dön) — bunun sadece scripted abuse çıtasını yükselttiğini kabul ederek.

---

### 🟡 G7 — Anti-bot zamanlama kapısı istemciden geliyor, taklit edilmesi önemsiz
**Önem:** Düşük
**Dosya:** `src/app/api/contact/route.ts:95-101,139,145-154` · `contact-form.tsx:55`

`startedAt` doğrudan istemciden geliyor, yani `MIN_SUBMISSION_AGE_MS = 1200` "insan hızı" kontrolü `startedAt: Date.now() - 5000` göndererek sağlanıyor. Tip yönetimi doğru (`typeof … !== "number"` guard'ı var), yani type-confusion hatası yok — değer sadece yapısı gereği güvenilmez.

`company` honeypot'u (`:141-143`, gizli alan `contact-form.tsx:93-105`) aynı sınıfta zayıf-ama-bedava bir kontrol ve sessizce `200 {ok:true}` dönüyor, ki bu **doğru davranış.**

**Çözüm:** Spam gerçek bir sorun olursa sunucu tarafından imzalanmış zaman damgası (kısa TTL'li HMAC) veya Turnstile/hCaptcha.

---

### 🔵 G8 — Sır hijyeni: git temiz, diskte plaintext var
**Önem:** Bilgi
**Dosya:** `.env`, `.env.local`, `.gitignore`

`git ls-files` ve `git log --all --name-only` ile doğrulandı:

- **Git'te takipli:** yalnızca `.env.example` — ve içindeki `GMAIL_USER` / `GMAIL_APP_PASSWORD` gerçek değil, placeholder.
- **Hiçbir commit'te, hiçbir branch'te:** `.env`, `.env.local`, `.vercel/` yok. **Hiçbir sır hiç commitlenmemiş.**
- `.env` gerçek görünümlü bir `GMAIL_APP_PASSWORD` (16 karakterlik Gmail app-password formatı) içeriyor. Doğru şekilde ignore edilmiş.
- `.env.local` gerçek bir `VERCEL_OIDC_TOKEN` (~1.2 KB JWT) içeriyor. Doğru şekilde ignore edilmiş. Bu token'lar kısa ömürlü ama diskte düz metin durduğunu bilmekte fayda var.
- `.gitignore` `.env`, `.env.local`, `.env*.local`, `.vercel/`, `.next/`, `node_modules/`, `.DS_Store` kapsıyor; `!.env.example` ile geri dahil ediyor. **Doğru.**

**Aksiyon:** Git için gerekli değil. Laptop/yedekler paylaşılıyorsa Gmail app password'ünü döndürmeyi düşün. Not: production'da kullanılan SMTP şifresi `.env`'de (`.env.local`'de değil).

---

### 🔵 G9 — Hata yanıtında konfigürasyon durumu sızıntısı
**Önem:** Bilgi
**Dosya:** `src/app/api/contact/route.ts:194-199`

`{"error":"Mail server credentials are missing."}` + HTTP 500, kimliksiz bir çağırana sunucunun tam olarak neyi yanlış yapılandırdığını söylüyor. Geri kalan temiz: SMTP hata yolu (`:236-246`) tam hatayı sunucu tarafında `console.error` ile logluyor ve genel bir mesaj dönüyor — **hiçbir stack trace, SMTP yanıtı veya env değeri istemciye ulaşmıyor.** İstemci `data.error`'ı React text node olarak render ediyor (`contact-form.tsx:186`), yani düşmanca bir hata metni bile XSS'e dönüşemiyor.

**Çözüm:** Eksik-kimlik-bilgisi durumu için de aynı genel 500 mesajını dön.

---

### 🔵 G10 — `/api/health` ve `.vercel/project.json`
**Önem:** Bilgi

`src/app/api/health/route.ts:6-12` → `{service: APP_NAME, status, timestamp}`. `APP_NAME` sahibin belirlediği görünen ad (`"egekaya.net"`), sır değil. Sürüm yok, path yok, env dump yok. **Bu endpoint sorunsuz.** Tek not: kimliksiz ve önbelleklenemez (`force-dynamic`), yani L7 flood için statik bir sayfadan marjinal olarak daha ucuz hedef — bu ölçekte önemsiz.

`.vercel/project.json` `projectId`, `orgId`, `projectName` içeriyor ama **untracked ve gitignore'lu.** Sızsa bile bunlar kimlik bilgisi değil, Vercel token'ı olmadan işe yaramaz.

---

### 🔵 G11 — Bağımlılıklar
**Önem:** Bilgi
**Dosya:** `package.json:13-31`

Kurulu sürümler: `next@16.1.6`, `react@19.2.4`, `react-dom@19.2.4`, `nodemailer@8.0.2`, `gsap@3.14.2`. **Toplam beş runtime bağımlılığı** — çok küçük tedarik zinciri yüzeyi. (`npm audit` çalıştırılmadı — kapsam gereği ağ erişimi yok.)

- `nodemailer` saldırgan verisi işleyen tek bağımlılık ve güvenli kullanılıyor (`sendmail` transport yok, shell çağrısı yok, `to`/`from` üzerinde saldırgan kontrolü yok).
- Next middleware auth-bypass CVE sınıfı (CVE-2025-29927) **geçerli değil**: 16.x düzeltmenin çok ötesinde ve projede `middleware.ts` yok.
- `gsap` yalnızca istemci tarafı animasyon; kullanıcı girdisine dokunmuyor.

---

### ✅ Güvenlikte doğrulanmış temiz alanlar

Bunlar bulgu **değil** — kontrol edildi ve doğru bulundu:

- **E-posta header injection:** Düzgün engellenmiş. `sanitizeLine` (`route.ts:28-34`) `name`, `email`, `company`'den tüm `\r`/`\n` karakterlerini `subject` (`:216`) ve `replyTo`'ya (`:215`) ulaşmadan siliyor; `EMAIL_PATTERN` (`:6`) adreste boşluk kabul etmiyor. CRLF injection yolu yok.
- **Mail gövdesinde HTML injection:** Düzgün engellenmiş. `escapeHtml` (`:249-256`) `& < > " '` kaçırıyor ve üç interpolasyonun hepsine uygulanıyor (`:227,228,230`).
- **Type confusion:** Ele alınmış. `sanitizeLine`/`sanitizeBlock` string olmayanlar için `""` dönüyor; `getSubmissionAge` `Number.isFinite()` ile korunuyor. `{"name": {...}}` veya dizi göndermek temiz bir 400 üretiyor.
- **Uzunluk limitleri:** Mevcut (`:177` — 120/320/5000) ve istemci `maxLength` değerleriyle uyumlu. Tek boşluk: parse'tan sonra çalışmaları (G3).
- **Kimlik bilgisi sızıntısı:** Gmail şifresi yalnızca `runtime = "nodejs"` route handler'ında sunucu tarafında okunuyor, istemciye hiç gitmiyor, `NEXT_PUBLIC_*` değişkeninde değil (grep: sıfır `NEXT_PUBLIC` kullanımı), yanıt gövdesinde yok.
- **XSS sink'leri:** `src/` genelinde `dangerouslySetInnerHTML`, `innerHTML`, `__html`, `eval(`, `new Function`, `document.write` → **sıfır eşleşme.**
- **`next/image` SSRF:** `images.remotePatterns`/`domains` yapılandırılmamış ve `next/image` hiç kullanılmıyor. Kötüye kullanılacak uzak resim optimizer'ı yok.
- **Path traversal (fotoğraf sayfası):** `readdirSync(join(process.cwd(), "public", "images", "portfolio"))` **tamamen sabit path, sıfır kullanıcı girdisi.** Traversal yok.
- **Build hatası bastırma:** `next.config.ts`'te `typescript.ignoreBuildErrors` ve `eslint.ignoreDuringBuilds` yok. `tsconfig.json`'da `strict: true`. Hiçbir şey saklanmıyor.
- **Tabnabbing:** Her `target="_blank"` (`photography/page.tsx:190`, `staggered-menu.tsx:569,603`, `portfolio-card-view.tsx:20`) `rel="noopener noreferrer"` taşıyor.
- **Auth/session/çerez:** Hiç yok — `cookies()` yok, `Set-Cookie` yok. Dolayısıyla session fixation, IDOR, yetkilendirme yüzeyi de yok.

---

## 2. Fonksiyonel Hatalar

### 🔴 F1 — Menü çift tıklamada "açık ama görünmez" durumuna kilitleniyor
**Önem:** Yüksek
**Dosya:** `src/components/navigation/staggered-menu.tsx:439-455`

`toggleMenu`, `openRef.current` ve `setOpen()`'ı **koşulsuz** çeviriyor (doğrulandı — fonksiyonda `busyRef` guard'ı yok), ama `playOpen` (`:260-264`) `if (busyRef.current) return;` ile erken çıkıyor.

**Tekrar üretim adımları:**
1. Aç → `busyRef = true`, ~1.5 sn'lik timeline başlar
2. Animasyon ortasında kapatmak için tıkla → `playClose` (`:284`) açılış timeline'ını öldürür, dolayısıyla onun `onComplete`'i (`:277-279`) **hiç çalışmaz**; `busyRef` yalnızca kapanış tween'inin kendi `onComplete`'i (`:327`) ile 320 ms sonra temizlenir
3. O 320 ms penceresinde tekrar tıkla → `openRef`/`open` `true` olur, `aria-expanded` `true` olur, ikon 225°'ye döner — ama `playOpen` `:262`'de geri döner ve kapanış tween'i `setMenuSurfaceVisibility(false)` (`:326`) çağırarak biter

**Sonuç:** Menü kendini açık sanıyor, buton "Kapat" diyor, **ekranda hiçbir şey yok.** Kullanıcı zaten kapalı olan menüyü "kapatmak" için bir kez daha tıklamak zorunda.

**Çözüm:** `toggleMenu`'yü `busyRef.current` ile koru, ya da `playClose` açılış timeline'ını öldürdüğünde `busyRef`'i temizle.

---

### 🔴 F2 — Profil kartının arka ışıması kalıcı olarak görünmez
**Önem:** Yüksek (özellik sessizce çalışmıyor)
**Dosya:** `src/components/profile/profile-card.tsx:457` ve `:567`

Doğrulandı — `card-opacity` için tüm kod tabanında **tam olarak 2 eşleşme var:**

- `:457` → `"--card-opacity": "0"` olarak tanımlanıyor
- `:567` → `opacity: "calc(0.8 * var(--card-opacity))"` olarak tüketiliyor

Arada onu **yazan hiçbir şey yok.** `setVarsFromXY` (`:155-165`) bu değişkeni set etmiyor. Yani opacity sonsuza kadar `0`.

**Sonuç:** `behindGlowEnabled` bloğunun tamamı (`:560-570`) her zaman şeffaf bir div render ediyor. `behindGlowColor` / `behindGlowSize` propları (`:55-57`, `:450-451`) ölü — buna `home-profile-card.tsx:25`'te geçirilen `behindGlowColor="hsla(277, 100%, 70%, 0.6)"` de dahil.

**Çözüm:** Ya pointer-enter'da `--card-opacity`'yi bağla, ya da glow'u tamamen sil.

---

### 🔴 F3 — `GlareHover` inline stilleri `GlarePanel`'in Tailwind renklerini eziyor
**Önem:** Yüksek (görsel hata + üç CSS değişkenini runtime'da öldürüyor)
**Dosya:** `src/components/ui/glare-hover.tsx:117-124` vs `glare-panel.tsx:16-18`

`GlareHover`, `background` ve `borderColor`'ı **inline style** olarak uyguluyor. Inline stiller Tailwind class'larını her zaman ezer, dolayısıyla `GlarePanel`'in `bg-[var(--surface-card-bg)]` / `border-[var(--surface-border-medium)]` class'ları hiç etki etmiyor.

**Sonuç:** Sitedeki **her** `GlarePanel` aslında `rgba(255,255,255,0.04)` üzerine `rgba(255,255,255,0.08)` render ediyor. `--surface-card-bg`, `--surface-card-bg-strong`, `--surface-border-medium` CSS değişkenleri grep'te "kullanılıyor" görünmelerine rağmen **runtime'da ölü.**

**Çözüm:** `GlareHover`'da `background`/`borderColor` inline stillerini yalnızca prop açıkça geçirildiğinde uygula (`undefined` ise inline style'a hiç koyma).

---

### 🟠 F4 — Ana sayfada sonsuz `requestAnimationFrame` döngüsü (pil tüketimi)
**Önem:** Orta
**Dosya:** `src/components/profile/profile-card.tsx:194`

```js
const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
if (stillFar || document.hasFocus()) {
  rafId = requestAnimationFrame(step);
  return;
}
```

`|| document.hasFocus()` yüzünden döngü **sekme odaktayken hiç durmuyor** — tilt tamamen yerleştikten ve imleç ayrıldıktan sonra bile 60 fps'te dönmeye devam ediyor. `/` sayfasında bu, `LetterGlitch`'in kendi rAF döngüsüyle (`letter-glitch.tsx:294`) eşzamanlı çalışıyor — ki o döngü aksine `visibilitychange`'de doğru şekilde duraklıyor (`:308-316`) ve `prefers-reduced-motion`'a saygı gösteriyor (`:274`).

`document.hasFocus()` kalıntı gibi duruyor; doğru koşul tek başına `stillFar`. Temizlik zaten doğru (`tiltEngine.cancel()`, `:428`).

**Çözüm:** `|| document.hasFocus()` kısmını kaldır. Tek token'lık düzeltme.

---

### 🟠 F5 — GSAP reveal tween'leri `gsap.context`'ten kaçıyor, hiç öldürülmüyorlar
**Önem:** Orta (bellek sızıntısı + dev'de titreme)
**Dosya:** `src/components/about/use-gsap-intersection-reveal.ts:33-50`

`gsap.context(fn, scope)` yalnızca `fn`'in **senkron** çalışması sırasında yaratılan animasyonları toplar. `setInitialState(targets)` (`:34`) içeride, toplanıyor. Ama `animateIn(targets)` `IntersectionObserver` callback'inden (`:44`) çağrılıyor — yani asenkron, `fn` döndükten sonra. `split-reveal.tsx:42-48` ve `stagger-list.tsx:27-34`'teki `gsap.to` tween'leri bu yüzden **context'e kayıtlı değil** ve `:54`'teki `context.revert()` onları öldürmüyor.

**Sonuç:** Reveal ortasında sayfadan ayrılınca 0.7–0.9 sn'lik bir tween DOM'dan kopmuş node'lara karşı tiklemeye devam ediyor. Daha kötüsü, temizlik sırası `context.revert()` → inline stilleri siler → yetim tween onları yeniden uygular; React StrictMode dev double-invocation'ında bu **görünür titreme** üretiyor.

**Çözüm:** `context.add(() => animateIn(targets))` kullan, ya da dönen tween'leri yakalayıp `.kill()` et.

---

### 🟠 F6 — iOS'ta "Contact"a dokunmak hareket izni penceresini açıyor
**Önem:** Orta
**Dosya:** `src/components/profile/profile-card.tsx:405` + `:682`

`handleClick` `shellRef`'e bağlı ve Contact `<button>`'ı bu shell'in torunu. iOS Safari'de Contact'a dokunmak hem yönlendirme yapıyor **hem de** `DeviceMotionEvent.requestPermission()` (`:391`) tetikleyerek navigasyonun ortasında yerel "Allow Motion & Orientation Access?" diyaloğunu açıyor.

**Çözüm:** `handleClick`, etkileşimli torunlardan gelen event'leri yok saymalı.

---

### 🟡 F7 — Ref temizliğinde `splice` index→node eşlemesini bozuyor
**Önem:** Düşük (bugün gizli, dinamik listede patlar)
**Dosya:** `src/components/about/stagger-list.tsx:51-57`, `src/components/about/split-reveal.tsx:78-84`

```js
ref={(node) => {
  if (node) { itemRefs.current[index] = node; }
  else      { itemRefs.current.splice(index, 1); }
}}
```

`splice(index, 1)` sonraki tüm elemanları **bir slot aşağı kaydırıyor**, yani index 0'da bir detach sonrası eskiden index 1'deki node artık index 0'a cevap veriyor. Üstüne, ref callback'i her render'da yeniden yaratılan inline arrow olduğu için React **her** re-render'da detach/reattach yapıyor.

Bugün kendini iyileştiriyor çünkü tam re-render tüm index'leri yeniden bağlıyor ve her çağıran modül seviyesinde sabit dizi geçiriyor (`about/page.tsx:9-16`, `cyber-security/page.tsx:12-21`), yani re-render nadir. Liste dinamikleştiği an ısırır.

**Çözüm:** `delete itemRefs.current[index]` ya da `null` ata.

---

## 3. Routing, Metadata ve SEO

### 🔴 R1 — Hiçbir hata/404 route dosyası yok
**Önem:** Yüksek
**Dosya:** `src/app/` (kapsamlı `find` ile doğrulandı)

**Sıfır** adet `not-found.tsx`, `error.tsx`, `loading.tsx`, `global-error.tsx`, `template.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.*` var.

| Eksik | Kullanıcının gördüğü sonuç |
|---|---|
| `not-found.tsx` | Herhangi bir 404 (`/photograhpy` yazım hatası, eski bir dış link) Next'in yerleşik siyah-beyaz "404 \| This page could not be found" sayfasını render ediyor — **`(site)/layout.tsx`'in dışında.** Yani `LetterGlitch` arka planı yok, `StaggeredMenu` yok, footer yok ve **tarayıcı geri tuşu dışında siteye dönüş yolu yok.** En kötü UX deliği. |
| `error.tsx` (`(site)/` içinde) | Fotoğraf route'u somut risk. `readdirSync` (`photography/page.tsx:13`) **modül seviyesinde**, yani herhangi bir `ENOENT` modül değerlendirmesi sırasında fırlıyor → build zamanında build çöküyor, production'da ise digest'li çıplak "Application error: a server-side exception has occurred" ve **yeniden deneme imkânı yok.** Okumanın hiçbir yerinde `try/catch` yok. |
| `global-error.tsx` | `src/app/layout.tsx`'in kendisinde fırlayan bir hata Next'in stilsiz varsayılanına düşüyor. |
| `loading.tsx` | Düşük etki — beş sayfa da statik prerender edilebilir. En düşük öncelik. |
| `sitemap.ts` / `robots.ts` | Beş sayfalık halka açık bir portfolyo için sitemap ve robots direktifi yok. |

**Ek not:** `readdirSync` sonucu build zamanında prerender edilmiş sayfaya gömülüyor, yani **`public/images/portfolio/`'ya yeni fotoğraf eklemek yeniden build alınana kadar görünmeyecek** — Docker deploy (`Dockerfile:23`) düşünüldüğünde bilinmesi gereken bir davranış.

---

### 🔴 R2 — Beş sayfa da tek bir başlık ve tek bir açıklama paylaşıyor
**Önem:** Yüksek (SEO)
**Dosya:** `src/app/layout.tsx:5-18`

Tüm `src/` ağacındaki **tek** `metadata` export'u bu. Grep ile doğrulandı: sıfır `generateMetadata`, sıfır sayfa bazlı export.

`title: "egekaya.net"`, `title.template` yok. `/about`, `/cyber-security`, `/photography`, `/contact` — hepsi `<title>egekaya.net</title>` render ediyor ve aynı açıklamayı kullanıyor. Her tarayıcı sekmesi, her yer imi ve her arama sonucu birbirinden ayırt edilemez.

**Ayrıca:** `openGraph` yok, `twitter` yok, `alternates.canonical` yok, `metadataBase` yok. Bu siteye LinkedIn, X, WhatsApp veya Slack'te verilen herhangi bir link **hiç önizleme kartı olmadan** görünüyor.

> Bir yanlış anlamayı düzeltmek gerekirse: `metadataBase` eksikliği şu an OG uyarısı üretmiyor — Next'in ilgili resolver'ı (`resolve-opengraph.js:95-98`) yalnızca `openGraph`/`twitter` **görselleri** çözülürken uyarıyor, onlar da yok. Ama bir OG görseli eklendiği an `metadataBase` zorunlu hale gelecek.

---

### 🟠 R3 — Ana sayfadaki birincil CTA link değil, buton
**Önem:** Orta
**Dosya:** `src/components/profile/home-profile-card.tsx:22-24` → `profile-card.tsx:682-690`

`router.push("/contact")` ile imperative yönlendirme yapan bir `<button>`. Yani ana sayfanın birincil çağrı-eylem öğesinin **`href`'i yok**: orta tıkla açılamıyor, yeni sekmede açılamıyor, tarayıcılara/crawler'lara görünmüyor ve `<Link>` prefetch'i almıyor.

**Çözüm:** Buton gibi stillenmiş `<Link href="/contact">` yap.

---

### 🟠 R4 — Aktif sayfa göstergesi yok
**Önem:** Orta
**Dosya:** `src/components/navigation/staggered-menu.tsx:575-582`

Her `<Link>` aynı şekilde render ediliyor. `src/` genelinde ne `usePathname()` ne de `aria-current="page"` var — ne gören ne de ekran okuyucu kullanan biri hangi sayfada olduğunu anlayabiliyor.

---

### 🟡 R5 — Menüde "Home" öğesi yok
**Önem:** Düşük / teyit gerekli
**Dosya:** `src/app/(site)/layout.tsx:12-31`

`/` menü listesinde yok; eve dönüş yolu sadece marka işareti (`staggered-menu.tsx:522`). Bilinçli bir tercih gibi duruyor ama teyit edilmeli.

---

### ✅ Linkler tamamen temiz

`src/` içindeki 12 `href=` kullanımının hepsi tek tek doğrulandı: **hiçbir kırık link yok** ve **her `target="_blank"` `rel="noopener noreferrer"` taşıyor.** Menü öğeleri Next'in ürettiği route birleşimiyle (`.next/types/routes.d.ts:4`: `"/" | "/about" | "/contact" | "/cyber-security" | "/photography"`) birebir eşleşiyor.

Bunun sağlam olmasının nedeni mimari: `typedRoutes: true` (`next.config.ts:6`) + `Route` tipli `link` alanı (`staggered-menu.tsx:18`) sayesinde yanlış yazılmış bir iç path **runtime 404'ü değil, derleme hatası.** İyi kurulmuş.

**İkonlar ve manifest de tamamen doğru** — `layout.tsx:8-16`'daki her yol `public/` içindeki gerçek dosyalarla ve `sips` ile ölçülen gerçek piksel boyutlarıyla eşleştirildi: `favicon.ico` (15 KB), `favicon-16x16.png` (16×16), `favicon-32x32.png` (32×32), `apple-touch-icon.png` (180×180), `site.webmanifest` (geçerli JSON), manifest içindeki `android-chrome-192x192.png` (192×192) ve `-512x512.png` (512×512). Kırık referans yok.

---

## 4. Performans

### 🔴 P1 — 119 MB optimize edilmemiş fotoğraf, ham `<img>` ile servis ediliyor
**Önem:** Yüksek — sitedeki en ağır performans sorunu
**Dosya:** `src/components/photography/portfolio-card-view.tsx:27-32` (lint kuralı `:1`'de susturulmuş)

Doğrulandı: `public/images/portfolio` **119 MB**, 13 dosya, her biri 7.3–12.4 MB arası ham fotoğraf makinesi JPEG'i (en büyüğü `1.JPG` — 12 MB).

Bunlar **tam çözünürlükte, yeniden boyutlandırılmadan, format dönüştürülmeden** servis ediliyor. Dördü `loading="eager"` (`:31`), yani `/photography` sayfasının ilk boyaması fold'un üstünde kabaca **40 MB** çekiyor.

`next/image`'a geçmek (`next.config.ts`'te `images` yapılandırması yok, varsayılanlar geçerli) bunun küçük bir kesri kadar AVIF/WebP üretir.

---

### 🟠 P2 — Galeride `width`/`height` yok, sınırsız CLS
**Önem:** Orta
**Dosya:** `src/components/photography/portfolio-card-view.tsx:27-32`

`<img>` `className="block h-auto w-full"` taşıyor ve **hiçbir intrinsic boyut yok.** `columns-1 / sm:columns-2 / xl:columns-3` masonry düzeninin (`:15`) içinde her görsel yüklendikçe tüm sütun düzenini yeniden akıtıyor. `next/image` bunu P1 ile aynı anda çözer.

---

## 5. Erişilebilirlik

### 🔴 E1 — Menüde focus trap yok, Escape yok, focus geri dönüşü yok
**Önem:** Yüksek — kod tabanındaki en büyük a11y boşluğu
**Dosya:** `src/components/navigation/staggered-menu.tsx`

Dosyada **hiç `keydown` handler'ı yok** ve hiç focus yönetimi yok. Panel açıldığında klavye odağı overlay'in arkasındaki toggle butonunda kalıyor; Tab paneli terk edip alttaki sayfaya yürüyor; Escape hiçbir şey yapmıyor (toggle dışındaki tek kapatma yolu `:473`'teki dışarı-tıklama `pointerdown`'ı, ki klavye kullanıcısı bunu tetikleyemez); kapanışta odak geri verilmiyor.

---

### 🟠 E2 — Ana site navigasyonu `<nav>` değil
**Önem:** Orta
**Dosya:** `src/components/navigation/staggered-menu.tsx:551-557`

Menü `<aside>` ile sarılmış, ki bu ARIA'da `complementary` rolüne karşılık geliyor. Sitenin ana navigasyonu **ek/yardımcı içerik** olarak duyuruluyor ve ekran okuyucu kullanıcıları "navigasyona atla" landmark kısayolunu tamamen kaybediyor.

**Çözüm:** `<nav aria-label="Main">`.

---

### 🟠 E3 — `aria-hidden` hâlâ odaklanabilir linklere 320 ms boyunca uygulanıyor
**Önem:** Orta
**Dosya:** `staggered-menu.tsx:555` vs `:499-501`

`aria-hidden={!open}` kullanılıyor ama `visibility:hidden` ayrı bir `panelVisible` state'ine bağlı. Kapanış sırasında `open` anında `false` oluyor, `panelVisible` ise tween'in `onComplete`'i (`:326`) 320 ms sonra çalışana kadar `true` kalıyor. O pencerede panel hem `aria-hidden="true"` **hem de** odaklanabilir, görünür `<Link>`'ler içeriyor — klasik "aria-hidden alt ağacında odaklanabilir öğe" ihlali.

**Çözüm:** Panele aynı koşula bağlı `inert` ekle.

---

### 🟠 E4 — Reveal animasyonları `prefers-reduced-motion`'ı yok sayıyor
**Önem:** Orta
**Dosya:** `src/components/about/split-reveal.tsx`, `stagger-list.tsx`

`letter-glitch.tsx:274` ve `profile-card.tsx:490` `shouldReduceEffects`'i doğru şekilde kontrol ediyor, ama grep bu iki dosyanın **hiç** kontrol etmediğini doğruluyor. `/about`, `/cyber-security` ve `/photography`'deki her başlık ve liste öğesi, azaltılmış hareket talep eden kullanıcılar için hâlâ kayıyor ve soluyor. İlgili: `globals.css:50` global `scroll-behavior: smooth` set ediyor, reduced-motion override'ı yok.

---

### 🟠 E5 — `alt` metinleri üretilmiş, betimleyici değil
**Önem:** Orta
**Dosya:** `photography/page.tsx:19`, `portfolio-card-view.tsx:23`

`alt={photo.title}` → `"Portfolio Photo 1"` … `"Portfolio Photo 13"`; anchor'ın `aria-label`'ı → `"Open Portfolio Photo 1"`. Teknik olarak geçerli, bilgi olarak boş.

---

### 🟡 E6 — Diğer
- `staggered-menu.tsx:596`: `aria-label` rolsüz bir `<div>`'de — **yok sayılıyor.** `role="group"` ekle ya da label'ı `:598`'deki `<ul>`'ye taşı.
- `split-reveal.tsx:66-69`: Her başlık çift etiketleniyor — hem `aria-label={text}` hem içeride `<span className="sr-only">{text}</span>`. `aria-label` kazanıp alt ağacı ezdiği için `sr-only` span ölü ağırlık. Zararsız ama gereksiz.
- **Skip-to-content linki yok**, üstelik her sayfanın önünde sabit tam-viewport bir header overlay'i var.

### ✅ İletişim formu iyi yazılmış
`contact-form.tsx:107-156`'daki her input implicit-label sarmalayıcı kullanıyor — geçerli. Durum bölgesindeki `aria-live="polite"` (`:167`) doğru. Honeypot (`:93-105`) `aria-hidden` + `tabIndex={-1}` + ekran dışı konumlandırma kullanıyor — doğru. Etiketsiz buton yok: toggle'ın duruma bağlı `aria-label`'ı (`:529`) + `aria-expanded`/`aria-controls` (`:530-531`) gerçek `id="staggered-menu-panel"`'e (`:552`) işaret ediyor — eşleşme doğrulandı.

---

## 6. Ölü Kod

> **2026-08-07 — bu bölümün büyük kısmı geçersiz.** Upstream karşılaştırması, "ölü" işaretlenen maddelerin çoğunun React Bits API'sinin sadık taşınması olduğunu gösterdi. Gerekçe ve düzeltilmiş kapsam: **§8.6 (Y5)**. Gerçekten silinenler `99e9fb3` ve `3ce97bb`'de. Aşağısı denetimin ilk hâli, tarihsel kayıt olarak duruyor.

### Kullanılmayan export'lar
`src/` genelinde her export edilen sembol adı tek tek grep'lendi. **Yalnızca bir tanesi kullanılmıyor:**

| Sembol | Konum | Durum |
|---|---|---|
| `StaggeredMenuProps` | `staggered-menu.tsx:27` | Sadece kendi dosyasında `:69`'da kullanılıyor. Hiçbir yer import etmiyor → `export` anahtar kelimesi kaldırılabilir. |

Kullanıldığı doğrulananlar (aksiyon gerekmez): `SITE_ACCENT_COLOR`, `SITE_LIGHT_ACCENT_COLOR`, `SITE_MENU_COLORS`, `SITE_GLITCH_COLORS`, `MobileEffectsQueries`, `createMobileEffectsQueries`, `getMobileEffectsPolicyState`, `subscribeToMobileEffectsPolicy`, `GLASS_LIST_TILE_CLASS_NAME`, `GLASS_LIST_TILE_SUBDUED_CLASS_NAME`, `StaggeredMenuItem`, `StaggeredMenuSocialItem`, `joinClassNames` ve 12 default component export'unun tamamı.

### Kullanılmayan dosya
**Yok.** `src/` altındaki 26 `.ts`/`.tsx` dosyasının hepsi bir route'tan erişilebilir durumda. Özellikle şüphelenilen ikisi de canlı: `profile-card.tsx` (`home-profile-card.tsx:5` → `(site)/page.tsx:1`) ve `glare-hover.tsx` (`glare-panel.tsx:5`, 3 sayfada kullanılıyor).

### Hiç geçirilmeyen prop'lar (varsayılanlar hep kazanıyor)
- **`ProfileCard`** (`profile-card.tsx:50`) — tek çağıran `home-profile-card.tsx:11` yalnızca 8 prop geçiriyor. Hiç geçirilmeyenler: `avatarUrl` :84, `iconUrl` :85, `behindGlowEnabled` :86, `behindGlowSize` :87, `className` :90, `enableTilt` :91, `enableMobileTilt` :92, `mobileTiltSensitivity` :93, `miniAvatarUrl` :94, `title` :96, `showUserInfo` :102.
  - `miniAvatarUrl` hiç geçirilmediği için `:660`'taki `miniAvatarUrl || avatarUrl` hep `avatarUrl`'e çözülüyor.
  - `title` (varsayılan `"Cyber Security Engineer"`) **erişilemez**: çağıran her zaman boş olmayan `titleLines` geçirdiği için `:738-757`'deki `: title ?` dalı hiç render edilmiyor.
  - `DEFAULT_INNER_GRADIENT` (`:21`) ölü — çağıran her zaman `innerGradient` geçiriyor.
- **`GlareHover`** (`glare-hover.tsx:5`) — hiç geçirilmeyenler: `width` :6, `height` :7, `background` :8, `borderRadius` :9, `borderColor` :10, `glareAngle` :14, `transitionDuration` :16, `playOnce` :17, `style` :19.
- **`SplitReveal`** (`:19-20`) — `stagger` ve `threshold` 13 çağrı noktasının hiçbirinde geçirilmiyor.
- **`LetterGlitch`** (`:18`) — `characters` hiç geçirilmiyor.
- **`GradientCallout`** (`:6`) — `as` prop'u hiç geçirilmiyor; generic `T` yalnızca `"div"` varsayılanıyla örnekleniyor.
- **`StaggeredMenu`** (`:27`) — `(site)/layout.tsx:52` yalnızca 5 prop geçiriyor. Hiç geçirilmeyenler: `position` :29, `colors` :31, `displaySocials` :34, `displayItemNumbering` :35, `className` :36, `menuButtonColor` :37, `openMenuButtonColor` :38, `accentColor` :39, `changeMenuColorOnOpen` :40, `closeOnClickAway` :41, `onMenuOpen` :42, `onMenuClose` :43.

### Ölü dallar ve okunmayan yazımlar
**`profile-card.tsx`**
- `:283`, `:317`, `:430` — `classList.add/remove("active")` **hiçbir şey yapmıyor.** `globals.css`'te (projedeki tek CSS dosyası) `.active` kuralı yok ve hiçbir JS bunu okumuyor. Karşılaştırma: `"entering"` class'ı `:318`'de gerçekten okunuyor.
- `:572` — shell div'indeki `className="group"` işe yaramıyor; `src/` genelinde sıfır `group-hover`/`group-*` varyantı var.
- `:443` + `:476` — `cardRadius` sabit bir string literal ama `useMemo` bağımlılık dizisinde listeleniyor; hiç reaktif değil.

**`staggered-menu.tsx`**
- `:480-489` — `layerColors` mantığı büyük ölçüde ölü. `colors` varsayılanı `SITE_MENU_COLORS` ve uzunluğu 2, dolayısıyla `:481`'deki fallback erişilemez ve `:484`'teki `nextPalette.length >= 3` her zaman false — `splice` hiç çalışmıyor. Tüm IIFE `colors.slice(0, 4)`'e indirgeniyor.
- `:358-364` ve `:377-381` — her iki `if (changeMenuColorOnOpen)` dalı da ölü (prop varsayılanı `false` ve hiç geçirilmiyor). Bu ayrıca `openMenuButtonColor` prop'unu tamamen öldürüyor.
- `:112` ve `:296` — `position === "left" ? -100 : 100` her zaman `100`'e çözülüyor.
- `:586-592` — `<li>No items</li>` fallback'i erişilemez; layout her zaman 6 öğe geçiriyor.
- `:89-91` — `setMenuSurfaceVisibility` yalnızca `setPanelVisible`'ı çağıran bir `useCallback`. Saf dolaylılık.

**`glare-hover.tsx`**
- `:40-45` ve `:47-52` — `getGlareColorWithOpacity`'nin 3 haneli hex ve `rgba()` parse dalları pratikte erişilemez; her çağıran 6 haneli hex geçiriyor (`#41B06E`, `#FFF5E0`).
- `:94-98` — `animateOut`'taki `if (playOnce)` erken dönüşü ölü.

**`letter-glitch.tsx`**
- `:226-227` — `smooth ? 0 : 1` ve `smooth ? … : nextColor` false dalları ölü; tek çağıran hep `true` geçiriyor.
- `:388-389` — `outerVignette` ve `centerVignette` hep `true`.

**`mobile-effects-policy.ts`**
- `:52-60` — legacy `addListener`/`removeListener` fallback yolu. `MediaQueryList.addEventListener` destekleyen her tarayıcıda (Safari 14+, tüm evergreen) erişilemez. *Yalnızca Safari ≤13 hedefliyorsan gerekli.*

### CSS
**JSX'te uygulanan ama hiçbir CSS kuralı olmayan class'lar (ölü markup):**
- `sm-icon-line-v` — `staggered-menu.tsx:546`. `globals.css`'te kural yok; dikey çubuk tamamen `:116`'daki GSAP ile döndürülüyor.
- `sm-socials-item` — `staggered-menu.tsx:600`. Kural yok (`.sm-socials`, `-title`, `-list`, `-link` var; `-item` yok).

**Ölü CSS kuralları:**
- `globals.css:238-241` ve `:268-273` — `[data-position="left"]` seçicileri erişilemez. `data-position` `position` prop'una bağlı (`staggered-menu.tsx:507`), varsayılanı `"right"` ve hiç geçirilmiyor.

**Runtime'da ölü CSS değişkenleri:** `--surface-card-bg` (:18), `--surface-card-bg-strong` (:19), `--surface-border-medium` (:13) — üçü de yalnızca `GlarePanel`'in Tailwind class'ları üzerinden tüketiliyor, o class'lar da F3'te anlatıldığı gibi eziliyor.

**Çakışma (ölü değil ama muhtemelen istenmeyen):** `globals.css:75-79` `.home-main { position: relative; z-index: 1; min-height: 100vh; }` aynı elemandaki `relative z-[1] min-h-[100svh]` ile çakışıyor (`(site)/page.tsx:5`). `.home-main` layer'sız, Tailwind v4 utility'leri `@layer utilities` içinde olduğu için layer'sız `min-height: 100vh` **kazanıyor** — mobilde `min-h-[100svh]`'in amacını boşa çıkarıyor.

**Doğrulanmış kullanımda:** `--panel-background`, `--panel-border`, `--panel-shadow` TSX'ten değil `globals.css`'in kendi içinden tüketiliyor (`:258-260`) — ölü değil.

### Statik varlıklar
`public/` içindeki her şey kullanımda: `pp.png` (`profile-card.tsx:84`), `spyware.svg` (`:85`), tüm favicon'lar ve `site.webmanifest` (`layout.tsx:8-16`), `android-chrome-*` (manifest üzerinden), 13 portfolyo JPEG'i (runtime `readdirSync`).

**Tek gerçekten ölü artefakt — `favicon_io/` (634 KB, untracked, `.gitignore`'da DEĞİL).** Bayt karşılaştırması yapıldı: `android-chrome-192x192.png`, `android-chrome-512x512.png`, `apple-touch-icon.png`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico` → `public/`'takilerle **bayt bayt aynı.** Yalnızca `site.webmanifest` farklı (jeneratörün stok sürümü). `src/`, `next.config.ts`, `Dockerfile`, `compose.yaml` veya `README.md`'de hiçbir referans yok. Favicon jeneratörünün ham indirmesi — silinebilir.

### Tekrarlanan mantık
1. **Aynı GSAP ref-toplayıcı callback'i** — `split-reveal.tsx:78-84` ve `stagger-list.tsx:51-57` karakter karakter aynı. İkisi zaten `useGsapIntersectionReveal`'i paylaşıyor; bu da o hook'a `registerTarget(index)` olarak taşınmalı. (Ayrıca F7'yi tek yerde düzeltir.)
2. **Menü element sorgusu + reset bloğu birebir tekrarlanmış** — `staggered-menu.tsx:143-148` (`buildOpenTimeline`) ve `:303-308` (`playClose`) aynı dört seçiciyi aynı şekilde sorguluyor; `:155-169` ve `:310-324` aynı dört `gsap.set` reset'ini uyguluyor. ~25 satır tekrar.
3. **"Fact card" markup'ı üç sayfada tekrarlanmış** — `about/page.tsx:76-96`, `cyber-security/page.tsx:130-150`, `photography/page.tsx:100-120`. Yalnızca `min-h`, glare rengi ve opacity farklı. Bir `FactCard` bileşeni ~60 satır siler.
4. **"Feature card" markup'ı tekrarlanmış** — `about/page.tsx:121-140` ve `cyber-security/page.tsx:207-237`.
5. **Varsayılan hata mesajı üç kez** — `"Something went wrong while sending your message. Please try again in a moment."` → `contact-form.tsx:39`, `:47`, `:72`. (Dördüncü bir yakın kopya sunucuda: `api/contact/route.ts:242`.)
6. **Üç neredeyse aynı etiketli alan** — `contact-form.tsx:107-156`; küçük bir `Field` bileşeni tekrarı siler.
7. **İki bağımsız hex renk parser'ı** — `letter-glitch.tsx:95-110` (`hexToRgb`) ve `glare-hover.tsx:29-55`. `src/lib/` ortak bir uygulama için doğru yer.
8. **Media-query listener bağlama üç kez** — `mobile-effects-policy.ts:40-60`; `Object.values(queries)` üzerinde bir döngü yarıya indirir.

---

## 7. Konfigürasyon

### ✅ `next.config.ts` temiz
`eslint.ignoreDuringBuilds` yok, `typescript.ignoreBuildErrors` yok. `output: "standalone"`, `poweredByHeader: false`, `typedRoutes: true` ve `/:path*`'e uygulanan sağlam sekiz header'lık güvenlik bloğu. Tek boşluk CSP (G4) — **`3340710` ile kapatıldı**, `output: "standalone"` ise Faz 1'de kaldırıldı.

### 🟡 K1 — `npm run typecheck` typed-route hatalarını sessizce atlıyor
**Dosya:** `tsconfig.typecheck.json:3` vs `tsconfig.json:36`

`tsconfig.typecheck.json`, `include`'u aynen yeniden tanımlıyor **ama `".next/dev/types/**/*.ts"`'i düşürüyor.** `src/`'nin tamamı `**/*.ts` / `**/*.tsx` ile hâlâ kapsanıyor, dolayısıyla boşluk dar ama gerçek: `npm run typecheck` typed-route doğrulaması için `.next/types/**/*.ts`'e bağımlı ve **o dizin yalnızca `next build` sonrası var oluyor.** Temiz bir checkout'ta glob hiçbir şeyle eşleşmiyor ve typed-route hataları sessizce atlanıyor.

**Çözüm:** CI'da `typecheck`'i `build`'den **sonra** çalıştır, ya da include'u geri ekle.

**Ayrıca:** `tsconfig.json:19` `incremental: true` + `noEmit` kullanıyor, yani iki config de `.tsbuildinfo` yazıyor — gitignore'landığını kontrol et.

### ✅ ESLint kapsamı doğru
`eslint.config.mjs:1-3` `eslint-config-next/core-web-vitals`'ı doğrudan yeniden export ediyor. Paket çözüldü: üçüncü elemanı `ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"]` sağlıyor, yani `eslint .` build çıktısını lint'lemiyor. Not: iki `@next/next/no-img-element` bastırması (`portfolio-card-view.tsx:1`, `profile-card.tsx:3`) tam olarak P1'i işaretleyecek olan kural.

### ✅ Docker tutarlı
`Dockerfile:23-25` `public`, `.next/standalone` ve `.next/static`'i `output: "standalone"` için doğru sırada kopyalıyor; `.dockerignore` `public/images`'ı hariç tutmuyor, yani galeri imaja giriyor. İki not: build context her imaj katmanına 123 MB'lık `public/`'i taşıyor (P1'e bak) ve `compose.yaml`'da healthcheck tanımlı değil — `/api/health` mevcut ve doğru şekilde `force-dynamic` işaretli olmasına rağmen.

---

## 8. Ek Bulgular — Faz 0 Ölçümü (2026-08-06)

İlk denetim salt statik analizdi. Faz 0'da proje derlenip çalıştırıldığında üç yeni bulgu çıktı ve birkaç tahmin ölçülmüş sayıya dönüştü.

### 8.1 Ölçülmüş baseline

Production build (`next build`) + standalone sunucu üzerinde, `performance.getEntriesByType("resource")` ile:

| Ölçüm | Değer |
|---|---|
| `build` / `typecheck` / `lint` | Üçü de temiz |
| Rotalar | 5 statik, 2 dinamik (`/api/contact`, `/api/health`) |
| `/` toplam transfer | ~~304.8 KB, 12 kaynak~~ — **bu ölçüm hatalıydı, bkz. §8.5** |
| `/photography` ilk yükleme | **35.15 MB** — 34.96 MB'ı 4 adet `eager` görsel |
| En büyük tek dosya | `1.JPG` — 11.80 MB |
| `width`/`height` taşıyan görsel | 13 görselin **hiçbiri** |
| Rate limiter davranışı | 20 istek, 20 farklı sahte `CF-Connecting-IP` → hepsi geçti (`400`), limiter hiç devreye girmedi |

Bu, **G1 ve P1/P2'yi tahmin olmaktan çıkarıp ölçüme bağlıyor.** Faz 1'in kabul kriteri: aynı döngüde 5. istekten sonra `429`. Faz 3'ün kabul kriteri: `/photography` toplam transferi 5 MB altı.

**Ölçülemeyen iki şey:**
- **CLS** localhost'ta `0.0000` çıktı. Ağ gecikmesi olmadığı için görseller anında geliyor; bu sayı gerçek bir bağlantıyı temsil etmez. 13 görselin hiçbirinde intrinsic boyut olmaması yapısal riski koruyor (P2). Anlamlı ölçüm için ağ kısıtlaması (throttling) gerekiyor.
- **F4 (sonsuz rAF)** çalışma anında doğrulanamadı: test tarayıcısı odakta olmadığı için `document.hasFocus()` false döndü ve döngü zaten durdu — kusur tam olarak sekme odaktayken ortaya çıkıyor. Kod tarafı `profile-card.tsx:194`'te doğrulanmış durumda.

---

### 8.2 — Y1: `npm run start` artık çalışmıyor
**Önem:** Orta
**Dosya:** `package.json:9`, `README.md:53`, `next.config.ts` (`output: "standalone"`)

`output: "standalone"` eklendiğinden beri Next açıkça uyarıyor:

```
⚠ "next start" does not work with "output: standalone" configuration.
  Use "node .next/standalone/server.js" instead.
```

`package.json:9` hâlâ `"start": "next start"` ve `README.md:53` bunu production komutu olarak belgeliyor. Yani belgelenen production yolu artık geçersiz.

Ek incelik: `node .next/standalone/server.js` de tek başına yetmiyor — standalone çıktısı `public/` ve `.next/static`'i içermiyor, bunların yanına elle kopyalanması gerekiyor. `Dockerfile:23-25` bunu doğru yapıyor; lokal script karşılığı yok.

**Çözüm:** `start` script'ini standalone çıktısını hazırlayıp çalıştıracak şekilde güncelle (veya `start:standalone` diye ayrı bir script ekleyip `start`'ı kaldır) ve README'yi eşitle.

---

### 8.3 — Y2: `.env` standalone çıktısına kopyalanıyor
**Önem:** Orta (Docker imajı etkilenmiyor)
**Dosya:** `.next/standalone/.env` (build çıktısı)

`next build` sonrası `.next/standalone/.env` dosyası oluşuyor ve içinde `APP_NAME`, `APP_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD` anahtarları bulunuyor — yani canlı SMTP şifresi build çıktısına kopyalanıyor.

**Docker imajı etkilenmiyor — doğrulandı.** `.dockerignore:10-15` `.env` ve türevlerini build context'ten çıkarıyor, dolayısıyla imaj içindeki `next build` hiç görmüyor ve `.next/standalone/.env` orada oluşmuyor. §5'teki "imaja sır gömülmüyor" tespiti geçerliliğini koruyor.

**Gerçek risk:** `.next/standalone` dizinini bir sunucuya doğrudan kopyalayarak (rsync, scp, CI artifact) deploy edersen Gmail şifresi de gider. `.next/` gitignore'lu olduğu için git tarafında risk yok.

**Çözüm:** Deploy yolu olarak yalnızca Docker imajını kullan; standalone dizinini elle taşıyorsan `.env`'i açıkça hariç tut. CI'da artifact üretiliyorsa artifact adımından önce sil.

---

### 8.4 — Y3: `next-env.d.ts` sürekli değişiyor — K1'in gerçek mekanizması
**Önem:** Düşük (git gürültüsü) / K1 için açıklayıcı
**Dosya:** `next-env.d.ts` (takipli)

Next bu dosyayı en son çalıştırılan komuta göre yeniden yazıyor:

| Son komut | Satır 3 |
|---|---|
| `next dev` | `import "./.next/dev/types/routes.d.ts";` |
| `next build` | `import "./.next/types/routes.d.ts";` |

Dosya git'te takipli olduğu için her dev↔build geçişi bir diff üretiyor — `git status`'taki tek kalıcı kirlilik bu.

**Daha önemlisi:** §7.K1'de "`tsconfig.typecheck.json` include listesinden `.next/dev/types/**/*.ts`'i düşürüyor" olarak tarif edilen sorunun asıl mekanizması bu. Typed-route kapsamı tsconfig include'undan değil, `next-env.d.ts`'in o an hangi varyantı işaret ettiğinden geliyor. Yani `npm run typecheck`'in typed-route hatalarını yakalayıp yakalamaması **en son `dev` mi yoksa `build` mi çalıştırdığına** bağlı.

**Çözüm:** K1 ile aynı — CI'da sırayı `build` → `typecheck` yap. Lokal git gürültüsü için `next-env.d.ts`'i gitignore'a almayı değerlendir (Next dosyayı her çalışmada yeniden üretiyor).

---

### 8.5 — Y4: Ana sayfanın iki büyük varlığı ve baseline ölçüm hatası
**Önem:** Yüksek (performans) · **Bulunma zamanı:** CSP çalışmasının doğrulaması sırasında
**Dosyalar:** `public/pp.png`, `public/spyware.svg`

#### Ölçüm hatası

§8.1'de "`/` toplam transfer 304.8 KB" yazıyordu ve bu sayı Faz 3–6 boyunca "regresyon yok" kanıtı olarak tekrarlandı. **Ölçüm sıcak önbellekle alınmıştı.** Önbellek kapatılarak tekrarlandığında:

| Sayfa | Soğuk transfer | İstek |
|---|---|---|
| **`/`** | **2528.2 KB** | 27 |
| `/about` | 190.7 KB | 21 |
| `/cyber-security` | 190.7 KB | 21 |
| `/photography` | 494.5 KB | 31 |
| `/contact` | 191.1 KB | 21 |

Eski sayının nereden geldiği de anlaşıldı: **`spyware.svg` tek başına tam 304.8 KB transfer ediyor.** Sıcak ölçümde diğer tüm kaynaklar önbellekten gelip `transferSize: 0` sayılmış, geriye yalnızca bu dosya kalmıştı. Yani "toplam" sanılan sayı aslında tek bir varlığın boyutuydu.

#### Bulgu

`/` sayfasının 2528 KB'ının **2334 KB'ı (%92) iki dosya**:

| Dosya | Disk | Transfer | Kullanım | Çözüm |
|---|---|---|---|---|
| `pp.png` | 2.0 MB | **2028.9 KB** | Profil avatarı, ham `<img>` (`profile-card.tsx:87`), 2048×2048, ~384 CSS px'te render ediliyor | `next/image` — P1'le aynı kazanç, tahmini ~60 KB |
| `spyware.svg` | 860 KB | **304.8 KB** | Shine maskesi, CSS `mask-image` (`:88`) | `next/image` uygulanamaz; SVG'nin kendisi sadeleştirilmeli |

Bu ikisi olmasa `/` yaklaşık 194 KB olurdu — diğer sayfalarla aynı seviyede.

#### Denetim bunu neden kaçırdı

§6.7'deki statik varlık taraması **"referans veriliyor mu"** sorusunu sordu, **"ne kadar büyük"** sorusunu sormadı. `pp.png` ve `spyware.svg` ikisi de kullanımda olduğu için "temiz" işaretlendi. P1 ise yalnızca `public/images/portfolio`'yu kapsıyordu. Boyut, ölü kod taramasının değil performans taramasının konusuydu ve ikisi arasındaki boşluğa düştüler.

**Ders:** Varlık envanterinde "kullanılıyor mu" ve "ne kadar büyük" ayrı sorular. Birincisi ikincisini kapsamıyor.

---

### 8.6 — Y5: §6'nın ölü kod envanteri büyük ölçüde geçersiz
**Önem:** Yüksek (denetim metodolojisi hatası) · **Bulunma zamanı:** 2026-08-07, Faz 7 planlanırken

Repo sahibi React Bits **StaggeredMenu** upstream kaynağını sağladı. [§6](#6-ölü-kod)'daki envanter upstream'le karşılaştırıldığında, "ölü kod" diye işaretlenen maddelerin **çoğunun upstream API'sinin sadık taşınması** olduğu görüldü.

**Metodoloji hatası:** Tarama yalnızca *"bu proje bunu kullanıyor mu"* sorusunu sordu. Sorulması gereken ikinci soru vardı: *"bu, bileşenin kendi API'sinin parçası mı?"* Bir React Bits bileşenini olduğu gibi taşırsan, kullanmadığın her prop ve her koşullu dal "ölü" görünür — ama silmek temizlik değil, **fork kararıdır.**

**Somut yanlış tespitler:**

| §6'da ölü denilen | Gerçek |
|---|---|
| `StaggeredMenu`'nün 12–13 kullanılmayan prop'u | 17 prop'un **15'i** upstream API'si |
| `ProfileCard`'ın 11 kullanılmayan prop'u | 20 prop'un **18'i** upstream API'si |
| `[data-position="left"]` CSS kuralları | Upstream CSS'inde var |
| `sm-icon-line-v` — "CSS karşılığı yok" | Upstream'de de kuralı yok; GSAP `plusVRef` üzerinden hedefliyor. Class bir işaretleyici. |
| `sm-socials-item` — "CSS karşılığı yok" | Upstream'de de öyle |
| `layerColors` IIFE'si, `changeMenuColorOnOpen`, `position === "left"`, "No items" fallback'i | Dördü de upstream'de birebir var |

**Gerçekten porta özgü ve silinebilir olanlar:** `favicon_io/`, `StaggeredMenuProps` export'u, `glare-panel` `"use client"`, `mobile-effects-policy` legacy `addListener`, `profile-card` `className="group"`, `setMenuSurfaceVisibility` dolaylılığı, `cardRadius` deps'i. Ve [§6.8](#6-ölü-kod)'deki tekrar azaltma maddeleri — onlar port'un kendi yazdığı kod.

**Değerlendirilemeyenler:** `GlareHover` ve `LetterGlitch` için upstream kaynağı elimizde yok, dolayısıyla onların "ölü dal" maddeleri (hex parse dalları, `playOnce`, `smooth` false dalları, vignette ternary'leri) aynı riski taşıyor. Kaynakları sağlanmadan dokunulmamalı.

Daraltılmış kapsam: [DUZELTME-PLANI.md § Faz 7 Uygulama Planı](DUZELTME-PLANI.md).

#### Çözüm — `144ef39`, `ad11cf6`

| Varlık | Önce | Sonra | Yöntem |
|---|---|---|---|
| `pp.png` | 2028.9 KB | **21.5 KB** (iki avatar birlikte) | `next/image` — P1'le aynı kalıp |
| `spyware.svg` → `spyware-mask.png` | 304.8 KB | **17.7 KB** | 256×251 grayscale PNG'ye rasterize edildi |
| **`/` toplam (soğuk)** | **2528.2 KB** | **239.1 KB** | −%90.5 |

Diğer dört sayfa 190.7 → 195.7 KB'ye çıktı: `next/image`'ın runtime'ı paylaşılan chunk'a girdi. 2.3 MB'lık kazanç karşısında kabul edilen bedel.

**Maskede WebP yerine PNG seçildi.** WebP 7 KB ölçüldü ama bir maske görselinin geri dönüşü yok — format yüklenemezse shine katmanı maskesiz render edilir. 10 KB fark, kaldırılan 2.3 MB yanında gürültü.

**Doğrulama:** Kartın render'ı piksel bazında karşılaştırıldı — yalnızca maske değişiminde ortalama fark 0.45/255 (%0.16 piksel >8), fotoğrafla birlikte 1.06/255 (%1.09), ki bu da AVIF/WebP yeniden kodlamasından. Tilt etkileşimi çalışıyor (`--rotate-x` −0.001° → 4.153°), sıfır CSP ihlali, beş sayfa hâlâ statik.

---

## 9. Önerilen Düzeltme Sırası

> **Tarihsel kayıt.** Bu sıralama denetimin ilk hâlinden; uygulanan gerçek sıra ve sonuçları için yukarıdaki [Çözüm Durumu](#çözüm-durumu--2026-08-07) bölümüne bakın. Aşağıdaki maddelerin neredeyse tamamı tamamlandı; G5 kapsam dışı kalıp Docker'ın silinmesiyle konusuz hâle geldi.

**Önce güvenlik ve çökme (bugün etkisi olanlar):**
1. **G1** — `route.ts`'te IP header güveni ve sınırsız kova haritası. Saldırganın bugün gerçek etkiyle sömürebileceği tek bulgu.
2. **R1** — `src/app/not-found.tsx` + `src/app/(site)/error.tsx`. En küçük diff, en kötü iki başarısızlık modunu kaldırıyor.
3. **G5** — `USER node` ekle, container'ı `127.0.0.1`'e bağla, reverse proxy arkasına al. Bu aynı zamanda G1'in yarısını etkisiz kılıyor.
4. **Y1** — `start` script'ini ve README'yi standalone çıktısıyla eşitle. Belgelenen production komutu şu an çalışmıyor.
5. **Y2** — Deploy yolunu Docker imajıyla sınırla; standalone dizinini elle taşıyorsan `.env`'i hariç tut.

**Sonra görünür hatalar:**
6. **F1** — Menü desync'i (`staggered-menu.tsx:439`). Tek satırlık `busyRef` guard'ı.
7. **F3** — `GlareHover` inline style ezmesi. Üç CSS değişkenini geri getiriyor.
8. **F2** — `--card-opacity` bağla ya da glow'u sil.
9. **F4** — `document.hasFocus()`'u kaldır (`profile-card.tsx:194`). Tek token.

**Sonra performans ve erişim:**
10. **P1 + P2** — Galeride `next/image`. Ölçülen 35.15 MB'lık ilk yüklemeyi ve tüm CLS riskini tek seferde çözüyor.
11. **E1 + E3** — Menü için Escape, focus trap, `inert`.
12. **R2** — Sayfa bazlı `metadata` export'ları + `title.template` + OG etiketleri.

**Sonra sağlamlaştırma:**
13. **G3** — `Content-Type` + gövde boyutu doğrulaması.
14. **G4** — CSP (`Report-Only` ile başla).
15. **F5** — `gsap.context` kaçışı.
16. **K1 + Y3** — CI'da `typecheck`'i `build` sonrasına al; `next-env.d.ts` gürültüsüne karar ver.

**En son temizlik:**
17. `favicon_io/` sil; ölü `"active"` class'ı, `changeMenuColorOnOpen` ve `position === "left"` dallarını kaldır; `StaggeredMenuProps`'un `export`'unu kaldır; ortak ref-toplayıcı ve menü sorgu yardımcılarını çıkar; `<nav>` semantiği, `aria-current`, Contact CTA için `<Link>`, reduced-motion guard'ları, `splice` → `delete`, `glare-panel.tsx`'ten gereksiz `"use client"`.

---

*Rapor sonu. Hiçbir dosya değiştirilmedi.*
