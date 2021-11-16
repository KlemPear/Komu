import React from "react";
import { connect } from "react-redux";
import "./css/styles.css";
import logoKomu from "./img/komu_2.png";

class LandingPage extends React.Component {
	render() {
		return (
			<>
				<div className="logo-img">
					<img className="logo" src={logoKomu} alt="logo-komu" />
				</div>

				<div className="heading-text">
					<h1 className="heading">Your music industry agenda roundup.</h1>
					<h3>
						A weekly column highlighting the best music industry events and
						opportunities to your inbox every Monday morning.
					</h3>
				</div>

				<div className="form">
					<form
						action="https://www.getrevue.co/profile/komu/add_subscriber"
						method="post"
						id="revue-form"
						name="revue-form"
						target="_blank"
					>
						<div className="revue-form-group">
							<input
								type="email"
								placeholder="Your email address"
								name="member[email]"
								id="member_email"
							/>
						</div>
						<div className="form-button">
							<input
								className="btn"
								type="submit"
								value="Subscribe"
								name="member[subscribe]"
								id="member_submit"
							/>
						</div>
						<div className="revue-form-footer">
							By subscribing, you agree with Revue’s{" "}
							<a target="_blank" href="https://www.getrevue.co/terms">
								Terms of Service
							</a>{" "}
							and{" "}
							<a target="_blank" href="https://www.getrevue.co/privacy">
								Privacy Policy
							</a>
							.
						</div>
					</form>
				</div>
				<footer id="footer">
					<a className="social-btn" href="mailto:someone@yoursite.com">
						Contact
					</a>
					<a href="https://www.instagram.com/komu.nication">
						{" "}
						<i
							href="https://www.instagram.com/komu.nication"
							className="fab fa-instagram fa-1x social-btn"
						></i>
					</a>
					<a href="https://www.twitter.com/komu_nication">
						{" "}
						<i className="fab fa-twitter fa-1x social-btn"></i>
					</a>
				</footer>
			</>
		);
	}
}

export default connect(null, null)(LandingPage);
