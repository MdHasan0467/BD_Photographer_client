import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useTitle from '../../hooks/useTitle';

const AddServices = () => {
	const { loading } = useContext(AuthContext);
	const [addservices, setAddservices] = useState({});
	useTitle('Home');
	if (loading) {
		return <progress className='progress progress-error w-56'></progress>;
	}
	const handleSubmit = (e) => {
		
		e.preventDefault();
		console.log(addservices);

		fetch('https://bd-photographer-server.vercel.app/services', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(addservices),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					toast.success('New Service Successfully Added!');
					e.target.reset();
				}
			});
	};
	const handleBlue = (e) => {
		const fieldName = e.target.name;
		const value = e.target.value;
		const newServices = { ...addservices };
		newServices[fieldName] = value;
		setAddservices(newServices);
	};
	return (
		<div className='mt-10 min-h-screen'>
			<h1 className='text-4xl text-secondary my-6 font-serif '>
				Add a service
			</h1>
			<div className='flex justify-between mb-20'>
				<div>.</div>
				<Link to='/services'>
					<button className='flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md btn btn-accent'>
						All Services
					</button>
				</Link>
			</div>
			<form className='' onSubmit={handleSubmit}>
				<div className='lg:grid grid-cols-2 gap-10'>
					<div className='group'>
						<p className='text-secondary text--2xl font-serif'>Photo URL :</p>
						<input
							className='input input-bordered input-info w-full max-w-xs'
							onBlur={handleBlue}
							type='text'
							name='img'
							placeholder='URL'
							id=''
							required
						/>

						<p className='text-secondary text--2xl font-serif'>Title :</p>
						<input
							onBlur={handleBlue}
							type='text'
							name='title'
							placeholder='Title'
							className='input input-bordered input-info w-full max-w-xs'
							required
						/>
					</div>
					<div className='group'>
						<p className='text-secondary text--2xl font-serif'>Fee :</p>
						<input
							onBlur={handleBlue}
							type='number'
							name='fee'
							placeholder='Fee'
							className='input input-bordered input-info w-full max-w-xs'
							required
						/>

						<p className='text-secondary text--2xl  font-serif'>
							Description :
						</p>
						<input
							className='textarea textarea-info w-full max-w-xs'
							onBlur={handleBlue}
							type='text'
							name='description'
							placeholder='Description'
							id=''
							required
						/>
					</div>
				</div>
				<button className='btn btn-secondary my-5'>Add Services</button>
			</form>
		</div>
	);
};

export default AddServices;
