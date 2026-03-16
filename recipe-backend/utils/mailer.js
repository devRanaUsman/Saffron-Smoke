const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");

// Configure transporter using environment variables (defaults to Gmail SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: true, // Gmail SMTP over 465 requires secure=true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to, subject, html) {
  // Use FROM_EMAIL if provided, otherwise default to the authenticated Gmail
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
  await transporter.sendMail({ from, to, subject, html });
}

async function notifySubscribersNewRecipe(recipe) {
  const frontBase = process.env.FRONTEND_URL || "http://localhost:5173";
  const url = `${frontBase}/recipe/${encodeURIComponent(recipe.slug)}`;
  const subject = `New Recipe: ${recipe.title}`;
  const html = `
    <div>
      <h2>${recipe.title}</h2>
      <p>We have added a new recipe you might like.</p>
      <p><a href="${url}">View Recipe</a></p>
      <img src="${recipe.image}" alt="${recipe.title}" style="max-width:600px;width:100%;height:auto;border-radius:8px"/>
    </div>
  `;

  const subscribers = await Subscriber.find({}, { email: 1, _id: 0 }).lean();
  for (const s of subscribers) {
    try {
      await sendEmail(s.email, subject, html);
    } catch (e) {
      console.error("Failed to email subscriber", s.email, e.message);
    }
  }
}

module.exports = { sendEmail, notifySubscribersNewRecipe };
