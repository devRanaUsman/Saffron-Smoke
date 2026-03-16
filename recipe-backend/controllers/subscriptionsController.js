const Subscriber = require("../models/Subscriber");
const { sendEmail } = require("../utils/mailer");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    // Upsert subscriber
    const existing = await Subscriber.findOne({ email });
    if (!existing) {
      await Subscriber.create({ email });
    }

    // Send thank you email
    await sendEmail(
      email,
      "Thank you for subscribing to The Safron & Smoke!",
      `<div>
        <h2>Thank you for subscribing </h2>
        <p>We'll send you updates when we publish new recipes.</p>
      </div>`
    );

    res.json({
      message: "Subscribed successfully. Check your email for confirmation.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Subscription failed", error: err.message });
  }
};
