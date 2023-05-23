import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../hooks/useTitle';
import Gallery from '../Gallery/Gallery';
import ServiceCard from '../ServiceCard/ServiceCard';
import Slider from '../Slider/Slider';
import Static from '../Static/Static';

const Home = () => {
	const { loading } = useContext(AuthContext);
	const [services, setServices] = useState([]);
	useTitle('Home');

	useEffect(() => {
		fetch('https://bd-photographer-server.vercel.app/service')
			.then((res) => res.json())
			.then((data) => setServices(data?.reverse()));
	}, []);
	console.log(services);

	if (loading) {
		return <progress className='progress progress-error w-56'></progress>;
	}

	return (
		<div className='min-h-screen'>
			<div className='mt-10'>
				<Slider></Slider>
			</div>
			<div className='py-20'>
				<h1 className='text-center text-yellow-400 font-semibold font-serif text-4xl'>
					My services:
				</h1>
				{
					services &&
				
				<>
				<div className='grid gap-6 grid-cols-1 md:grid-cols-2 md:p-4 lg:grid-cols-3 '>
					{services?.slice(0,3).map((service) => (
						<ServiceCard key={service._id} service={service}></ServiceCard>
					))}
				</div>
				<div className='mt-5'>
					<Link
						to='/services'
						className='bg-white text-[#090a27]  py-2 px-3 rounded'
					>
						See All
					</Link>
				</div>
				</>
}
			</div>
			<div className='my-20'>
				<Static></Static>
			</div>
			<div className='my-20 '>
				<Gallery></Gallery>
			</div>
		</div>
	);
};

export default Home;
