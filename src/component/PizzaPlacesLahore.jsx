import React from "react";
import AboutInDetail from "./AboutInDetail";
import LeftSideBar from "./LeftSideBar";

// Hardcoded content based on the provided screenshot
const ARTICLE = {
  slug: "best-pizza-places-in-lahore",
  title: "5 Best Pizza Places in Lahore for Desi People",
  coverImage:
    "https://therecipespk.com/wp-content/uploads/2025/09/Review-of-5-Best-Pizza-Places-in-Lahore-for-Desi-People.jpg", // Place this image in /public
  intro: [
    "Pizza may have Italian roots, but in Lahore, it has truly taken on a Desi soul. From loaded crusts to spicy toppings, Lahoris love their pizza bold, flavorful, and hearty enough to compete with our traditional food cravings.\n\nOver the past few weeks, I’ve personally visited and tasted at some of the city’s most popular local pizza spots",
  ],
  places: [
    {
      rank: 5,
      name: "Pizza Online",
      desc: "Pizza Online is underrated but deserves to be on this list for its desi-style toppings and fresh taste. Their Desi Chicken Pizza comes loaded with spicy chicken chunks, bell peppers, and extra cheese, giving that homely comfort food vibe that Lahoris love.\n\nWhat I appreciate most is their consistency in flavor — every time I’ve ordered, the pizza arrived fresh, hot, and full of taste. Their economical deals also make them a solid choice for families who want quality without breaking the bank",
      branches: [
        "Johar Town",
        "Iqbal Town",
        "Shalamar, GT Road Near",
        "Thokar Niaz Baig",
      ],
      coverImage:
        "https://therecipespk.com/wp-content/uploads/2025/09/Pizza-Online.png",
    },
    {
      rank: 4,
      name: "Pizza Max",
      desc: "Pizza Max has been around for years and has built a loyal fanbase thanks to its consistently good quality. If you like desi-style bold flavors, their Chicken Tikka and Creamy Super Max pizzas are must-tries.\n\nThe base is soft yet sturdy, the toppings are generous, and their spicy sauces give the perfect Lahori punch. They also offer a wide range of crust options — from thin crust to stuffed cheese — making it easy to customize according to your mood",
      branches: [
        "Allama Iqbal Town",
        "Shalimar Link Road",
        "DHA Phase 6",
        "Johar Town",
        "Gulshan e Ravi ",
      ],
      coverImage:
        "https://therecipespk.com/wp-content/uploads/2025/09/Pizza-Max.png",
    },

    {
      rank: 3,
      name: "Chunk N Cheese",
      desc: "Chunk N Cheese is a name every Lahori student knows. Famous for its value-for-money pizzas, it’s the go-to spot when you want loads of cheese and spice without emptying your wallet.\n\nWhat impressed me most was their The Bonfire — creamy, spicy, and full of flavor that feels unmistakably desi. Their crust isn’t overly fancy, but the toppings make up for it with plenty of cheese pull and kick. Perfect for a casual hangout with friends.",
      branches: ["Johar Town", "Gulshan e Ravi", "Baghbanpura"],
      coverImage:
        "https://therecipespk.com/wp-content/uploads/2025/09/chunkn-cheese.png",
    },
    {
      rank: 2,
      name: "Cheezious",
      desc: "Cheezious has quickly become one of the most talked-about pizza brands in Lahore — and for good reason. It offers a desi-friendly menu with bold flavors, perfect for families and youngsters who want more than just a basic pizza.\n\nIf you’re someone who craves that fiery kick in every bite, the Peri Peri Pizza at Cheezious is a must-try. It’s one of their boldest creations, loaded with spicy chicken marinated in peri peri sauce, fresh veggies, and just the right amount of cheese to balance the heat.\n\nWhat makes it special is the flavor profile — smoky, tangy, and spicy all at once — exactly the kind of taste that excites Lahori foodies who love their spice game strong. Portions are generous, and their deals are budget-friendly, which makes them a favorite among students.",
      branches: [
        "Allama Iqbal Town",
        "Jail Road",
        "Gulberg 3",
        "Johar Town",
        "Baghbanpura",
      ],
      coverImage:
        "https://therecipespk.com/wp-content/uploads/2025/09/Cheezious.png",
    },
    {
      rank: 1,
      name: "Second Slice by Fri-Chicks",
      desc: "If you’re a true Lahori, you know that pizza should not only satisfy hunger but also feel like a proper meal — full of flavors and desi-style generosity. Folks n Knives has become my personal favorite for this very reason.\n\nTheir pizzas are layered with gooey cheese, perfectly seasoned chicken, and sauces that bring just the right amount of spice. Unlike many chains, the crust here is soft yet crisp on the edges, balancing texture and taste beautifully. The Malai Boti Pizza is hands-down the star, bursting with the tangy flavor of creamy sauce that every desi palate enjoys.",
      branches: ["Allama Iqbal Town", "Johar Town", "GT Road"],
      coverImage:
        "https://therecipespk.com/wp-content/uploads/2025/09/Second-Slice-By-Folks-n-Knives.png",
    },
  ],
  finalThoughts:
    "These are my top picks for the best pizza places in Lahore for desi people, based on personal experience and countless cheesy bites. Each of these spots brings something unique to the table, whether it’s stuffed crusts, spicy toppings, or generous portions that match Lahore’s love for food.But taste is personal — and I’d love to hear from you. Which of these pizza places have you tried? Do you have another favorite that deserves to be on this list? Share your thoughts in the comments below!",
  faqs: [
    {
      q: "Which is the best pizza place in Lahore for desi flavors?",
      a: "Folks n Knives tops the list for its stuffed crust and spicy chicken fajita flavor, making it a favorite among desi food lovers",
    },
    {
      q: "Is Cheezious better than Pizza Max in Lahore?",
      a: "Both are popular, but Cheezious stands out for its unique Crown Crust Pizza, while Pizza Max is known for its bold Chicken Tikka and creamy flavors.",
    },
    {
      q: "Where can I find affordable desi pizza in Lahore?",
      a: "Chunk N Cheese and Pizza Online are great budget-friendly options. They offer generous cheese, spicy toppings, and economical deals.",
    },
    {
      q: "Which pizza chains in Lahore serve family-friendly deals?",
      a: "Cheezious and Pizza Max are famous for their family combos and student-friendly offers, making them ideal for groups.",
    },
    {
      q: "Does Lahore have authentic desi fusion pizzas?",
      a: "Yes, many local pizzerias like Cheezious and Folks n Knives specialize in fusion flavors such as Malai Boti, Chicken Tikka, and Crown Crust pizzas tailored for desi taste buds.",
    },
  ],
};
export default function PizzaPlacesLahore() {
  return (
    <div style={{ background: "#f7fbff" }}>
      {/* Fixed social bar on the left */}
      <LeftSideBar />
      <h1 style={{ textAlign: "center", padding: "2rem 0" }}>
        {ARTICLE.title}
      </h1>
      <div
        className="container"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="row">
          {/* Main content */}
          <div className="col-12 col-lg-9">
            <article
              aria-label={ARTICLE.title}
              style={{
                background: "#fff",
                border: "1px solid #e9ecef",
                borderRadius: 8,
                padding: "1.25rem",
              }}
            >
              {/* Optional cover */}
              <div style={{ margin: "1rem 0" }}>
                <img
                  src={ARTICLE.coverImage}
                  onError={(e) => {
                    // fallback to hero image if cover not found
                    e.currentTarget.src = "";
                  }}
                  alt={ARTICLE.title}
                  style={{ width: "100%", height: "auto", borderRadius: 6 }}
                />
              </div>

              {ARTICLE.intro.flatMap((block, blockIndex) =>
                block.split("\n\n").map((para, paraIndex) => (
                  <p
                    key={`${blockIndex}-${paraIndex}`}
                    style={{
                      color: "#333",
                      fontSize: "1.2rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {para}
                  </p>
                ))
              )}

              <hr />

              {ARTICLE.places
                .sort((a, b) => b.rank - a.rank) // show 5 → 1 like the screenshot
                .map((place) => (
                  <section key={place.rank} style={{ margin: "1.5rem 0" }}>
                    <h2
                      style={{
                        fontSize: "2rem",
                        color: "#111",
                        marginBottom: "3rem",
                        fontWeight: 700,
                      }}
                    >
                      {place.rank}. {place.name}
                    </h2>{" "}
                    <div style={{ margin: "1rem 0" }}>
                      <img
                        src={place.coverImage}
                        onError={(e) => {
                          // fallback to hero image if cover not found
                          e.currentTarget.src = "";
                        }}
                        alt={ARTICLE.title}
                        style={{
                          width: "100%",
                          height: "50%",
                          borderRadius: 6,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        color: "#333",
                        lineHeight: 1.7,
                        fontSize: "1.2rem",
                      }}
                    >
                      {place.desc.split("\n\n").map((para, idx) => (
                        <p
                          key={idx}
                          style={{
                            color: "#333",
                            lineHeight: 1.7,
                            fontSize: "1.2rem",
                            marginBottom: "1.5rem",
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </p>
                    {place.branches?.length ? (
                      <div
                        style={{
                          marginTop: "0.95rem",
                          fontSize: "1.2rem",
                          marginBottom: "5rem",
                        }}
                      >
                        <strong>Branches:</strong>
                        <ul style={{ margin: ".25rem 0 0 .9rem" }}>
                          {place.branches.map((b) => (
                            <li key={b} style={{ marginTop: ".2rem" }}>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </section>
                ))}

              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginTop: "2rem",
                  color: "#111",
                }}
              >
                Final Thoughts
              </h3>
              <p style={{ color: "#333", lineHeight: 1.7, fontSize: "1.2rem" }}>
                {ARTICLE.finalThoughts}
              </p>

              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginTop: "2rem",
                  marginBottom: "1rem",
                  color: "#111",
                }}
              >
                FAQs
              </h3>
              <div>
                {ARTICLE.faqs.map((f, i) => (
                  <div
                    key={i}
                    style={{ marginBottom: ".75rem", fontSize: "1.2rem" }}
                  >
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      <strong>Q:</strong> {f.q}
                    </p>
                    <p style={{ margin: 0, marginBottom: "3rem" }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Right sidebar */}
          <div className="col-12 col-lg-3 mt-4 mt-lg-0 d-flex justify-content-end">
            <div style={{ width: "100%", maxWidth: 420 }}>
              <AboutInDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
