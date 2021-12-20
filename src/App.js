import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <>
      <Header></Header>

      {/* <Switch>
        <Route exact path="/" component={home} />
        <AuthRoute exact path="/login" component={login} />
        <UserRoute exact path="/orders" component={orders} />
        <SellerRoute exact path="/seller/orders" component={orders} />
      </Switch> */}

      <Footer></Footer>
    </>
  );
}

export default App;
