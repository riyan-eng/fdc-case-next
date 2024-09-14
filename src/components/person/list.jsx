import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListPerson } from '@/redux/slice/person';

const ListPerson = () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.person.list);

	const getData = () => {
		dispatch(getListPerson({
			page: currentPage
		}))
	}

	const [currentPage, setCurrentPage] = useState(1);
	function decrement() {
		setCurrentPage(currentPage - 1);
	}
	function increment() {
		setCurrentPage(currentPage + 1);
	}

	useEffect(() => {
		getData()
	}, [currentPage])
	
	return (
		<>
			<div className="join flex justify-center">
				<button className="join-item btn btn-outline" disabled={currentPage === 1 ? true : false} onClick={decrement}>Prev</button>
				<button className="join-item btn btn-outline" disabled={data.totalPage === currentPage ? true : false} onClick={increment}>Next</button>
			</div>
			{
				data.isLoading ? <p className='text-center pt-10'>Loading</p> : <>
					<div className='flex flex-wrap justify-center py-10'>
						{data.data.map((d) => {
							return <div className='p-2' key={d.id}>
								<div className="card card-compact bg-base-100 w-96 shadow-xl pt-10">
									<figure>
										<div className="avatar">
											<div className="mask mask-squircle w-24">
												<img src={d.avatar}  />
											</div>
										</div>
										
									</figure>
									<div className="card-body">
										<h2 className="card-title">{d.first_name}</h2>
										<p>{d.email}</p>
										<div className="card-actions justify-end">
											<button className="btn btn-primary">Send gift</button>
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

export default ListPerson