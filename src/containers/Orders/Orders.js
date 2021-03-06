import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorhandler';
import * as actions from '../../store/actions/index';

class Orders extends React.Component {

	componentDidMount() {
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = 
				this.props.orders.map(order => (
					<Order 
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}/>
				));
		}
		return (
			<div>
				{orders}
			</div>
		);
	}
}

const mapstateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	}
}

export default connect(mapstateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));