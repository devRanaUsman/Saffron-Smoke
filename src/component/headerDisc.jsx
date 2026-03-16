import Header from "./header";

// Disc header is used on non-hero pages.
// We keep the same navigation + functionality, but add a solid backdrop.
function HeaderDisc() {
  return (
    <div className="page-header-wrap">
      <Header />
    </div>
  );
}

export default HeaderDisc;
