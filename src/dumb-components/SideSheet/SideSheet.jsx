const React = require("react");
const { SideSheet, Pane, Heading, Card, Button } = require("evergreen-ui");
const MenuIcon = require("../MenuIcon/MenuIcon");
const SidesheetContent = require("./SidesheetContent");
const { withRouter } = require("react-router-dom");

class SideSheetComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isShown: false,
		};
		this.navigationHandlers = this.navigationHandlers.bind(this);
	}

	navigationHandlers() {
		return {
			changeProfile: () => this.props.history.push("/choose-profile"),
			logout: () => {
				localStorage.clear();
				this.props.history.push("/login");
			},
		};
	}

	render() {
		return (
			<div>
				<SideSheet
					isShown={this.state.isShown}
					onCloseComplete={() => this.setState({ isShown: false })}
					containerProps={{
						display: "flex",
						flex: "1",
						flexDirection: "column",
					}}
				>
					<Pane
						zIndex={1}
						flexShrink={0}
						elevation={0}
						backgroundColor="white"
					>
						<Pane padding={16}>
							<Heading size={600}>SC2 Stats Menu</Heading>
						</Pane>
					</Pane>
					<Pane
						flex="1"
						overflowY="scroll"
						background="tint1"
						padding={16}
					>
						<Card
							backgroundColor="white"
							elevation={0}
							height={"100%"}
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<SidesheetContent
								handlers={this.navigationHandlers()}
							/>
						</Card>
					</Pane>
				</SideSheet>
				<MenuIcon onClick={() => this.setState({ isShown: true })} />
			</div>
		);
	}
}

module.exports = withRouter(SideSheetComponent);
