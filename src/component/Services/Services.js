import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../hooks/useTitle';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {
	const { loading } = useContext(AuthContext);
	const [services, setServices] = useState([]);

	useTitle('All Services');
	useEffect(() => {
		fetch('https://bd-photographer-server.vercel.app/services')
			.then((res) => res.json())
			.then((data) => setServices(data));
	}, []);


	if (loading) {
		return <progress className='progress progress-error w-56'></progress>;
	}
	
	return (
		<div>
			<h1 className='font-semibold font-serif text-4xl text-yellow-400 pt-5'>
				All Services :
			</h1>
			<div className='grid gap-6 grid-cols-1 md:grid-cols-2 my-5 md:p-4 lg:grid-cols-3 '>
				{services.map((service) => (
					<ServiceCard key={service._id} service={service}></ServiceCard>
				))}
			</div>
		</div>
	);
};

export default Services;
