import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import ReviewLoader from './ReviewLoader';

const Review = ({ image }) => {
	const { user } = useContext(AuthContext);
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		fetch(`https://server-side-roan.vercel.app/reviews?email=${user.email}`)
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, [user?.email]);
	return (
		<div>
			<h1 className='text-3xl font-medium title-font text-white mb-12 text-center'>
				Reviews
			</h1>
			{reviews.length === 0 ? (
				<p className='text-slate-300 text-2xl font-serif '>
					There are no review
				</p>
			) : (
				<div className='grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 '>
					{reviews.map((review) => (
						<ReviewLoader key={review._id} review={review}></ReviewLoader>
					))}
				</div>
			)}
		</div>
	);
};

export default Review;