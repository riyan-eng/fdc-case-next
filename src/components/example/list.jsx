import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListExample } from '@/redux/slice/slice';

const ListExample = () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.example.list);

	const getData = () => {
		dispatch(getListExample({
			offset: currentOffset
		}))
	}

	const [currentOffset, setCurrentOffset] = useState(0);
	function decrement() {
		setCurrentOffset(currentOffset - 8);
	}
	function increment() {
		setCurrentOffset(currentOffset + 8);
	}
	console.log(currentOffset);


	useEffect(() => {
		getData()
	}, [currentOffset])
	return (
		<>
			<div className="join flex justify-center">
				<button className="join-item btn btn-outline" disabled={currentOffset === 0 ? true : false} onClick={decrement}>Prev</button>
				<button className="join-item btn btn-outline" onClick={increment}>Next</button>
			</div>
			{
				data.isLoading ? <p className='text-center pt-10'>Loading</p> : <>
					<div className='flex flex-wrap justify-center py-10'>
						{data.data.map((d) => {
							return <div className='p-2' key={d.id}>
								<div className="card card-compact bg-base-100 w-96 shadow-xl">
									<figure>
										<img
											src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
											alt="Shoes" />
									</figure>
									<div className="card-body">
										<h2 className="card-title">{d.title}</h2>
										<p>{d.description}</p>
										<div className="card-actions justify-end">
											<button className="btn btn-primary">Buy Now</button>
										</div>
									</div>
								</div>
							</div>
						})}
					</div>
				</>
			}

		</>
	)
}

export default ListExample