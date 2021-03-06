class Translator {
	static regionToColor(region) {
		//Region: color
		const regionColors = {
			EU: "teal",
			US: "yellow",
			KR: "red",
			TW: "orange",
			CN: "green",
		};
		return regionColors[region];
	}

	static idsToName(regionId, realmId) {
		//Region: [regionId, realmId]
		const idToName = {
			US: [1, 1],
			LatAm: [1, 2],
			EU: [2, 1],
			RUS: [2, 2],
			KR: [3, 1],
			TW: [3, 2],
			CN: [5, 1],
		};
		const result = Object.keys(idToName).find(region => {
			return (
				idToName[region][0] === regionId &&
				idToName[region][1] === realmId
			);
		});

		return result;
	}

	static rankToIcon(rank) {
		const rankIcons = {
			BRONZE: require("../../assets/bronze_league.png"),
			SILVER: require("../../assets/silver_league.png"),
			GOLD: require("../../assets/gold_league.png"),
			PLATINUM: require("../../assets/platinum_league.png"),
			DIAMOND: require("../../assets/diamond_league.png"),
			MASTER: require("../../assets/master_league.png"),
			GRANDMASTER: require("../../assets/grandmaster_league.png"),
			null: null,
		};

		return rankIcons[rank];
	}
}

export default Translator;
