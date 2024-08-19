import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import PortfolioPage from './pages/PortfolioPage';
import StocksPage from './pages/StocksPage';
import UserMsg from './components/UserMsg';
import LoginSignup from './pages/loginSignup';

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route element={<DefaultLayout />}>
						<Route path="/portfolio" element={<PortfolioPage />} />
						<Route path="/" element={<StocksPage />} />
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/signup" element={<LoginSignup />} />
					</Route>
				</Routes>
				<UserMsg />
			</Router>
		</div>
	);
}

export default App;
