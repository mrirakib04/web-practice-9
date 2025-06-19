import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ErrorPage from "./ErrorPage";
import App from "./../App";
import Home from "./../HomeLayout/Home";
import JoinAsEmployee from "./../HomeLayout/JoinAsEmployee";
import JoinAsHR from "./../HomeLayout/JoinAsHR";
import Login from "./../HomeLayout/Login";
import EmployeeHome from "./../EmployeeLayout/EmployeeHome/EmployeeHome";
import EmployeeAssets from "./../EmployeeLayout/EmployeeAssets/EmployeeAssets";
import EmployeeAssetsRequest from "./../EmployeeLayout/EmployeeAssetsRequest/EmployeeAssetsRequest";
import EmployeeTeam from "./../EmployeeLayout/EmployeeTeam/EmployeeTeam";
import HRHome from "../HRLayout/HRHome/HRHome";
import HRAssetsList from "../HRLayout/HRAssetsList/HRAssetsList";
import HRAddAsset from "../HRLayout/HRAddAsset/HRAddAsset";
import HRAllRequests from "../HRLayout/HRAllRequests/HRAllRequests";
import HREmployeeList from "../HRLayout/HREmployeeList/HREmployeeList";
import HRAddEmployee from "../HRLayout/HRAddEmployee/HRAddEmployee";
import Payment from "../HomeLayout/PaymentPage/Payment";
import HRUpdateAsset from "../HRLayout/HRUpdateAsset/HRUpdateAsset";
import IsPaidHR from "./UserCheckPoint/IsPaidHR";
import IsHR from "./UserCheckPoint/IsHR";
import IsEmployee from "./UserCheckPoint/IsEmployee";
import IsLogin from "./UserCheckPoint/IsLogin";
import Profile from "../HomeLayout/Profile/Profile";

const WebRouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        <Route path="/" element={<App></App>}>
          {/* without login routes */}
          <Route index path="/" element={<Home></Home>}></Route>
          <Route
            path="/JoinAsEmployee"
            element={<JoinAsEmployee></JoinAsEmployee>}
          ></Route>
          <Route path="/JoinAsHR" element={<JoinAsHR></JoinAsHR>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          <Route
            path="/profile"
            element={
              <IsLogin>
                <Profile></Profile>
              </IsLogin>
            }
          ></Route>

          {/* employee routes */}
          <Route
            path="/employee"
            element={<Navigate to={"/employee/dashboard/home"}></Navigate>}
          ></Route>
          <Route path="/employee/dashboard">
            <Route
              path="/employee/dashboard"
              element={<Navigate to={"/employee/dashboard/home"}></Navigate>}
            ></Route>
            <Route
              path="/employee/dashboard/home"
              element={
                <IsEmployee>
                  <EmployeeHome></EmployeeHome>
                </IsEmployee>
              }
            ></Route>
            <Route
              path="/employee/dashboard/assets"
              element={
                <IsEmployee>
                  <EmployeeAssets></EmployeeAssets>
                </IsEmployee>
              }
            ></Route>
            <Route
              path="/employee/dashboard/request"
              element={
                <IsEmployee>
                  <EmployeeAssetsRequest></EmployeeAssetsRequest>
                </IsEmployee>
              }
            ></Route>
            <Route
              path="/employee/dashboard/team"
              element={
                <IsEmployee>
                  <EmployeeTeam></EmployeeTeam>
                </IsEmployee>
              }
            ></Route>
          </Route>

          {/* hr routes */}
          <Route
            path="/payment"
            element={<Navigate to={"/hr/payment"}></Navigate>}
          ></Route>
          <Route
            path="/hr/payment"
            element={
              <IsHR>
                <Payment></Payment>
              </IsHR>
            }
          ></Route>
          <Route
            path="/hr"
            element={<Navigate to={"/hr/dashboard/home"}></Navigate>}
          ></Route>
          <Route path="/hr/dashboard">
            <Route
              path="/hr/dashboard"
              element={<Navigate to={"/hr/dashboard/home"}></Navigate>}
            ></Route>
            <Route
              path="/hr/dashboard/home"
              element={
                <IsPaidHR>
                  <IsHR>
                    <HRHome></HRHome>
                  </IsHR>
                </IsPaidHR>
              }
            ></Route>

            {/* hr assets */}
            <Route
              path="/hr/dashboard/assets"
              element={<Navigate to={"/hr/dashboard/assetsList"}></Navigate>}
            ></Route>
            <Route
              path="/hr/dashboard/assetsList"
              element={
                <IsPaidHR>
                  <IsHR>
                    <HRAssetsList></HRAssetsList>
                  </IsHR>
                </IsPaidHR>
              }
            ></Route>
            <Route
              path="/hr/dashboard/addAsset"
              element={
                <IsPaidHR>
                  <IsHR>
                    <HRAddAsset></HRAddAsset>
                  </IsHR>
                </IsPaidHR>
              }
            ></Route>
            <Route
              path="/hr/dashboard/requests"
              element={
                <IsPaidHR>
                  <IsHR>
                    <HRAllRequests></HRAllRequests>
                  </IsHR>
                </IsPaidHR>
              }
            ></Route>

            {/* hr employees */}
            <Route
              path="/hr/dashboard/employees"
              element={<Navigate to={"/hr/dashboard/employeeList"}></Navigate>}
            ></Route>
            <Route
              path="/hr/dashboard/employeeList"
              element={
                <IsPaidHR>
                  <IsHR>
                    <HREmployeeList></HREmployeeList>
                  </IsHR>
                </IsPaidHR>
              }
            ></Route>
            <Route
              path="/hr/dashboard/addEmployee"
              element={
                <IsPaidHR>
                  <IsHR>
                    <HRAddEmployee></HRAddEmployee>
                  </IsHR>
                </IsPaidHR>
              }
            ></Route>
            <Route
              path="/hr/dashboard/edit/asset/:id"
              element={
                <IsPaidHR>
                  <IsHR>
                    <HRUpdateAsset></HRUpdateAsset>
                  </IsHR>
                </IsPaidHR>
              }
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default WebRouterProvider;
