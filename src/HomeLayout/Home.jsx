import HomeAbout from "./HomeComponents/HomeAbout";
import HomeBanner from "./HomeComponents/HomeBanner";
import HomePackages from "./HomeComponents/HomePackages";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HomeBanner></HomeBanner>
      <HomeAbout></HomeAbout>
      <HomePackages></HomePackages>
    </div>
  );
};

export default Home;
