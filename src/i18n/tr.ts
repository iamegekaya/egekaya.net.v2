import type { Dictionary } from "./en";

/**
 * Turkish strings.
 *
 * Typed as `Dictionary`, so this file cannot fall behind `en.ts`: a key added
 * there and missed here is a compile error, not a page that quietly renders
 * English. Same reasoning as the sitemap drift guard — a translation nobody
 * checks is a translation that is already incomplete.
 *
 * Terminal-idiom strings (ROOT_USER@EGEKAYA, [SHELL_ACCESS], the 01 // 02
 * section numbers) stay in English on purpose. They read as machine output
 * rather than prose, and translating a shell prompt would break the conceit.
 */
export const tr: Dictionary = {
  nav: {
    home: "Ana Sayfa",
    about: "Hakkımda",
    security: "Güvenlik",
    photography: "Fotoğraf",
    contact: "İletişim",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    skipToContent: "İçeriğe geç",
    shellAccess: "[SHELL_ACCESS]",
    shellTagline: "Siber Güvenlik & Fotoğrafçılık",
    downloadCv: "CV'yi indir",
    switchToLight: "Açık temaya geç",
    switchToDark: "Koyu temaya geç",
    switchToTurkish: "Türkçe'ye geç",
    switchToEnglish: "Switch to English",
  },

  footer: {
    rights: "ROOT_USER. YALNIZCA ŞİFRELİ ERİŞİM.",
  },

  sidebar: {
    onThisPage: "Bu sayfada",
  },

  home: {
    metaDescription:
      "Ege Kaya — bilgi güvenliği ve fotoğrafçılık. Zero Trust altyapı, SecOps otomasyonu ve bir fotoğraf portföyü.",
    login: "Login: root",
    password: "Password: *********",
    prompt: "ROOT_USER@EGEKAYA:~$ whoami",
    loadingProfile: "> Profil yükleniyor...",
    identityConfirmed: "> Kimlik doğrulandı: Ege Kaya.",
    roleLabel: "> Rol:",
    secondaryProcess: "> İkincil süreç: Fotoğrafçılık.",
    accessGranted: "> Erişim verildi.",
    securityHeading: "01 // Güvenlik",
    photographyHeading: "02 // Fotoğraf",
    infrastructureTitle: "Altyapı & Güvenlik",
    visualPerspectives: "Görsel Bakışlar",
    viewArchitecture: "Mimariyi gör",
    portraitAlt:
      "Ege Kaya sahilde; üzerine yüz tanıma arayüzü bindirilmiş: başını çevreleyen SUBJECT_01 etiketli takip kutusu, siyah-beyaz kimlik kırpımı ve ID EGEKAYA, sosyal senkron oranı yüzde 43, etkileşim sıklığı seyrek, duygusal çıktı kontrollü yazan göstergeler.",
  },

  about: {
    metaTitle: "Hakkımda",
    metaDescription:
      "Ege Kaya'nın kişisel geçmişi, eğitimi ve ilgi alanları — 2003 Lüleburgaz doğumlu, bilgi güvenliği ve fotoğrafçılıkla uğraşıyor, İstanbul'da yaşıyor.",
    heading: "whoami",
    status: "[DURUM]: BİLGİ GÜVENLİĞİ LİSANS — YEDİTEPE ÜNİVERSİTESİ, 2022–2026",
    biographyHeading: "> ./biography.sh",
    biographyOne:
      "Merhaba! Adım Ege, 22 yaşındayım. 11 Temmuz 2003'te Kırklareli'nin Lüleburgaz ilçesinde doğdum. Sokakta futbol oynayarak, kâğıt ve misket oynayarak büyüyen son kuşağın bir parçasıyım.",
    biographyTwo:
      "İlk bilgisayarımla 2011'de tanıştım; o günden beri teknoloji hayatımın ayrılmaz bir parçası. Teknolojiye olan ilgim üniversitede derinleşti; kısacası teknolojiyle uğraşmayı, bir şeyler üretmeyi ve her gün yeni bir şey öğrenmeyi seviyorum. Bunun dışında Formula 1 takip ediyorum, Fenerbahçe tutuyorum, şehir ve müze gezmeyi seviyorum.",
    educationHeading: "Eğitim Geçmişi",
    education: {
      degree: "Bilgi Güvenliği Lisans",
      prep: "Hazırlık",
      highSchool: "Lise",
      middleSchool: "Ortaokul",
      elementary: "İlkokul",
      yeditepe: "Yeditepe Üniversitesi",
      bahcesehir: "Lüleburgaz Bahçeşehir Anadolu Lisesi",
      anatolian: "Lüleburgaz Anadolu Lisesi",
      lulemiddle: "Lüleburgaz Ortaokulu",
      luleelementary: "Lüleburgaz İlkokulu",
    },
    preparingHeading: "Preparing_For",
    preparingIntro: "Şu anda hazırlandığım sınavlar. Hiçbiri henüz alınmış değil.",
    inProgress: "[Devam ediyor]",
    preparing: {
      securityPlus: "Üreticiden bağımsız güvenlik temelleri.",
      btl1: "Uygulamalı savunma operasyonları: triyaj, adli bilişim, olay müdahalesi.",
      iso27001: "Bilgi güvenliği yönetim sistemleri.",
      ielts: "İngilizce dil yeterliliği.",
    },
    techStackHeading: "Tech_Stack",
    photographyCardTitle: "Fotoğrafçılık",
    photographyCardBody:
      "Görünmeyen ayrıntıları yakalamak. Sokak ve seyahat fotoğrafçılığına odaklanıyorum; ekrandan bir kaçış ve çevremdekilere dikkat kesilmenin bir yolu.",
    sections: {
      biography: "Biyografi",
      education: "Eğitim",
      preparing: "Hazırlandıklarım",
    },
  },

  photography: {
    metaTitle: "Fotoğraf",
    metaDescription:
      "Ege Kaya'nın fotoğraf denemesi ve portföyü. Kasım 2023'te Canon ile başladı, Sony A7M2'den geçti, şu an Fujifilm X-M5 + XC 15-45mm kullanıyor. 13 seçilmiş kare.",
    heading: "GALLERY_INDEX",
    subtitle: "[ Görsel veri yakalama ]",
    statusLabel: "> DURUM:",
    statusOnline: "[ÇEVRİMİÇİ]",
    storyTitle: "./story.sh",
    storyOne:
      "Fotoğraf benim için ekrandan bir tür kaçış. Günüm genelde bilgisayar başında geçiyor — makinemi alıp dışarı çıkmak, dolaşmak ve bir şeyleri fotoğraflamak gerçekten iyi geliyor.",
    storyTwo:
      "İlk fotoğraf makinemi, bir Canon Rebel T7'yi, 8 Kasım 2023'te aldım. Oradan bir Sony A7M2'ye geçtim ve şu an kullandığım Fujifilm X-M5'te karar kıldım. 1 Temmuz 2026'da kite bir Insta360 Luna Ultra ekledim — X-M5'in yerini alan değil, yanında duran bir gimbal kamera.",
    currentGear: "Mevcut Ekipman",
    openOfficialPage: "Resmî sayfayı aç",
    galleryHeading: "Fotoğraf Galerisi",
    galleryUnavailable: "Galeri şu an görüntülenemiyor. Lütfen birazdan tekrar bakın.",
    photoAlt: "Portföy fotoğrafı",
    equipment: {
      bodyNote: "Şu an kullandığım gövde.",
      lensNote: "X-M5 ile birlikte kullandığım lens.",
      gimbalNote: "Çift lensli bir gimbal kamera, 1 Temmuz 2026'da kite eklendi.",
    },
    sections: { story: "Hikâye", equipment: "Ekipman", gallery: "Galeri" },
  },

  security: {
    metaTitle: "Siber Güvenlik",
    metaDescription:
      "Zero Trust, hibrit Docker + native mimari, Cloudflare edge loglama, n8n + AI ile SecOps otomasyonu, Tailscale mesh VPN. Aktif Yatırım Bankası güvenlik stajyeri.",
    heading: "> ./SECURITY_PROFILE",
    intro:
      "Siber güvenlik benim için yalnızca bir ilgi alanı değil, disiplinli bir öğrenme süreci ve mimari bir tasarım yaklaşımı. Sistemleri derinlemesine anlamaya, zafiyetleri tespit etmeye ve Zero Trust ilkesi etrafında yapılar kurmaya odaklanıyorum — sistem yönetimi, trafik analizi, savunma operasyonları ve güvenlik otomasyonunun kesiştiği yerde.",
    activeSystemsHeading: "Aktif Kullandığım Sistemler",
    activeSystemsIntro:
      "Yönetim, geliştirme, simülasyon ve analiz için aktif olarak kullandığım ortamlar bunlar.",
    systemExperienceHeading: "Sistem Deneyimi",
    systemExperienceIntro:
      "Farklı davranışları ve dağıtım kalıplarını anlamak için birden çok masaüstü, sunucu ve güvenlik odaklı işletim sistemiyle çalıştım.",
    architectureHeading: "Teknik Altyapı & Mimari",
    projectsHeading: "Projeler",
    comingSoon: "[YAKINDA]",
    read: "[OKU]",
    openWriteUp: "Yazıyı aç",
    encrypted: "ŞİFRELİ",
    placeholderSummary:
      "CTF'lerden ve bağımsız araştırmalardan çıkan yazılar ve araçlar, hazır olduklarında burada yayımlanacak.",
    experienceLabel: "Deneyim",
    employer: "Aktif Yatırım Bankası A.Ş",
    role: "Bilgi Teknolojileri Güvenlik Stajyeri",
    period: "2 Temmuz 2025 – 27 Ağustos 2025",
    liveProduct: "Canlı ürün",
    omnisightBlurb:
      "Tasarlayıp geliştirdiğim kendi sunucunuzda çalışan ağ görünürlüğü ürününün kendi sitesi var; dokümantasyon, mimari notlar ve gizlilik sınırı orada tam olarak yazılı.",
    opensInNewTab: "(yeni sekmede açılır)",
    terminal: {
      init: "Güvenlik profili başlatılıyor...",
      compiling: "İlkeler derleniyor... [TAMAM]",
      loading: "Gerçek dünya deneyimi yükleniyor... [4 modül]",
      awaiting: "Yeni yazılar bekleniyor",
    },
    sections: {
      principles: "İlkeler",
      systems: "Sistemler",
      architecture: "Mimari",
      projects: "Projeler",
      experience: "Deneyim",
    },
  },

  securityContent: {
    activeSystems: [
      "Linux: Ubuntu (Sunucu ve İstemci Yönetimi)",
      "macOS: Geliştirme ve Analiz Ortamı",
      "Windows: 11 Pro (Kurumsal Yapı Simülasyonları)",
    ],
    osExperience: [
      "Güvenlik odaklı sistemler: Kali Linux, Parrot OS",
      "Sunucu ve masaüstü sistemler: CentOS, Fedora, Linux Mint, Windows 10 / 7 / Vista",
    ],
    principleLabels: {
      principle: "İlke",
      focus: "Odak",
      approach: "Yaklaşım",
      process: "Süreç",
    },
    principles: {
      zeroTrustDetail:
        "Örtük güven yerine doğrulama, segmentasyon ve denetimli erişim üzerine kurgu yapıyorum.",
      hybridTitle: "Hibrit Mimari",
      hybridDetail:
        "Performans kritik native servislerle izole konteyner iş yüklerini dengeliyorum.",
      edgeTitle: "Edge Görünürlüğü",
      edgeDetail: "Varsayım yerine trafik gözlemlenebilirliği, DNS hijyeni ve işe yarar loglama önemsiyorum.",
      secopsTitle: "SecOps Otomasyonu",
      secopsDetail:
        "Tekrar eden güvenlik işlerini olay tetiklemeli tarama, analiz ve raporlama akışlarına taşıyorum.",
    },
    architecture: {
      hybridTitle: "Hibrit Sunucu Yönetimi (Docker & Native)",
      hybridIntro:
        "Her servisi tek bir yapıya hapsetmek yerine, iş yükünün gerçek ihtiyacına göre optimize edilmiş bir dağılım kullanıyorum.",
      hybridBullets: [
        "Mikro servisler: Veritabanı, otomasyon ve medya servislerini izole Docker konteynerlerinde çalıştırıyorum.",
        "Web uygulamaları: cv.egekaya.net ve egekaya.net gibi performans kritik projeleri native bir Next.js ortamında barındırıyorum.",
      ],
      cloudflareTitle: "Cloudflare Edge Güvenliği & Özel Loglama",
      cloudflareIntro:
        "DNS kayıtlarını ve e-posta güvenlik politikalarını varsayılan ayarlara bırakmak yerine elle yönetiyorum.",
      cloudflareBullets: [
        "DNS ve e-posta güvenliği: A, CNAME, MX, TXT, SPF ve DMARC yapılandırmalarını kendim yönetiyorum.",
        "Cloudflare Tunnels: İç servisleri doğrudan port açma riskini almadan güvenli şekilde dışarı veriyorum.",
        "Özel HTTP trafik analizi: Hazır loglama araçlarına bağlı kalmak yerine Cloudflare Workers ile kendi izleme akışımı kurdum.",
        "Edge akışı: İstekler edge'de yakalanıyor, webhook ile sunucuma iletiliyor ve IP, metot, yol ve zaman damgası verisiyle yerelde arşivleniyor.",
      ],
      secopsTitle: "SecOps & Otomasyon (n8n + AI)",
      secopsIntro:
        "Güvenlik süreçlerini elle tekrardan uzaklaştırıp tutarlı çalışabilen olay tetiklemeli otomasyonlara taşıyorum.",
      secopsBullets: [
        "Sürekli keşif: Her gün otomatik bir Nmap döngüsü ortamdaki açık portları ve aktif servisleri haritalıyor.",
        "Otomatik zafiyet analizi: Nuclei ve OWASP ZAP, tespit edilen servislere karşı daha derin taramalarla akışı sürdürüyor.",
        "AI destekli raporlama: Bulgular diskten okunuyor, AI ajanları tarafından analiz ediliyor ve önemli bir şey varsa Telegram ya da e-posta bildirimi olarak bana iletiliyor.",
      ],
      networkTitle: "Ağ Güvenliği & Erişim",
      networkIntro:
        "Erişim modelim geniş açıklık yerine denetimli bağlanabilirlik ve filtreleme üzerine kurulu.",
      networkBullets: [
        "Mesh VPN: Sunuculara ve servislere her yerden yerel ağdaymışım gibi erişmek için Tailscale kullanıyorum.",
        "DNS filtreleme: Ağ genelinde reklam ve izleyici trafiğini Pi-hole ile engelliyorum.",
      ],
    },
    internship: {
      socTitle: "SOC İzleme & SIEM",
      socDetail:
        "Wazuh platformunda günlük güvenlik olaylarını izledim; anomali tespiti için güvenlik duvarı, WAF ve uç nokta loglarını analiz ettim.",
      threatTitle: "Tehdit Analizi",
      threatDetail:
        "Alarmları inceleyip yanlış pozitifleri gerçek pozitiflerden ayırdım; IP ve hash itibar kontrolleri için VirusTotal gibi tehdit istihbaratı araçlarını kullandım.",
      policyTitle: "Politika Optimizasyonu",
      policyDetail:
        "Alarm yorgunluğunu azaltmak için Wazuh kural setlerini File Integrity Monitoring (FIM), Rootcheck ve zararlı yazılım tespiti tarafında inceltme çalışmalarına katkı verdim.",
      reportingTitle: "Raporlama",
      reportingDetail:
        "OWASP AI Top 10 ve yükselen tehditler üzerine teknik raporlar araştırıp güvenlik ekibine sundum.",
    },
    projects: {
      omnisightSummary:
        "Kendi sunucunuzda çalışan, SIEM yönelimli bir ağ görünürlüğü ürünü; tek bir kısıt etrafında tasarlandı: yalnızca metadata, asla içerik. Mimari, taahhüt ettiğim sınırlar ve bunların maliyeti.",
      omnisightTags: ["Mimari", "Go · Python · React", "Tasarımdan gelen gizlilik"],
      incidentSummary:
        "Sertleştirilmiş bir lab, 35 saat boyunca ajan telemetrisini reddetti ve bu sırada tüm sağlık sinyalleri yeşil kaldı. İzlemenin kaçırdığı şey, hatanın kendisinden daha önemliydi.",
      incidentTags: ["Olay analizi", "Ağ", "Tespit boşluğu"],
    },
  },

  omnisight: {
    metaTitle: "OmniSight",
    metaDescription:
      "Tek bir kısıt etrafında kurulmuş, kendi sunucunuzda çalışan, SIEM yönelimli bir ağ görünürlüğü ürünü: yalnızca metadata, asla içerik. Mimari, taahhüt ettiğim sınırlar ve bunların maliyeti.",
    backToProfile: "< ./SECURITY_PROFILE",
    heading: "> ./OMNISIGHT",
    intro:
      "Kendi sunucunuzda çalışan, uç nokta ağ görünürlüğü ve SIEM yönelimli bir ürün: bir uç nokta ajanı, yerel bir sunucu, bir operatör konsolu, kurulum paketleri ve lisans ile güncelleme için bir bulut kontrol düzlemi. İlginç olan büyüklüğü değil. İlk satırı yazmadan önce taahhüt ettiğim sınırlar ve onları tutmanın maliyeti.",
    roleMeta: "Rol: tek tasarımcı ve geliştirici",
    stackMeta: "Go · Python · React · Linux",
    statusMeta: "Durum: geliştirme aşamasında",
    whatItDoesHeading: "Ne yapıyor",
    whatItDoesBody:
      "Yönetilen uç noktalardaki ajanlar; bağlantı metadatasını, yazılım envanterini ve sistem metriklerini müşterinin kendi donanımında çalıştırdığı bir sunucuya bildiriyor. Sunucu bunları saklıyor, üzerinde tespit çalıştırıyor, kurulu yazılımları kamuya açık zafiyet verisiyle eşleştiriyor ve arama, alarm triyajı ile raporlama için bir operatör konsolunu besliyor.",
    dataFlowAlt:
      "Dört aşamalı akış: uç nokta ajanları metadata, envanter ve metrik topluyor; müşterinin kendi OmniSight sunucusu saklıyor ve tespit ediyor; operatör konsolu sorguluyor; raporlar ve alarmlar e-postaya ve müşterinin kendi webhook'una gidiyor.",
    dataFlowCaption:
      "> Topla, sakla ve tespit et, incele, bildir. Düz yollar her zaman açık. Kesikli yollar yalnızca operatör yapılandırdığında var.",
    components: {
      agent: "Uç nokta ajanı",
      agentDetail: "Go. Ağ metadatası, envanter, heartbeat, toplu metrikler.",
      server: "Yerel sunucu",
      serverDetail: "Python API, ilişkisel depo, RBAC, denetim kaydı, tespit, raporlama.",
      console: "Operatör konsolu",
      consoleDetail: "React. Kontrol paneli, olay arama, alarm triyajı, zafiyetler.",
      controlPlane: "Kontrol düzlemi",
      controlPlaneDetail: "Lisanslama, güncelleme dağıtımı, yayılım durumu, toplu rapor aktarımı.",
      vulnService: "Zafiyet servisi",
      vulnServiceDetail: "CVE akışı senkronizasyonu ve envantere karşı sürüm farkında eşleştirme.",
      installers: "Kurulum ve paketleme",
      installersDetail: "macOS ve Linux kurulum, güncelleme ve kaldırma akışları.",
    },
    boundariesHeading: "Üç sınır",
    boundariesIntro:
      "Bir izleme ürünü, yapısı gereği ağdaki en geniş erişime sahip şeydir. Bu onu bir araç olduğu kadar bir yükümlülük de yapar; cevaplanmaya değer tasarım soruları da onun bilerek neyi yapmayı reddettiğiyle ilgilidir.",
    boundaries: {
      metadataTitle: "Sözleşme olarak yalnızca metadata",
      metadataDetail:
        "Paket içeriği, istek gövdesi, başlık, çerez, çözülmüş TLS, komut satırı, uç nokta dosyası veya kimlik bilgisi yok. Bu yalnızca dokümanda değil, ürünün sözleşme metninde yazılı — dolayısıyla sonradan genişletmek bir özellik anahtarı değil, düzeltme sürecini gerektiren sözleşmesel bir değişiklik.",
      outboundTitle: "Yalnızca dışa doğru",
      outboundDetail:
        "Bulut hiçbir zaman müşteri ağına doğru bağlantı açmaz. Her alışverişi müşterinin sunucusu başlatır: lisans kontrolleri, güncelleme sorguları, aktarım gönderimleri. Benim altyapımın ele geçirilmesi, saldırgana içeri doğru hiçbir yol vermez.",
      failClosedTitle: "Her yerde fail-closed",
      failClosedDetail:
        "E-posta aktarımı, izin listesinde olmayan bir alıcıyı kuyruğa almak yerine reddeder. Zafiyet eşleştirmesi bir sürümü çözemediğinde tahmin yürütmeyi reddeder. Çalışma zamanı kapıları, eksik çalışmaktansa hiç başlamamayı seçer.",
    },
    overviewAlt:
      "Müşterinin kendi altyapısı — uç nokta ajanları, kendi OmniSight sunucusu ve operatör konsolu — tek bir sınırın içinde duruyor. Yönetilen OmniSight servisleri bu sınırın dışında; yalnızca lisans, güncelleme ve yazılım sürümü isteklerini taşıyan, dışa doğru kesikli bağlantılarla erişiliyor.",
    overviewCaption:
      "> Sınırı geçen her ok dışarı bakıyor. Benim altyapımdan müşteri ağına doğru içeri giden bir yol yok.",
    dataGoesHeading: "Veri gerçekte nereye gidiyor",
    dataGoesBody:
      "Telemetri müşterinin sunucusunda kalır. Benim altyapıma geçen şey kısa ve bilinçli bir listedir; listedeki her madde, o özellik onsuz imkânsız olduğu için oradadır — zafiyet eşleştirmek için yazılım adları ve sürümleri, rapor iletmek için toplu özetler, lisans ve güncelleme istekleri. İki liste arasındaki asimetri, tasarımın kendisidir.",
    boundaryCaption:
      "> Sol: hiçbir zaman çıkmayan her şey. Sağ: çıkabilecek olanlar, o da yalnızca yapılandırıldığında.",
    decisionsHeading: "Savunulmaya değer iki karar",
    restTitle: "Kalıcı veri REST üzerinden gider, asla soket üzerinden",
    restBodyOne:
      "Konsol canlı güncellenir; bu genelde veriyi WebSocket üzerinden itmek demektir. Ben hiç içerik taşımayan bildirimler itiyorum — bir şeyin değiştiğine dair bir sinyal; ardından tarayıcı kimlik doğrulamalı REST yolundan yeniden çekiyor. Bu daha fazla iş ve fazladan bir gidiş-dönüş demek. Ama aynı zamanda soketin, veriyi okumanın daha az denetlenen ikinci bir yolu hâline gelmemesi ve yetkilendirmenin tam olarak tek bir yerde uygulanması demek.",
    restBodyTwo:
      "Ayrıca yazdığım lab kesintisi bu kararın karşı ağırlığı: soket ve REST aynı arıza alanını paylaşmadığı için, REST ingest tamamen engellenmişken soket sağlıklı bildirmeye devam etti. İkisini ayırmak bana daha temiz bir yetkilendirme hikâyesi kazandırdı ve bir izleme kör noktasına mal oldu. İkisi de doğru.",
    withdrawTitle: "Kendi sürümümü geri çektim",
    withdrawBody:
      "Kendi kurulum paketimin güvenlik incelemesinde, üzerinden geçip yayına devam etmenin savunulamayacağı kadar ciddi bir kusur buldum. Sessizce ileriye yama geçmek yerine yayımlanmış paketi geri çektim, sorunu kaynağında düzelttim ve düzgün şekilde yeniden derlenip incelenene kadar yayımlamadım. Eskisinin üzerini örtmek için yeni sürüm yayımlamak, eskisini makinelerde kurulu bırakır; geri çekmek bırakmaz.",
    differentlyHeading: "Neyi farklı yapardım",
    differentlyOne:
      "Dokümantasyonun yapısız büyümesine izin verdim. Her zaman yüklenen küme sonunda on binlerce token'a ulaştı; çünkü üç ayrı doküman aynı sürüm geçmişinin kendi kopyasını biriktirmişti ve gerçekten kullanılamaz hâle geldi — hem başkaları hem benim için. Düzeltmek, bugünü anlatan dokümanları geçmişi anlatan bir changelog'dan ayırmak ve bu ayrımı bir gelenekle değil bir kontrolle zorunlu kılmak demekti.",
    differentlyTwo:
      "Genel ders, tekrar tekrar öğrendiğim şey: kimsenin ölçmediği kural, zaten çiğnenmiş kuraldır. Bu sayfadaki her sınırın, aşıldığında bozulan bir karşılığı var — bir kapı, bir test, bir betik — çünkü yalnızca niyet olarak var olanlar tutmadı.",
    lessonLine: "> Önce reddedeceklerini tasarla. Özellikler onların bıraktığı şekle uyar.",
    lessonBody:
      "Ürünün asla neyi toplamayacağına erken karar vermek, sonraki kararların çoğunu kolaylaştırdı; çünkü içerik gerektiren hiçbir şey masada değildi.",
    backLink: "< Güvenlik profiline dön",
    readIncident: "Olay incelemesini oku >",
  },

  incident: {
    metaTitle: "Sessiz Ingest Kesintisi",
    metaDescription:
      "Sertleştirilmiş bir ev laboratuvarı 35 saat boyunca ajan telemetrisini reddetti ve bu sırada tüm sağlık sinyalleri yeşil kaldı. Kök neden, izlemenin bunu neden kaçırdığı ve çıkardığım kural.",
    backToProfile: "< ./SECURITY_PROFILE",
    heading: "> ./SILENT_INGEST_FAILURE",
    intro:
      "Sertleştirilmiş lab ortamım 35 saat boyunca her ajan isteğini reddetti. Hiçbir şey alarm vermedi ve herkesin bakacağı tek sağlık sinyali bu süre boyunca yeşil kaldı. Ağ hatası bu işin küçük yarısıydı. Asıl bulgu izleme boşluğuydu.",
    roleMeta: "Rol: tek operatör",
    dateMeta: "2 – 3 Ağustos 2026",
    statusMeta: "Durum: çözüldü",
    glance: { undetected: "Fark edilmeden", denied: "Reddedilen istek", alerts: "Tetiklenen alarm" },
    symptomHeading: "Belirti",
    symptomBody:
      "Lab sunucusuna giden her istek nginx'ten 403 dönüyordu. Kimse fark etmeden önce 23.000'den fazla reddedilme birikti ve bu durum bir izleyicinin alarm vermesiyle değil, benim konsola giriş yapamamamla ortaya çıktı.",
    invisibleHeading: "35 saat boyunca neden görünmez kaldı",
    invisibleIntro:
      "Önemsediğim kısım bu. Kendini belli eden bir yanlış yapılandırma bir zahmettir. Sağlıklı görünen bir panelin arkasına saklanan ise bir tespit sorunudur — ve bu kadar iyi saklanabilmesi için üç ayrı boşluğun aynı hizaya gelmesi gerekti.",
    causes: {
      noSignalTitle: "Kaçırılacak bir başarı sinyali yoktu",
      noSignalDetail:
        "nginx bu profilde erişim logu üretmiyor. Sağlıklı isteklere dair hiçbir kayıt yoktu, dolayısıyla yokluklarını ne biri ne bir şey fark edebilirdi.",
      noWatchTitle: "Reddedilme oranını kimse izlemiyordu",
      noWatchDetail:
        "Reddedilmeler yazılıyordu. Ne bir eşik, ne bir alarm, ne bir pano onlara bakıyordu. Kanıt en baştan beri oradaydı ve kimse ona bakmıyordu.",
      misleadingTitle: "Yeşil kalan tek sinyal, en yanıltıcı olanıydı",
      misleadingDetail:
        "Kesintiden iki gün önce açılmış bir metrik WebSocket'i boyunca açık kaldı. Hiç yeniden bağlanmadığı için bozuk yola bir daha hiç girmedi. Kalıcı ingest tamamen engellenmişken “ajan ayakta mı” kontrollerinin hepsi sağlıklı dönmeye devam etti.",
    },
    rootCauseHeading: "Kök neden",
    rootCauseOne:
      "Lab, mesh VPN adresine göre yetkilendiriyor. Her nginx location'ı açık bir allow listesi ve kapanışta bir deny all taşıyor. Bir peer'ın paketi web konteynerine, host'un mesh adresinden bir bridge ağının içindeki konteynere DNAT edilerek ulaşıyor ve ardından o bridge'e forward ediliyor.",
    rootCauseTwo:
      "Mesh arayüzünde forward edilmiş trafik olarak geldiği için Tailscale onu 0x40000 ile işaretliyor ve ts-postrouting zinciri bu işaret üzerinden masquerade yapıyor. Kaynak adres bridge ağ geçidiyle değiştiriliyor. nginx de ağdaki her istemci için tek ve aynı adresi görüyor ve hiçbir allow kuralıyla eşleşmiyor.",
    rootCauseThree:
      "Önemli olan ayrım şu: ACL hiçbir zaman atlatılmadı. Yetkilendirdiği bilgi, ona ulaşmadan önce silindi. Arıza açık değil kapalı yönde gerçekleşti — ki bu doğru arıza yönü, ve tam da bu yüzden hiçbir şey endişe verici görünmedi.",
    rootCauseFour:
      "Tetikleyici, rutin gözetimsiz güncelleme sırasında gerçekleşen bir servis yeniden başlatmasıydı. İlk reddedilme 2 dakika 46 saniye sonra geldi. Masquerade'in sebep olduğunu kaldırarak kanıtlayabiliyorum; yeniden başlatmanın tam olarak neyi değiştirdiğini ise hiç tespit edemedim ve bunu daha derli toplu bir final uydurmaya tercih ederim.",
    fixHeading: "Düzeltme ve doğrulama",
    fixOne:
      "Alt ağ rotaları için kaynak NAT'ı kapatmak, sorunlu masquerade kuralını kaldırıyor. Varsayımla değil etkiyle doğruladım: reddedilmeler durdu; keepalive kapalı açılan üç yeni bağlantı — yani mevcut bir oturuma binemeyecek olanlar — 200 döndü, bu da yeni bağlantıların yeniden gerçek peer adresini taşıdığını kanıtladı; 12 dakikalık bir bekleme testinde sıfır reddedilme ve 12 dakikanın 12'sinde ingest kaydedildi.",
    fixTwo:
      "Bu ayar, sertifikalı temel yapılandırmamdan bilinçli bir sapma; o yüzden öyle kayıt altına alındı. Yeniden başlatmalara dayanıyor ama mesh'i farklı bayraklarla ayağa kaldırmak onu sessizce geri alır.",
    changedHeading: "Sonucunda ne değişti",
    changedOne:
      "Çalışma zamanı başlangıç kapısına iki yarımlı bir kontrol eklendi. Biri, hiçbir masquerade kuralının gelen peer adresini değiştiremeyeceğini ve beklenen DNAT yayınının var olduğunu doğruluyor. Diğeri, yakın zamanlı hiçbir reddedilmenin bridge ağ geçidinden kaynaklanmadığını doğruluyor — bu kesintinin bıraktığı tam parmak izi. Bir test profili hem iki yarımı hem çağrı noktasını koruyor, böylece kontrol sessizce çağrılmaz hâle gelemiyor.",
    changedTwo:
      "Kapıyı tetikleyiciye değil parmak izine karşı yazdım, bilerek. Yeniden başlatmanın neyi değiştirdiğini hâlâ bilmiyorum; o yüzden o belirli yeniden başlatmayı gözleyen bir kontrol, beni bir arıza sınıfının yalnızca tek bir nedenine karşı korurdu.",
    ruleHeading: "Çıkardığım kural",
    ruleLine: "> Uzun ömürlü bir bağlantıdaki canlılık, istek yolunun çalıştığının kanıtı değildir.",
    ruleBody:
      "Kurulmuş bir akış, her mesajda ACL'e karşı yeniden değerlendirilmez. İstek başına çalışan bir yol değerlendirilir. İkisi aynı arıza alanını paylaşmaz, dolayısıyla biri diğerinin sağlık kontrolü yerine geçemez — ve iyi görünmeye devam eden, hep akış olanıdır.",
    ruleAftermath:
      "İkinci ve daha rahatsız edici ders: bu sistemin hiçbir yerinde bir başarı sinyalim yoktu. Erişim loglamasını kapatmak tek başına makul bir sertleştirme tercihi, ama alarm yokluğuyla birleşince sağlıklı ile tamamen bozuk olanın aynı gözlemlenebilir çıktıyı ürettiği bir ortam bıraktı. Bu takası bir daha yapmaktansa log hacmine katlanırım.",
    backLink: "< Güvenlik profiline dön",
  },

  contact: {
    metaTitle: "İletişim",
    metaDescription:
      "Bilgi güvenliği çalışmaları, fotoğrafçılık veya genel sorularınız için Ege Kaya ile iletişime geçin.",
    heading: "// INITIATE_CONTACT",
    intro:
      "Güvenli iletim hatları açık. Güvenlik danışmanlığı, fotoğraf iş birlikleri ya da genel sorular için aşağıdaki terminali kullanabilir veya doğrudan şu adrese yazabilirsiniz:",
    onRequest: "[TALEP ÜZERİNE]",
    pgpTitle: "PGP Açık Anahtarı",
    pgpBody:
      "Güvenlik açığı bildirimleri için şifreli haberleşme isterseniz, güncel açık anahtarı formdan veya yukarıdaki e-postadan talep edin.",
    externalNodes: "External_Nodes",
    form: {
      nameLabel: "TARGET_ID (İsim)",
      namePlaceholder: "Adınızı girin...",
      emailLabel: "RETURN_VECTOR (E-posta)",
      emailPlaceholder: "Dönüş adresini girin...",
      messageLabel: "PAYLOAD (Mesaj)",
      messagePlaceholder: "Mesajınızı buraya yazın...",
      awaiting: "> Girdi bekleniyor...",
      transmitting: "> İletiliyor...",
      submit: "Çalıştır / Gönder",
      submitting: "Gönderiliyor...",
      successLabel: "Başarılı:",
      successBody: "Mesajınız iletildi. En kısa sürede size döneceğim.",
      errorLabel: "Hata:",
      genericError: "Mesajınız gönderilirken bir sorun oluştu. Lütfen birazdan tekrar deneyin.",
    },
  },
};
