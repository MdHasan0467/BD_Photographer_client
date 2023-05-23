import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import MyReviewsLoader from '../MyReviews/MyReviewsLoader';
import useTitle from '../../hooks/useTitle';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';








const MyReviews = () => {



	//! Dynamically Title added by custom hook...
	useTitle('My Reviews');

	//! Bring user info From Context API...
	const { user } = useContext(AuthContext);

	//! useState for storing data which get by email && _id for delete data...
	const [reviews, setReviews] = useState([]);


	//! get data from mongodb by user email...&& get JWT token from the local storage by using header...
	useEffect(() => {
		fetch(`https://bd-photographer-server.vercel.app/reviews?email=${user?.email}`, {
			headers: {
				authorizaion:`Bearer ${localStorage.getItem('Login-token')}`
			}
		})
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, [user?.email]);

	//! Handle Delete
	const handleDelete = (id) => {
		const proceed = window.confirm(
			'Are you sure , you want to delete this review?'
		);

		if (proceed) {
			fetch(`https://bd-photographer-server.vercel.app/reviews/${id}`, {
				method: 'DELETE',
			})
				.then((res) => res.json())
				.then((data) => {
					
					if (data.deletedCount > 0) {
						toast.error('Delete Successfully ');
						const remaining = reviews.filter((rvw) => rvw._id !== id);
						setReviews(remaining);
					}
				});
		}
	};



			

	return (
		<div className='min-h-screen'>
			<div className='flex justify-between mb-20 mt-5'>
				<div>.</div>
				<h1 className='lg:text-3xl font-medium title-font text-cyan-500 mb-12 text-center'>
					<span className='text-white'>All Reviews For</span> {user.email}
				</h1>
				<Link to='/services'>
					<button className='flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md btn btn-accent'>
						All Services
					</button>
				</Link>
			</div>
			<div>
				<h1 className='text-secondary'>Total review : {reviews.length}</h1>
				{reviews.length === 0 ? (
					<p className='text-slate-300 text-2xl font-serif '>
						There are no review
					</p>
				) : (
					<div className='grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 '>
						{reviews.map((review) => (
							<MyReviewsLoader
								key={review._id}
								review={review}
								handleDelete={handleDelete}
							></MyReviewsLoader>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MyReviews;



