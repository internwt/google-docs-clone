import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import TextForm from './TextForm'
import Todo from './Components/Todo'
import CurrencyConvertor from './Components/CurrencyConvertor/Currency'
import Navbar from './Navbar'
import Breakinbad from './Components/BreakingBad/Breakinbad'
const pages = [
  {
    pageLink: '/socket',
    view: TextForm,
    displayName: 'textForm',
    showInNavbar: true,
  },
  {
    pageLink: '/todo',
    view: Todo,
    displayName: 'Todo',
    showInNavbar: true,
  },
  {
    pageLink: '/currency',
    view: CurrencyConvertor,
    displayName: "currency",
    showInNavbar: true
  },
  {
    pageLink: '/breaking-bad',
    view: Breakinbad,
    displayName: "Breakinbad",
    showInNavbar: true
  }
]
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch >
        {pages.map((page, index) => {
          return (
            <Route
              exact
              path={page.pageLink}
              render={({ match }) => <page.view />}
              key={index}
            />
          );
        })}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
