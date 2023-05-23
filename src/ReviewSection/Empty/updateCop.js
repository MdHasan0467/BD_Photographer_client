import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ReviewRow = ({ handleRemoveReview, review }) => {
	const [service, setService] = useState();
	const { service_id, feedback } = review;
	const [reviewId, setUpdateReviewId] = useState('');
	const [update, setUpdate] = useState(false);
	const [defaultReview, setDefaultReview] = useState('');

	useEffect(() => {
		fetch(`https://bd-photographer-server.vercel.app/service/${service_id}`)
			.then((res) => res.json())
			.then((data) => setService(data?.service))
			.catch((err) => console.log(err.message));
	}, [service_id]);

	const handleReviewConfirmation = (review) => {
		setUpdateReviewId('');
		Swal.fire({
			title: 'Are you sure?',
			text: 'Update This Review!',
			buttons: true,
			dangerMode: true,
		}).then((data) => {
			if (data) {
				setUpdate(true);
				setUpdateReviewId(review._id);
				setDefaultReview(review.review);
			} else {
				console.log('error');
			}
		});
	};

	// const feedback = event.target.feedback.value;
	const handleUpdate = (event) => {
		event.preventDefault();
		const form = event.target;
		const feedback = form.feedback.value;
		fetch(`https://bd-photographer-server.vercel.app/reviews/${reviewId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ feedback }),
		})
			.then((res) => res.json())
			.then((data) => {
				setDefaultReview('');
				if (data.reviews.matchedCount > 0) {
					toast.success('Review Removed', { autoClose: 1000 });
					setUpdate(false);
					form.reset();
				}
			});
	};

	return (
		<tr>
			<td>
				<div className='flex items-center space-x-3'>
					<div className='avatar'>
						<div className='w-24 h-24 rounded'>
							{service?.img && <img src={service.img} alt='' />}
						</div>
					</div>
				</div>
			</td>
			<td>
				<textarea
					className='w-full rounded-none p-3 font-medium resize-none'
					disabled
					placeholder={feedback}
				></textarea>
			</td>
			<td className='text-error font-bold'>${service?.price}</td>
			<th>
				<button
					onClick={() => handleRemoveReview(review._id)}
					className='btn btn-sm btn-ghost'
				>
					Delete
				</button>
				<button
					onClick={() => {
						return handleReviewConfirmation(review);
					}}
				>
					Update
				</button>
				<div
					className={`bg-white/70 w-full h-full py-10   top-0 left-0 ${
						update ? 'absolute ' : ' hidden'
					} `}
				>
					<h3 className='text-3xl text-red-600 font-bold text-center py-10'>
						Review Update Section
					</h3>
					<div className='flex flex-col items-center  mx-auto justify-center p-8 shadow-sm rounded-xl lg:p-12 md:w-[50%] bg-white border text-gray-900'>
						<div className='flex flex-col items-center w-full'>
							<h2 className='text-3xl font-semibold text-center'>
								Your opinion matters!
							</h2>
							<div className='flex flex-col items-center py-6 space-y-3'>
								<span className='text-center'>How was your experience?</span>
							</div>

							<form onSubmit={handleUpdate} className='flex flex-col w-full'>
								<textarea
									name='feedback'
									rows='3'
									placeholder='Message...'
									defaultValue={defaultReview}
									className='p-4 rounded-md border-2 border-black resize-none text-gray-900 bg-white'
								></textarea>
								<button
									type='submit'
									className='py-4 my-8 font-semibold rounded-md text-white bg-primary'
								>
									Update feedback
								</button>
							</form>
						</div>
						<div className='flex items-center justify-center'>
							<button
								onClick={() => setUpdate(false)}
								className='text-xl text-gray-400'
							>
								Maybe later
							</button>
						</div>
					</div>
				</div>
			</th>
		</tr>
	);
};

export default ReviewRow;
