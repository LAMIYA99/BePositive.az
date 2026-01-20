/**
 * Verify reCAPTCHA v3 token using Google's REST API
 */
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set in environment variables");
    return { success: false, score: 0 };
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();

    console.log("reCAPTCHA verification result:", data);

    return {
      success: data.success,
      score: data.score || 0,
      action: data.action,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data["error-codes"],
    };
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return { success: false, score: 0 };
  }
}

exports.sendContactEmail = async (req, res) => {
  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Bütün xanaları doldurun." });
  }

  // Verify reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(token);

  if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
    console.log("reCAPTCHA verification failed:", recaptchaResult);
    return res.status(400).json({
      message: "reCAPTCHA doğrulaması uğursuz oldu. Yenidən cəhd edin.",
    });
  }

  // Send Email via EmailJS REST API
  // Using the credentials from environment variables (or hardcoded if necessary, but better env)
  const serviceId = process.env.EMAILJS_SERVICE_ID || "service_sduolbk";
  const templateId = process.env.EMAILJS_TEMPLATE_ID || "template_nwl3cgt";
  const userId = process.env.EMAILJS_PUBLIC_KEY || "VbbuEz_PnOeCy2Qgo";

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
