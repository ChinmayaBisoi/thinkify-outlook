import Head from "next/head";
import Image from "next/image";
import { useEffect, useLayoutEffect } from "react";
import PortfolioContent from "../components/portfolio/portfolio-content";
import PortfolioTopNav from "../components/portfolio/portfolio-top-nav";

const Home = () => {
  useEffect(() => {
    console.log(1);
  });
  useEffect(() => {
    console.log(2);
  });
  useLayoutEffect(() => {
    console.log(1);
  });
  useLayoutEffect(() => {
    console.log(2);
  });
  console.log(2);
  return (
    <div>
      <Head>
        <title>Chinmaya Bisoi | Frontend Developer and Enthusiast</title>
        <link rel="icon" href="/icons/bolt-lightning-solid.svg" />
      </Head>
      <PortfolioTopNav />
      <PortfolioContent />
    </div>
  );
};

export default Home;
