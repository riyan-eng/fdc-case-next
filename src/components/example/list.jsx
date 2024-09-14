import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListExample, postExample, deleteExample } from '@/redux/slice/example';

const ListExample = () => {
	const dispatch = useDispatch();

	// list
	const data = useSelector(state => state.example.list);
	const created = useSelector(state => state.example.create.isSuccess);
	const deleted = useSelector(state => state.example.delete.isSuccess);
	const getData = () => {
		dispatch(getListExample({
			page: currentPages
		}))
	}
	const [currentPages, setCurrentPages] = useState(1);
	function decrement() {
		setCurrentPages(currentPages - 1);
	}
	function increment() {
		setCurrentPages(currentPages + 1);
	}

	// create
	var initForm = {
		name: "",
		detail: ""
	}
	const [form, setForm] = useState(initForm)
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(postExample(form))
		setForm(initForm)
	}

	// delete
	const del =(id)=>{
		dispatch(deleteExample({id: id}))
	}
	
	useEffect(() => {
		getData()
	}, [currentPages, created, deleted])
	return (
		<>
			<div className='flex justify-center'>
				<div className='flex flex-col p-4 xl:w-96 md:w-96 w-full'>
					<form onSubmit={handleSubmit}>
						<div className='pb-2'>
							<input
								type="text"
								placeholder="Type here"
								className="input input-bordered input-info w-full"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
							/>
						</div>
						<div>
							<textarea
								className="textarea textarea-info w-full"
								placeholder="Bio"
								value={form.detail}
								onChange={(e) => setForm({ ...form, detail: e.target.value })}
							></textarea>
						</div>
						<div className='flex justify-end'>
							<button className="btn btn-primary" type='submit'>Submit</button>
						</div>
					</form>
				</div>

			</div>
			<div className="join flex justify-center">
				<button className="join-item btn btn-outline" disabled={currentPages === 1 ? true : false} onClick={decrement}>Prev</button>
				<button className="join-item btn btn-outline" disabled={currentPages === data.totalPages ? true : false} onClick={increment}>Next</button>
			</div>
			{
				data.isLoading ? <p className='text-center pt-10'>Loading</p> : <>
					<div className='flex flex-wrap justify-center py-10'>
						{data.data.map((d) => {
							return <div className='p-2' key={d.id}>
								<div className="card bg-base-100 w-96 shadow-xl">
									<div className="card-body">
										<h2 className="card-title">{d.name}</h2>
										<p>{d.detail}</p>
										<div className="card-actions justify-end">
											<button onClick={(e)=> {del(d.id)}} className="btn btn-error">Delete</button>
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