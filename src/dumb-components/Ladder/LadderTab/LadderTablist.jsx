import React from "react";
import { Tablist, SidebarTab } from "evergreen-ui";
import GrandmasterTab from "../Grandmaster/GrandmasterTab";

function LadderTablist(props) {
	const { currentSeason, context } = props;
	return (
		<Tablist marginBottom={16} flexBasis={240} marginRight={24}>
			{currentSeason[0].ladder.map((ladder, index) => (
				<SidebarTab
					key={ladder.ladderId}
					id={ladder.ladderId}
					onSelect={() =>
						context.setState({
							selectedIndex: index,
						})
					}
					isSelected={index === context.state.selectedIndex}
					aria-controls={`panel-${ladder.ladderName}`}
				>
					{`${ladder.ladderName} - ${ladder.league} ${
						ladder.matchMakingQueue
					}`}
				</SidebarTab>
			))}
			<GrandmasterTab context={context} currentSeason={currentSeason} />
		</Tablist>
	);
}

export default LadderTablist;
