import "./DashboardCard.scss";
const DashboardCard = ({ user }) => {
	return (
		<>
			<div className="dashboard-card">
				<h1 className="dashboard-card__heading">
					{user.name}'s profile
				</h1>
				<div className="dashboard-card__body">
					<img
						className="dashboard-card__img"
						alt="user.name"
						src={user.picture}
					></img>
					<div className="dashboard-card__info">
						<h2>
							<span className="bold">{user.name}</span>,{" "}
							{user.breed}
						</h2>
						<h3>{user.age}</h3>
						{/* if the  character is not an array but a string simply renders a p tag with that string*/}
						<ul className="character">
							{Array.isArray(user.character) ? (
								user.character.map((x) => {
									return <li key={x}>{x}</li>;
								})
							) : (
								<p>{user.character}</p>
							)}
						</ul>
						<p>{user.bio}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardCard;
