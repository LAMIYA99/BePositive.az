const {
  RecaptchaEnterpriseServiceClient,
} = require("@google-cloud/recaptcha-enterprise");

/**
 * Create an assessment to analyze the risk of a UI action.
 */
async function createAssessment({
  projectID = process.env.RECAPTCHA_PROJECT_ID,
  recaptchaKey = process.env.RECAPTCHA_SITE_KEY,
  token,
  recaptchaAction,
}) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  try {
    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties.valid) {
      console.log(
        `The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`
      );
      return null;
    }

    if (response.tokenProperties.action === recaptchaAction) {
      console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
      return response.riskAnalysis.score;
    } else {
      console.log(
        "The action attribute in your reCAPTCHA tag does not match the action you are expecting to score"
      );
      return null;
    }
  } catch (error) {
    console.error("Error creating assessment:", error);
    return null;
  }
}

exports.sendContactEmail = async (req, res) => {
  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Bütün xanaları doldurun." });
  }

  // Verify reCAPTCHA
  const score = await createAssessment({
    token: token,
    recaptchaAction: "contact",
  });

  if (score === null || score < 0.5) {
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
      }
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
