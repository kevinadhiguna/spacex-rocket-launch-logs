import React from "react";
import { gql, useQuery } from "@apollo/client";
import RingLoader from "react-spinners/RingLoader";

import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
	query LaunchesQuery {
		launches {
			flight_number
			mission_name
			launch_date_local
			launch_success
		}
	}
`;

function LaunchesQuery() {
	const { loading, error, data } = useQuery(LAUNCHES_QUERY);

	if (loading)
		return (
			<div className="loading">
				<RingLoader size={130} color={"#fff"} />
				<h4>Please wait for a moment ...</h4>
			</div>
		);
	if (error) return <p>Something went wrong, try again later..</p>;

	return data.launches.map((launch) => (
		<LaunchItem key={launch.flight_number} launch={launch} />
	));
}

export default function Launches() {
	return (
		<>
			<h1 className="display-4 my-3">Launches</h1>
			<MissionKey />
			<LaunchesQuery />
		</>
	);
}
