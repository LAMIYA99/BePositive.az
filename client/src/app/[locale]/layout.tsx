import type { Metadata } from "next";
import type { NextLayoutIntlayer } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";

import Layout from "@/Layout";
import AosInit from "../aos-init";
import PushNotificationClient from "@/components/PushNotificationClient";

const SITE_URL = "https://bepositive.az";
const SITE_NAME = "Be Positive Advertising Agency";
const DEFAULT_DESCRIPTION =
  "Be Positive Advertising Agency — We bring color, creativity, and strategy to your brand. From social media to branding, we craft stories that make you stand out globally.";
const DEFAULT_KEYWORDS = [
  "bepositive.az, be positive, alamdar manafov, ələmdar manafov, be positive advertising agency, advertising agency ads,360 advertising agency, advertising definition,advertising facebook, advertising instagram, advertising tiktok,advertising google,advertising jobs, advertising logo,advertising manager,advertising on instagram,advertising on facebook, advertising on google,advertising on linkedin,advertising tiktok,advertising website,advertising with google,advertising agency ads, positive studio , be positive studio, bepositive studio, marketinq expert, marketinq specialist, marketinq consultant , marketing consultant, marketing spcialist, marketing consultation, business consultation, seo audit, seo analyzer, seo agency, seo advertising, seo checker, seo definition, seo expert, seo google, seo guk, seo in guk, seo in marketing, seo in business, seo keywords, seo keywords for instagram, seo marketing, seo marketing course, seo meaning in digital marketing, seo near me, seo optimization, seo optimization tools, seo optimized content, seo optimization checker, seo on instagram, seo on youtube, seo price, seo ranking, seo report, seo ranking checker, seo site checkup, seo services, seo strategy, seo search engine optimization, seo tools, seo taiji, seo tools free, seo tester online, seo title generator, seo updates, seo website checker, seo what is it, reklam blocker, content creator ai, content creator agency, content creator ai free, content creator academy, content creator bio for instagram, content creator book, content creator business, content creator cv, content creator company, content creator freelance, content creator facebook, content creator for instagram, content creator for social media, content creator for tiktok, content creator ideas, ontent creator instagram, content creator jobs, content creator linkedin, content creator manager, content creator needed, content creator on youtube, content creator portfolio, content creator salary, content creator skills, content creator tiktok, content creator tools, content creator talent agency, campaign analytics, campaign ads, campaign banner, campaign company,bepositive.az, be positive, ələmdar manafov, reelslərin çəkilməsi, reklam agentliyi, reklamların çəkilməsi, contentlərin yazılması, sosial şəbəkə, reklam, agentlik, sosial şəbəkə reklam, be positive reklam agentliyi, websaytların qurulması, seo xidmətləri, motion design, motion video, meta reklam, facebook reklam, youtube reklam, google reklam, reklam ajansı, baki reklam agentliyi,dövlət reklam agentliyi,reklam agentliyi qiymetleri,reklam agentliyi qaynar xett,reklam agentliyi vakansiya, pozitiv studio , be positive studio, bepositive studio, fotosessiya, video çəkiliş, smm , sosial media manager, smm təlim ,mobiloqrafiya , mobiloqrafiya təlim, reklam təlim, meta ads təlim, pulsuz smm , pulsuz smm təlim, marketinq konsultasiya, marketinq konsultant, biznes konsultant, biznes konsultiya, bazar araşdırması, rəqib analizi, brendinq, brend qurma , marka qurma , brendinq strategiyası, brend yaratmaq, brend strategiyası, seo xidmətləri, seo ekspert,  seo nedir, seo nədir, seo xidmet, seo xidmət, seo strategiya, seo təcrübə proqramı, seo az, seo azerbaycan, seo azərbaycan, seo azerbaijan, seo baku, seo baki, seo bakı, seo xidməti, seo xidmeti, reklam ajansları, reklam dizayn, reklam post, reklam poster, reklam design, reklam dünyası, reklam engelleyici, reklam engelleyici dns, reklam engelleme, reklam engelleme dns, reklam fikirleri, reklam consultant, reklam konsultant, reklam fotoğrafçılığı, reklam çəkiliş, reklam foto, reklam fotoqraf, reklam görseli hazırlama, reklam hesabı kapatıldı, reklam hesabı kapatıldı instagram, reklam hazırlama, reklam hizmetleri, reklam hesabı oluşturma, reklam haqqında dövlət rüsumu, reklam hileleri, reklam isleri, reklam iş, reklam işi, reklam işləri, reklam izleyerek para kazanma, reklam izleyerek pul qazanmaq, reklam ingilizce, reklam ingilizcesi, reklam izle para kazan, reklam kapatma, reklam kaldırma, reklam lovhesi, reklam lövhələri, reklam lövhə, reklam lövhəsi, reklam logo, reklam led ekran, reklam logoları, reklam logosu yapma, reklam meneceri, reklam merkezi, reklam nədir, reklam nedir, reklam ne demek, reklam nasıl engellenir, reklam oluşturma, reklam panosu, reklam qurğularına texniki tələblər, reklam qurğuları, reklam sloganları, reklam studio, reklam stratejileri, reklam tv, reklam radio, reklam səs, reklam ses, reklam uzmanı, reklam menecer, reklam uzmanı, reklam videosu hazırlama, reklam videoları, reklam web sitesi, reklam yöneticisi, reklam yönetmeliği, reklam yazıları, reklam yazarlığı, content creator kurs, content creator vakansiya,social media marketing near me,content management,advertising services,marketing companies,brand marketing,advertising campaign,marketing services,website development,media buying agency,marketing website,marketing campaign,creative agency,advertising business,marketing ads,digital advertising,branding agency,digital marketing strategy,digital agency,digital marketing services,ads agency,digital media marketing,digital marketing business,digital marketing companies,marketing agency services,digital advertising companies,marketing agency website,digital marketing website,social media company,social media ad agency,social media advertising companies,social media management companies,starting a digital marketing agency,social media content agency,content creation companies,video marketing agency,growth agency,socila media,paid media agency,advertising in marketing,paid advertising agency,digital marketing companies near me,social media agency near me,digital marketing agency near me,paid marketing agency,digital marketing agency website,digital marketing agency in us,paid ads agency,brand advertising, yapay zeka ile reklam yapma, meta reklam eğitimi, online marketing healthcare, meta instagram reklam verme, customer marketing, tiktok social media marketing, instagram hikaye reklamı nasıl verilir, sosyal medya marketing, dijital pazarlama, marketing a maintenance company, website promotion services, google da reklam verme, azeri reklam, satış pazarlama teknikleri, marketing company, satış dersleri, reklam duzeltmek ucun proqram, best ways to advertise online store, tiktok affiliate marketing, meta ile reklam verme, digital marketing services, instagramda reklam qoymaq, maxi az reklam, sayt yaratmaq dizayn etmek, meta reklam stratejileri, pr reklam, top digital marketing agencies, online digital marketing, instagram sponsorlu reklam nece vere bilerem, ilan sitesi kurma, influencer marketing tiktok, pazarlama,reklam ajansları, web site tanıtım videosu hazırlama, online marketing, marketing agency, sosyal medyada reklam, web site hazirlama, instagram meta reklam verme, meta reklam stratejileri, içerik üreticisi nasıl olunur, azerbaycan reklam, online digital marketing, reklam yerləşdirmək, reklam hazirlamaq, reklamcılık, advertising on the web, instagramda reklam yerləşdirmək, site yaratmak, digital marketing, реклама в инстаграме, email marketing nasıl yapılır, reklam ads, prep marketing, kontakt reklam, reklam hesabı aktifleştirme, instagram sponsorlu reklam taktikleri, tiktok marketing, instagrama reklam vermek, digital marketing websites,web sayt yaratmaq ,reklam,sosyal medya içerik üretimi,sponsorlu reklam,affiliate marketing nasıl yapılır,facebooktan instagrama reklam verme,profesyonel reklam,getcontact reklam,smm nedir,instagramda sponsor reklam nasıl yapılır,b2b email marketing,web sitesi nasıl kurulur,greenleaf marketing plan,internet sitesi nasıl kurulur,instagramda reklam verme,meta reklam verme,toptan satış teknikleri,reklam hesabı oluşturma,site kurma,satış teknikleri eğitimi,satış teknikleri,reklami nece dayandirmaq olar,reklamlar,online marketing companies,marketinq şirkətləri,ınternet sıtesı,satiş pazarlama ve ikna teknikleri,internet marketing,instagram online satış nasıl yapılır,instagrama reklam vermek,как работает таргет реклама,reklam videosu hazırlama,web dizayn kurslari,tiktok sponsorlu reklam,sosyal medya içerik üretimi eğitimi,network marketing,pulsuz sayt yaratmaq,site reklamlari,embawood reklam,meta reklam yönetimi,диджитал маркетинг,sosyal medya reklam,reklam otomasyonu,tiktok da reklam vermek,tiktok digital marketing,best reklam,reklam çekimi,online marketing classes,çanakkale reklam,digital marketing products and services,network marketing,kolay web site yapımı,sponsorlu reklam nasıl verilir,marketing software,как запустить рекламу в instagram,tiktok digital marketing,smm kurslari,tiktok for business,meta business instagram reklam verme,nm akademi,instagram pazarlama teknikleri,reklam hazırlama sitesi,vrm group,dijital medya ajans,internet sitesi nasıl kurulur ücretsiz,tiktok reklam verme,olive ads,instagram reklam verme,marketing agency services,meta ads agency,duygusal reklamlar,kurs reklamı nasıl yapılır,bolt reklam,web dizayner,be positive agency,instagram reklam verme taktikleri,digital marketing online shopping,business suite reklam verme,affiliate marketing tiktok,instagram reklam verme ücretsiz,telefona gələn reklamı necə bağlamaq olar,reklan,sosyal medya reklam eğitimi,meta da reklam verme,brand stretching,instagram da reklam verme,google marketing,marketing agency,ınstagram da sponsorlu reklam nasıl verilir,reklam işleri,top digital marketing companies in the world,web design,digital marketing,reklam afişi hazırlama,email marketing,digital marketing agency,youtube reklamlari baglamaq,instagram üzerinden reklam verme,içeriklerin,e ticaret sitesi yapımı ücretsiz,fashion marketing,meta reklam nasıl verilir,google sayt yaratmaq,affiliate marketing program,videoya baxaraq pul qazanmaq,tiktok ta reklam vermek,ınstagram reklam verme,instagram reklam borcu ödeme,site tasarımı nasıl yapılır,best ecommerce platform to launch an ecommerce store,instagram reklamı nasıl verilir,tiktok affiliate marketing 2025,içerik üretmek,vrv marketing,instagram satış arttırma,digital marketing companies,pazarlama teknikleri,email marketing 2025,business marketing,online advertising companies,simplilearn digital marketing,internet sitesi adresi,azerbaijan reklam,scorpion business,reklam inceleme,digital reklam,sosyal medya pazarlama,site oluşturma,nasıl site yapılır,film sitesi kurmak,içerik üreticisi,marketing nedir,ads manager реклама в инстаграм,reklam isleri,ınstagram da reklam vermek,advertising online store,metadan instagram reklamı,telefona tez tez reklam gəlir,dropshipping nasıl yapılır,как запустить таргетированную рекламу в инстаграм,internet marketing,instagramda reklam nasil yapilir,instagram en etkili reklam,instagramda nece reklam etmek olar,instagram reklam verme,instagram sponsorlu reklam nasıl yapılır,business manager instagram reklam verme,instagram reklam,instagram reklam verme meta,satiş teknikleri eğitimleri,digital marketing dersleri,yaratıcı reklamlar,instagram sponsorlu reklam nece vere bilerem,retail digital marketing agency,hostinger web sitesi kurma,web design products,reklamcılık nasıl yapılır,sosyal medya yönetimi,instagram üzerinden satış,meta business suite reklam verme,meta business instagram reklam verme,ads manager reklam verme,business marketing,facemark,tiktok sponsorlu reklam nasıl yapılır",
];
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}`;

  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS.join(", "),
    authors: [{ name: "CLife.az agency" }],
    metadataBase: new URL(SITE_URL),
    other: {
      "google-adsense-account": "ca-pub-9796293068418979",
      "revisit-after": "1 days",
    },
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en`,
        az: `${SITE_URL}/az`,
      },
    },
    openGraph: {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: canonical,
      siteName: SITE_NAME,
      locale,
      type: "website",
      images: [
        {
          url: "/Logo.png",
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: ["/Logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <div lang={locale} dir={getHTMLTextDir(locale)} className="min-h-screen">
      <AosInit />
      <Layout>{children}</Layout>
      <PushNotificationClient />
    </div>
  );
};

export default LocaleLayout;
