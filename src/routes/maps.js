import MlFiveImage from "../screens/mlFiveImage";
import MlFiveVideo from "../screens/mlFiveVideo";
import Dashbord from "./../screens/dashbord";

export default [
  {
    path: "/mlFiveImage",
    layout: "dash_main",
    component: MlFiveImage,
    exact: false

  },
  {
    path: "/mlFiveVideo",
    layout: "dash_main",
    component: MlFiveVideo,
    exact: false
  },
  {
    path: "/",
    layout: "dash_main",
    component: Dashbord,
    exact: true
  },
];