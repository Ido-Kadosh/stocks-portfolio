import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import DefaultLayout from './layout/DefaultLayout';

function App() {
	return (
		<div>
			<Router>
				<main>
					<Routes>
						<Route element={<DefaultLayout />}>
							<Route path="/" element={<PortfolioPage />} />
						</Route>
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
