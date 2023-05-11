import './App.css';
import EmployeeTable from './components/EmployeeTable';
import TopBar from './components/TopBar';
import CoronaTable from './components/CoronaTable';
import TopButton from './components/TopButton';
 import InfoButton from './components/InfoButton';

function App() {
  return (
    <div className="App">
      <TopBar/>
      <InfoButton/>
     <EmployeeTable/>
      <TopButton/>
      <CoronaTable/>
    </div>
  );
}

export default App;
