import React from 'react';
import Header from "../shared/widgets/header/header";
import Banner from "./home/features/banner";
import Branding from "./home/features/Branding";
import Benifits from "./home/features/benifits";
import FeatureHighlight from "./home/features/feature.highlight";
import Pricing from "./home/features/pricing";
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
