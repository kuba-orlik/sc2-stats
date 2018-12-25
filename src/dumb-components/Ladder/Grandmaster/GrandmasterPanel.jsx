import React from "react";
import { Pane } from "evergreen-ui";
import LadderTable from "../LadderTable/LadderTable";
import LadderHeader from "../LadderHeader/LadderHeader";

function GrandmasterPanel(props) {
	const { currentSeason } = props;
	console.log(props);
	return (
		<React.Fragment>
			{currentSeason[0].ladder.length ===
			props.context.state.selectedIndex ? (
				<Pane
					key={99}
					id={`panel-grandmaster`}
					role="tabpanel"
					aria-labelledby={"Grandmaster"}
					aria-hidden={
						currentSeason[0].ladder.length !==
						props.context.state.selectedIndex
					}
				>
					<Pane
						display="grid"
						gridTemplateColumns="20% 70% "
						alignItems="center"
					>
						<LadderHeader
							league="GRANDMASTER"
							ladderName="Grandmaster"
							ladderId="--"
							data={{
								currentLadderMembership: {
									localizedGameMode: "1v1",
								},
							}}
						/>
						<LadderTable ladderTeams={props.data.ladderTeams} />
					</Pane>
				</Pane>
			) : null}
		</React.Fragment>
	);
}

export default GrandmasterPanel;