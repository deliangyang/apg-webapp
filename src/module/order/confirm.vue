<template>
	<div class="order-box">
		<div>
			<div v-for="(shopping, index) in shoppingCartData" :key="index">
				<van-card
					:title="shopping.product.title"
					:desc="shopping.product.title"
					:num="shopping.number"
					:price="shopping.amount"
					currency="AU$"
					:thumb="shopping.product.cover" />
			</div>
		</div>
	</div>
</template>


<script>
import { Row, Col, Button, card } from 'vant';
import Vue from 'vue';
Vue.use(Row).use(Col).use(Button).use(card);
export default {
	data() {
		return {
			nonOrders: false,
			currentExpressType: 0,
			expressConfig: [],
			shoppingCarts: [],
			addressId: 0,
			vipAmount: 0,
			products: {},
			orderNo: 0,
			name: '',
			contact: '',
			detail: '',
			total: 0,
			express: '快递',
			expressId: 0,
			expressTotal: 0,
			addValueService: 0,
			couponDiscount: 0,
			couponValue: '暂无可用',
			expressFee: 0,
			shoppingCartIds: '',
			remarks: '',
			expressConfigDescription: 'test',
			defaultExpressDescription: '请选择合适的配送方式'
		};
	},
	methods: {
		loadShoppingCarts(params) {
			this.$axios.get('/api/shopping/cart/', { params: params }).then((res) => {
				this.shoppingCarts = res.data;
			});
		},
	},
	created() {
		const query = this.$route.query;
		this.shoppingCartIds = query.ids;
	},
	mounted() {
		this.$nextTick((res) => {
			this.loadShoppingCarts({
				shoppingCartIds: this.shoppingCartIds,
			});
		});
	},
	computed: {
		shoppingCartData: function() {
            return this.shoppingCarts.map((element) => {
                return {
                    ...element,
                    amount: (element.amount / 100).toFixed(2),
                };
            });
        },
	}
};
</script>

<style lang="less">
.order-box {
  position: relative;
  margin-bottom: 140px;
  div-scroll {
    margin-bottom: 200px;
  }
  .order-address {
    padding: 20px;
    background-color: #ffffff;
    font-size: 30px;
    color: #333;
    .detail-info {
      .edit {
        color: #fb444b;
      }
    }
    .location,
    .edit {
      color: #999;
      font-size: 32px;
      margin-top: 10px;
    }
    .address {
      color: #999;
    }
    .location {
      color: #fb444b;
    }
  }
  .order-items {
    margin-bottom: 20px;
    .item {
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      background-color: #ffffff;
      .product-image {
        text-align: center;
        image {
          height: 160px;
          width: 160px;
        }
      }
      .product-title {
        height: 120px;
        font-size: 36px;
        color: #333;
      }
      .product-amount {
        font-size: 30px;
      }
      .product-number {
        font-size: 30px;
      }
    }
  }
  .shopping-cart-total {
    text-align: right;
    color: #666;
    font-size: 30px;
    background-color: #ffffff;

    padding: 10px 0;
    .total-text {
      display: inline-block;
      margin-left: 10px;
      margin-right: 20px;
    }
    .total-real-amount {
      color: #fb444b;
      display: inline-block;
      margin-right: 20px;
    }
  }
  .express {
    .calc-express {
      color: #999;
    }
  }
  .remark {
    margin-bottom: 40px;
  }
  .remark,
  .express,
  .value-add-service {
    padding: 10px;
    background-color: #ffffff;
    font-size: 30px;
  }
  .value-add-service {
    .service-text {
      color: #999;
    }
    .item-1,
    .service-text {
      border-bottom: 1px solid #eeeeee;
    }
    .item-1,
    .item-2,
    .service-text {
      padding: 20px 10px;
    }
    .item-1,
    .item-2 {
      .amount {
        color: #fb444b;
        text-align: right;
        display: inline-block;
      }
    }
  }
  .remark {
    color: #666;
    .content {
      padding: 20px 0;
      .remark-content {
        margin-top: 4px;
        display: inline-block;
      }
    }
    .settlement {
      padding: 20px;
      border-top: 1px solid #eeeeee;
      text-align: right;
      text {
        display: inline-block;
      }
    }
  }
  .submit {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 40;
    border-top: 1px solid #eeeeee;
    background-color: #ffffff;
    color: #666;
    text-align: right;
    .total {
      font-size: 36px;
      padding: 20px 5px;
    }
  }
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.margin-top-20 {
  margin-top: 20px;
}
.margin-bottom {
  margin-bottom: 40px;
  height: 80px;
}
.text-align-right {
  text-align: right;
  padding-right: 20px;
}
.express-config-box {
  margin-top: 20px;
  background-color: #ffffff;
  padding: 10px;
  .express-type {
    padding-top: 12px;
    padding-left: 10px;
    font-size: 30px;
    color: #999;
    margin-bottom: 10px;
  }
  .express-config {
    display: inline-block;
    margin: 10px;
  }
  .express-description {
    color: #666;
    padding-left: 10px;
    font-size: 24px;
  }
}
.coupon {
  padding: 20px;
  padding-left: 20px;
  background-color: #ffffff;
  font-size: 30px;
  .coupon-value {
    padding-right: 0;
    color: #666;
  }
}
.real-amount {
  .aud-cny {
    font-size: 24px;
  }
}
</style>
