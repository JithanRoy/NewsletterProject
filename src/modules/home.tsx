import React from 'react';
import Header from "../shared/widgets/header/header";
import Banner from "./home/elements/banner";
import Branding from "./home/elements/Branding";
import Benifits from "./home/elements/benifits";
import FeatureHighlight from "./home/elements/feature.highlight";
import Pricing from "./home/elements/pricing";
import Footer from "../shared/widgets/footer/footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Branding />
      <Benifits />
      <FeatureHighlight />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;
