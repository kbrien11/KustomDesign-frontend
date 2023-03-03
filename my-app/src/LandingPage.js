import * as React from "react";
import ProductCategories from "./components/cssComponents/ProductCategories";
import ProductSmokingHero from "./components/cssComponents/ProductSmokingHero";
import AppFooter from "./components/cssComponents/AppFooter";
import ProductHero from "./components/cssComponents/ProductHero";
import ProductValues from "./components/cssComponents/ProductValues";
import ProductHowItWorks from "./components/cssComponents/ProductHowItWorks";
import ProductCTA from "./components/cssComponents/ProductCTA";
import AppAppBar from "./components/cssComponents/AppAppBar";
import withRoot from "./components/cssComponents/withRoot";

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
