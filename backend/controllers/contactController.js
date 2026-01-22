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
  const { name, email, message, honeypot, timestamp } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Bütün xanaları doldurun." });
  }

  if (!validateHoneypot(honeypot)) {
    console.log("Honeypot field filled - potential bot detected");
    return res
      .status(400)
      .json({ message: "Xəta baş verdi. Yenidən cəhd edin." });
  }

  if (!timestamp || !validateTiming(timestamp)) {
    console.log("Form submitted too quickly - potential bot detected");
    return res
      .status(400)
      .json({ message: "Zəhmət olmasa bir az gözləyin və yenidən cəhd edin." });
  }

  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    console.log(`Rate limit exceeded for IP: ${clientIp}`);
    return res
      .status(429)
      .json({ message: "Çox tez-tez sorğu göndərirsiniz. Bir az gözləyin." });
  }

  // 5. Email validation
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Düzgün email ünvanı daxil edin." });
  }

  // 6. Spam content check
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

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_louv4fl";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_nwl3cgt";
  const userId = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY|| "VbbuEz_PnOeCy2Qgo";

  try {
    const emailRes = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: userId,
          template_params: {
            from_name: name,
            from_email: email,
            message: message,
          },
        }),
      },
    );

    if (emailRes.ok) {
      console.log(`Email sent successfully from ${email}`);
      return res.status(200).json({ message: "Mesajınız göndərildi!" });
    } else {
      const errorText = await emailRes.text();
      console.error("EmailJS API Error:", errorText);
      return res
        .status(500)
        .json({ message: "E-poçt göndərilərkən xəta baş verdi." });
    }
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({ message: "Daxili server xətası." });
  }
};
