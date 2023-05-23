import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsStarFill } from 'react-icons/bs';
import { FaStarHalfAlt } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../hooks/useTitle';
import ReviewByAllUser from '../ReviewByAllUser/ReviewByAllUser';
// import Review from '../MyReview/Review';

const Details = () => {
	const [reviews, setReviews] = useState([]);
	const { user, loading } = useContext(AuthContext);
	useTitle('Details');
	const serviceDetails = useLoaderData();

	console.log(serviceDetails);
	const { _id, img, description, title, fee } = serviceDetails;

	const handleReview = (e) => {
		e.preventDefault();
		const textarea = e.target.review.value;
		console.log(textarea);

		const newReview = {
			ServiceId: _id,
			message: textarea,
			image: user.photoURL,
			name: user.displayName,
			email: user.email,
		};

		fetch('https://bd-photographer-server.vercel.app/reviews', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(newReview),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					toast.success('You are successfully added your review !!');
					e.target.reset();
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		fetch(`https://bd-photographer-server.vercel.app/reviews/${_id}`)
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, [_id]);
	console.log(reviews);

	if (loading) {
		return <progress className='progress progress-error w-56'></progress>;
	}

	return (
		<div className=' p-6 overflow-hidden py-10 shadow bg-gray-900 text-gray-100 mx-auto'>
			<div className=' p-6 overflow-hidden py-10 shadow bg-gray-900 text-gray-100 mx-auto'>
				<article>
					<img className='w-[50%] h-[400px] mx-auto my-4' src={img} alt='' />
					<h2 className='text-2xl font-serif font-bold'>{title}</h2>
					<p className='mt-4 dark:text-gray-400 text-justify'>{description}</p>
					<div className='lg:flex items-center mt-8 space-x-4'>
						<div className='flex justify-between w-full'>
							<h3 className='text-lg text-secondary font-medium'>
								<span className='font-semibold mr-1 font-serif text-white'>
									Fee :
								</span>
								$ {fee}
							</h3>
						</div>
						<div className='rating flex text-yellow-400'>
							<BsStarFill className='ml-2'></BsStarFill>
							<BsStarFill className='ml-2'></BsStarFill>
							<BsStarFill className='ml-2'></BsStarFill>
							<BsStarFill className='ml-2'></BsStarFill>
							<FaStarHalfAlt className='ml-2'></FaStarHalfAlt>
						</div>
						<Link to='/services'>
							<button className='flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md btn btn-secondary'>
								Back
							</button>
						</Link>
					</div>
				</article>
			</div>
			<br />
			<div>
				{user ? (
					<div>
						<div className='flex m-5'>
							<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
								<div className='w-[50px] rounded-full'>
									<img src={user.photoURL} />
								</div>
							</label>
							<div>
								<h1 className='text-green-500 ml-3 text-2xl font-serif'>
									{user.displayName}
								</h1>
							</div>
						</div>
						<div>
							<form onSubmit={handleReview} className='flex'>
								<textarea
									className='text-gray-700 p-5'
									name='review'
									id=''
									cols='30'
									rows='3'
									placeholder='Give Your Review'
								></textarea>
								<button className='btn btn-secondary ml-2'>Submit</button>
							</form>
						</div>
					</div>
				) : (
					<div className='flex'>
						<p className='mx-5'>To add a review Please</p>
						<Link className='text-secondary hover:text-red-700' to='/login'>
							Login
						</Link>
					</div>
				)}
				<div className='mb-96'>
					<ReviewByAllUser></ReviewByAllUser>
				</div>
			</div>
		</div>
	);
};

export default Details;
