import React from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
	return (
		<div>
			<components.Option {...props}>
				<input
					type="checkbox"
					checked={props.isSelected}
					onChange={() => null}
				/>{" "}
				<label>{props.label}</label>
			</components.Option>
		</div>
	);
};

class CustomSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			optionSelected: null,
		};
	}

	handleChange = (selected) => {
		this.setState({
			optionSelected: selected,
		});
		this.props.onSelect(selected);
	};

	render() {
		return (
			<span
				className="d-inline-block"
				data-toggle="popover"
				data-trigger="focus"
				data-content="Please select account(s)"
			>
				<ReactSelect
					options={this.props.Options}
					isMulti
					closeMenuOnSelect={false}
					hideSelectedOptions={true}
					components={{
						Option,
					}}
					onChange={this.handleChange}
					allowSelectAll={true}
					value={this.state.optionSelected}
				/>
			</span>
		);
	}
}

export default CustomSelect;
