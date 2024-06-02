import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddOrder from "./pages/AddOrder";
import EditProduct from "./pages/EditProduct";
import TerimaOrder from "./pages/TerimaOrder";
import DataPetani from "./pages/petani/DataPetani";
import EditDataPetani from "./pages/petani/EditDataPetani";
import DataPabrik from "./pages/pabrik/DataPabrik";
import EditDataPabrik from "./pages/pabrik/EditDataPabrik";
import DataLogistik from "./pages/logistik/DataLogistik";
import EditDataLogistik from "./pages/logistik/EditDataLogistik";
import DataLahanPetani from "./pages/petani/DataLahanPetani";
import AddDataLahan from "./pages/petani/AddDataLahan";
import EditDataLahan from "./pages/petani/EditDataLahan";
import ListDataLogistik from "./pages/logistik/ListDataLogistik";
import ListDataLogistikAdd from "./pages/logistik/ListDataLogistikAdd";
import ListDataLogistikEdit from "./pages/logistik/ListDataLogistikEdit";
import ListDataPabrik from "./pages/pabrik/ListDataPabrik";
import ListdataPabrikAdd from "./pages/pabrik/ListDataPabrikAdd";
import ListDataPabrikEdit from "./pages/pabrik/ListDataPabrikEdit";
import LandingPage from "./pages/LandingPage";
import Search from "./pages/Search";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddOrder />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/acc/:id" element={<TerimaOrder />} />
          <Route path="/datapetani" element={<DataPetani />} />
          <Route path="/datapetani/edit/:id" element={<EditDataPetani />} />
          <Route path="/datapabrik" element={<DataPabrik />} />
          <Route path="/datapabrik/edit/:id" element={<EditDataPabrik />} />
          <Route path="/datalogistik" element={<DataLogistik />} />
          <Route path="/datalogistik/edit/:id" element={<EditDataLogistik />} />
          <Route path="/datalahan" element={<DataLahanPetani />} />
          <Route path="/datalahan/add" element={<AddDataLahan />} />
          <Route path="/datalahan/edit/:id" element={<EditDataLahan />} />
          <Route path="/data-logistik" element={<ListDataLogistik />} />
          <Route path="/data-logistik/add" element={<ListDataLogistikAdd />} />
          <Route path="/data-logistik/edit/:id" element={<ListDataLogistikEdit />} />
          <Route path="/data-pabrik" element={<ListDataPabrik />} />
          <Route path="/data-pabrik/add" element={<ListdataPabrikAdd />} />
          <Route path="/data-pabrik/edit/:id" element={<ListDataPabrikEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
