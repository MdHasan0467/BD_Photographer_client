import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddServices from '../component/AddServices/AddServices';
import Blog from '../component/Blog/Blog';
import Error from '../component/Error/Error';
import Home from '../component/Home/Home';
import LogIn from '../component/LogIn/LogIn';
import Main from '../component/Main/Main';
import PrivateRoute from '../component/PrivateRoute/PrivateRoute';
import Services from '../component/Services/Services';
import SignUp from '../component/SignUp/SignUp';
import UpdateReview from '../component/UpdateReview/UpdateReview';
import MyReviews from '../ReviewSection/MyReviews/MyReviews';
import ServiceDetails from '../ServiceDetails/ServiceDetails';
import About from '../component/About/About';

const Routes = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Main></Main>,
			children: [
				{
					path: '/',
					element: <Home></Home>,
				},
				{
					path: '/home',
					element: <Home></Home>,
				},
				{
					path: '/update/:id',
					element: <UpdateReview></UpdateReview>,
					loader: ({ params }) =>
						fetch(`https://bd-photographer-server.vercel.app/update/${params.id}`),
				},
				{
					path: '/about',
					element: <About></About>,
				},
				{
					path: '/service/:id',
					element: <ServiceDetails></ServiceDetails>,
					loader: ({ params }) =>
						fetch(`https://bd-photographer-server.vercel.app/service/${params.id}`),
				},
				{
					path: '/service/:id',
					element: <UpdateReview></UpdateReview>,
					loader: ({ params }) =>
						fetch(`https://bd-photographer-server.vercel.app/service/${params.id}`),
				},

				{
					path: '/services',
					element: <Services></Services>,
				},

				{
					path: '/myreviews',
					element: (
						<PrivateRoute>
							<MyReviews></MyReviews>
						</PrivateRoute>
					),
				},
				{
					path: '/addservices',
					element: (
						<PrivateRoute>
							<AddServices></AddServices>
						</PrivateRoute>
					),
				},
				{
					path: '/blog',
					element: <Blog></Blog>,
				},
				{
					path: '/login',
					element: <LogIn></LogIn>,
				},
				{
					path: '/signup',
					element: <SignUp></SignUp>,
				},
			],
		},
		{
			path: '*',
			element: <Error></Error>,
		},
	]);
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
};

export default Routes;
