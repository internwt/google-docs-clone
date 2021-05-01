import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import TextForm from './TextForm'
import Todo from './Components/Todo'
import CurrencyConvertor from './Components/CurrencyConvertor/Currency'


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
  }
]
function App() {
  return (
    <div className="App">
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
