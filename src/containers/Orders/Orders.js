import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorhandler';
import * as actions from '../../store/actions/index';

class Orders extends React.Component {

	componentDidMount() {
		this.props.onFetchOrders();
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
		loading: state.order.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	}
}

export default connect(mapstateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));