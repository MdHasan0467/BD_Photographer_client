import React, { useEffect, useState } from 'react';
import GalleryLoader from './GalleryLoader';

const Gallery = () => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		fetch('https://bd-photographer-server.vercel.app/GalleryServices')
			.then((res) => res.json())
			.then((data) => setServices(data));
	}, []);
	return (
		<div>
			<h1 className='text-center my-7 text-slate-400 font-semibold font-serif text-2xl'>
				<span className='text-yellow-400'>Gallery :</span> "My Photography
				Sample"
			</h1>
			<div className='grid gap-6 grid-cols-1 md:grid-cols-2 md:p-4 lg:grid-cols-3'>
				{services.map((service) => (
					<GalleryLoader key={service._id} service={service}></GalleryLoader>
				))}
			</div>
		</div>
	);
};

export default Gallery;
