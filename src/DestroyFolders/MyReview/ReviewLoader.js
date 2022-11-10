import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ReviewLoader = ({ review, image }) => {
	const { img, name, email, message } = review;
	const [reviews, setReviews] = useState([]);
	const [datas, setDatas] = useState([]);
	console.log(review);

	useEffect(() => {
		fetch('https://server-side-roan.vercel.app/reviews')
			.then((res) => res.json())
			.then((data) => setDatas(data));
	}, []);

	//! Delete handler
	const handleDelete = (id) => {
		const proceed = window.confirm(
			'Are you sure , you want to delete this review?'
		);

		// if (proceed) {
		// 	fetch(`https://server-side-roan.vercel.app/reviews/${id}`, {
		// 		method: 'DELETE',
		// 	})
		// 		.then((res) => res.json())
		// 		.then((data) => {
		// 			if (data.deletedCount > 0) {
		// 				toast.success('Deleted successfully!');
		// 				const remaining = reviews.filter((rvw) => rvw._id !== id);
		// 				setReviews(remaining);
		// 			}
		// 		});
		// }
	};
	return (
		<section className='text-gray-400 bg-gray-900 body-font'>
			<div className='container px-5 py-24 mx-auto'>
				<div className=''>
					<div className='p-4  w-full'>
						<div className='h-full bg-gray-800 bg-opacity-40 p-8 rounded'>
							<div className='flex justify-between'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									className='block w-5 h-5 text-gray-500 mb-4'
									viewBox='0 0 975.036 975.036'
								>
									<path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
								</svg>
								<button
									onClick={() => handleDelete()}
									className='bg-slate-400 hover:bg-[#ff3811] px-3 py-2 rounded-xl'
								>
									X
								</button>
							</div>
							<div className='img'>
								<img src={''} alt='' />
							</div>
							<p className='leading-relaxed mb-6'>{message}</p>
							<a className='inline-flex items-center'>
								<img
									alt='testimonial'
									src={img}
									className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
								/>
								<span className='flex-grow flex flex-col pl-4'>
									<span className='title-font font-medium text-white'>
										{name}
									</span>
									<span className='title-font font-medium text-white'>
										{email}
									</span>
									<span className='text-gray-500 text-sm'>REVIEWER</span>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ReviewLoader;