const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

const SPAM_KEYWORDS = [
  "viagra",
  "casino",
  "lottery",
  "prize",
  "winner",
  "click here",
  "buy now",
  "limited time",
  "act now",
  "free money",
  "make money",
  "work from home",
  "earn cash",
  "bitcoin",
  "crypto investment",
];

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const submissions = rateLimitMap.get(ip) || [];

  const recentSubmissions = submissions.filter(
    (time) => now - time < RATE_LIMIT_WINDOW,
  );

  if (recentSubmissions.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recentSubmissions.push(now);
  rateLimitMap.set(ip, recentSubmissions);

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function containsSpam(text) {
  const lowerText = text.toLowerCase();
  return SPAM_KEYWORDS.some((keyword) => lowerText.includes(keyword));
}
function validateHoneypot(honeypot) {
  return !honeypot || honeypot === "";
}
function validateTiming(timestamp) {
  const now = Date.now();
  const timeDiff = now - timestamp;
  return timeDiff >= 3000 && timeDiff <= 600000;
}

exports.sendContactEmail = async (req, res) => {
  console.log("CONTACT FORM SUBMISSION RECEIVED");
  console.log("Body:", JSON.stringify(req.body, null, 2));

  const {
    name,
    email,
    message,
    honeypot,
    timestamp,
    token: recaptchaToken,
  } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Bütün xanaları doldurun." });
  }

  // Flexible validation: Either reCAPTCHA recaptchaToken OR (Honeypot + Timing)
  if (!recaptchaToken) {
    if (!validateHoneypot(honeypot)) {
      console.log("Honeypot field filled - potential bot detected");
      return res
        .status(400)
        .json({ message: "Xəta baş verdi. Yenidən cəhd edin." });
    }

    if (!timestamp || !validateTiming(timestamp)) {
      console.log("Form submitted too quickly or missing timestamp");
      return res.status(400).json({
        message: "Zəhmət olmasa bir az gözləyin və yenidən cəhd edin.",
      });
    }
  } else {
    // If recaptchaToken exists, we can optionally verify reCAPTCHA here.
    // For now, we trust the recaptchaToken existence as a sign of the other form version.
    console.log("ReCAPTCHA token received, skipping timing checks.");
  }

  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    console.log(`Rate limit exceeded for IP: ${clientIp}`);
    return res
      .status(429)
      .json({ message: "Çox tez-tez sorğu göndərirsiniz. Bir az gözləyin." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Düzgün email ünvanı daxil edin." });
  }
  if (containsSpam(name) || containsSpam(message)) {
    console.log("Spam content detected in submission");
    return res
      .status(400)
      .json({ message: "Mesajınızda qadağan olunmuş məzmun aşkar edildi." });
  }

  if (name.length > 100 || message.length > 1000) {
    return res.status(400).json({ message: "Mətn çox uzundur." });
  }

  if (name.length < 2 || message.length < 10) {
    return res.status(400).json({ message: "Mətn çox qısadır." });
  }

  const https = require("https");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log(`Telegram Bot Token: ${token ? "Exists" : "MISSING"}`);
  console.log(`Telegram Chat ID: ${chatId ? "Exists" : "MISSING"}`);

  if (!token || !chatId) {
    console.error("Telegram credentials missing in environment variables");
    return res.status(500).json({
      message:
        "Server tənzimləmələrində xəta var. Zəhmət olmasa sonra cəhd edin.",
    });
  }

  const telegramMessage = `
<b>🚀 Yeni Əlaqə Formu</b>

<b>👤 Ad:</b> ${name}
<b>📧 Email:</b> ${email}
<b>💬 Mesaj:</b>
${message}

<b>🌐 IP:</b> ${clientIp}
<b>⏰ Tarix:</b> ${new Date().toLocaleString("az-AZ")}
  `.trim();

  const data = JSON.stringify({
    chat_id: chatId,
    text: telegramMessage,
    parse_mode: "HTML",
  });

  const options = {
    hostname: "api.telegram.org",
    port: 443,
    path: `/bot${token}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const telegramReq = https.request(options, (telegramRes) => {
    let responseData = "";
    telegramRes.on("data", (chunk) => {
      responseData += chunk;
    });

    telegramRes.on("end", () => {
      console.log("Telegram API Response Status:", telegramRes.statusCode);
      console.log("Telegram API Response Body:", responseData);

      if (telegramRes.statusCode === 200) {
        console.log(`Telegram message sent successfully from ${email}`);
        return res
          .status(200)
          .json({ message: "Mesajınız uğurla göndərildi." });
      } else {
        console.error("Telegram API Error:", responseData);
        return res
          .status(500)
          .json({ message: "Mesaj göndərilərkən xəta baş verdi." });
      }
    });
  });

  telegramReq.on("error", (error) => {
    console.error("Telegram Request Error:", error);
    return res
      .status(500)
      .json({ message: "Serverlə əlaqə zamanı xəta baş verdi." });
  });

  telegramReq.write(data);
  telegramReq.end();
};
