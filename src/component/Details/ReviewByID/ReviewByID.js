import React, { useContext, useEffect, useState } from 'react';
import ReviewLoaderId from './ReviewLoaderId';

const ReviewByID = ({ serviceDetails, reviews }) => {
	const { _id, img, description, title, fee } = serviceDetails;
	const [reviewsId, setReviewsId] = useState([]);
	useEffect(() => {
		fetch(`https://bd-photographer-server.vercel.app/reviews?email=${_id}`)
			.then((res) => res.json())
			.then((data) => setReviewsId(data));
	}, [_id]);
	return (
		<div>
			<h1 className='text-3xl font-medium title-font text-white mb-12 text-center'>
				Reviews
			</h1>
			{reviewsId.length === 0 ? (
				<p className='text-slate-300 text-2xl font-serif '>
					There are no review
				</p>
			) : (
				<div className='grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 '>
					{reviews.map((reviewID) => (
						<ReviewLoaderId
							serviceDetails={serviceDetails}
							reviewID={reviewID}
						></ReviewLoaderId>
					))}
				</div>
			)}
		</div>
	);
};

export default ReviewByID;
