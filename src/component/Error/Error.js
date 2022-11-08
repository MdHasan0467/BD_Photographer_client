import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Error = () => {
    return (
			<div>
				<section className='flex items-center h-vh p-16 bg-[#090a27]  text-slate-200'>
					<div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
						<div className='max-w-md text-center'>
                        <h2 className='mb-8 font-extrabold text-9xl text-slate-200'>
								<span className='sr-only'>Error</span>404
							</h2>
							<p className='text-2xl font-semibold md:text-3xl'>
								Sorry, we couldn't find this page.
							</p>
							<p className='mt-4 mb-8'>
								But dont worry, you can find plenty of other things on our
								homepage.
							</p>
							<Link to='/home'>
								<a
									rel='noopener noreferrer'
									href='#'
									className='px-8 py-3 font-semibold rounded bg-white text-[#090a27]'
								>
									Back to home
								</a>
							</Link>
						</div>
					</div>
            </section>
            <Footer></Footer>
			</div>
		);
};

export default Error;