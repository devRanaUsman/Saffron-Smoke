// import React from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscribe } from "../services/subscriptionService";
export default function AboutInDetail({
  aboutTitle = "ABOUT MY KITCHEN",
  aboutText = "I'm Amber. Welcome to my recipe blog! I'm passionate about creating and sharing delicious, easy-to-follow recipes that anyone can make at home. From comforting classics to exciting new dishes, I aim to inspire your inner chef and make every meal a memorable one.",
  aboutLinkText = "More About The Recipes PK",
  aboutLinkHref = "#",
  popularTitle = "POPULAR RECIPES",
  latestTitle = "LATEST RECIPES",
  popularItems = [
    { label: "Best Ramadan Recipes", href: "#" },
    { label: "Drink Recipes for Ramadan", href: "#" },
    { label: "Best Iftar Snacks Recipes", href: "#" },
    { label: "Best Lemonade Recipes", href: "#" },
    { label: "Fruit Smoothie Recipes", href: "#" },
  ],
  latestItems = [
    { label: "5 Best Pizza Places in Lahore for Desi People", href: "#" },
    { label: "Kache Keeme Ke Kabab", href: "#" },
    { label: "Kanji Drink Recipe (Black Carrot Drink)", href: "#" },
    { label: "Pizza Bread Rolls", href: "#" },
    { label: "5 Popular Chicken Karahi Pakistani Recipes", href: "#" },
  ],
}) {
  const [searchInput, setSearchInput] = useState(""); // ← Add this
  const navigate = useNavigate();
  const card = {
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
    borderRadius: 8,
    padding: "1.25rem",
    color: "#333",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    marginBottom: "1.5rem",
  };

  const title = {
    fontWeight: "bold",
    fontSize: "1rem",
    letterSpacing: ".06em",
    color: "#495057",
    marginBottom: "1rem",
  };

  const list = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const listItem = {
    marginBottom: ".5rem",
  };

  const link = {
    textDecoration: "none",
  };

  const hr = { border: 0, height: 1, background: "#e9ecef", margin: "1rem 0" };

  const input = {
    width: "100%",
    border: "1px solid #ced4da",
    borderRadius: 4,
    padding: ".55rem .75rem",
    outline: "none",
  };

  const button = {
    width: "100%",
    background: "#ff5a5f",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: ".6rem .75rem",
    cursor: "pointer",
    fontWeight: 600,
  };

  // const placeholderImg = {
  //   width: "100%",
  //   height: 140,
  //   background: "#f1f3f5",
  //   border: "1px dashed #ced4da",
  //   borderRadius: 6,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   color: "#868e96",
  //   marginBottom: "1rem",
  // };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`); // ← Redirect to search
    }
  };
  const [subEmail, setSubEmail] = useState("");
  const [subStatus, setSubStatus] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  const onSubmitSubscribe = async (e) => {
    e.preventDefault();
    setSubStatus("");
    if (!subEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
      setSubStatus("Please enter a valid email.");
      return;
    }
    try {
      setSubLoading(true);
      const result = await subscribe(subEmail);
      setSubStatus(result.message || "Subscribed successfully.");
      setSubEmail("");
    } catch (err) {
      setSubStatus(err.message || "Subscription failed");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <aside aria-label="About sidebar" style={{ position: "relative", top: 53 }}>
      {/* Search Recipe */}
      <section style={card}>
        <h6 style={title}>SEARCH RECIPE</h6>
        <form onSubmit={onSubmitSearch}>
          <input
            style={input}
            type="text"
            placeholder="Search ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // ← Track input
          />
          <div style={{ height: 12 }} />
          <button type="submit" style={button}>
            Search
          </button>
        </form>
      </section>

      {/* About My Kitchen */}
      <section style={card}>
        <h6
          style={{
            title,
            fontSize: "1.2rem",
            color: "#495057",
            fontWeight: "bold",
          }}
        >
          {aboutTitle}
        </h6>
        {/* Replace this with <img src=... /> later */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <img
            src="https://therecipespk.com/wp-content/uploads/2020/04/Abrish-Recipes-PK-300x300.png"
            alt=""
            style={{ width: "40%", height: "auto" }}
          />
        </div>
        <p style={{ lineHeight: 1.6, marginBottom: ".75rem" }}>{aboutText}</p>
        <a
          href={aboutLinkHref}
          style={{
            ...link,
            fontWeight: 600,
            color: "black",
            textDecoration: "none",
          }}
        >
          {aboutLinkText}
        </a>
      </section>

      {/* Popular Recipes */}
      <section style={card}>
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://therecipespk.com/wp-content/uploads/2022/08/Touch-Screen-Mobile-Bag.jpg"
            alt=""
          />
        </div>
        <h6
          style={{
            title,
            fontSize: "1.2rem",
            color: "#495057",
            fontWeight: "bold",
          }}
        >
          {popularTitle}
        </h6>
        <ul style={{ list, paddingLeft: "0" }}>
          {popularItems.map((it) => (
            <li key={it.label} style={listItem}>
              <a
                href={it.href}
                style={{ link, color: "black", textDecoration: "none" }}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Latest Recipes */}
      <section style={card}>
        <h6
          style={{
            title,
            fontSize: "1.2rem",
            color: "#495057",
            fontWeight: "bold",
          }}
        >
          {latestTitle}
        </h6>
        <ul style={list}>
          {latestItems.map((it) => (
            <li key={it.label} style={listItem}>
              <a
                href={it.href}
                style={{ link, color: "black", textDecoration: "none" }}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Subscribe via Email */}
      <section style={card}>
        <h6 style={title}>SUBSCRIBE TO BLOG VIA EMAIL</h6>
        <p style={{ marginBottom: ".75rem" }}>
          Don't miss even a single recipe, enter your email address and receive
          notifications of new recipes by email.
        </p>
        <form onSubmit={onSubmitSubscribe}>
          <input
            style={{
              width: "100%",
              border: "1px solid #ced4da",
              borderRadius: 4,
              padding: ".55rem .75rem",
              outline: "none",
            }}
            type="email"
            required
            placeholder="Email Address"
            value={subEmail}
            onChange={(e) => setSubEmail(e.target.value)}
            disabled={subLoading}
          />

          <div style={{ height: 12 }} />
          <button type="submit" style={button} disabled={subLoading}>
            {subLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {subStatus && (
          <div
            style={{
              marginTop: 8,
              color: subStatus.includes("failed") ? "#d9534f" : "#28a745",
            }}
          >
            {subStatus}
          </div>
        )}
      </section>

      {/* Disclosure */}
      <section style={card}>
        <p style={{ fontSize: ".95rem", margin: 0 }}>
          This website contains Amazon affiliate links. These links are provided
          to help you find the products we mention in the recipe. If you make
          any purchase after clicking through one of our links, we receive a
          small commission from Amazon, nothing from you.
        </p>
      </section>
    </aside>
  );
}
