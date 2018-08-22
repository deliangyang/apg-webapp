<template>
	<div class="order-box">
    <div class="address-box">
      <van-contact-card
        :type="cardType"
        :name="currentContact.name"
        :tel="currentContact.tel"
        @click="showList = true" />

      <!-- 联系人列表 -->
      <van-popup v-model="showList" position="bottom">
        <van-contact-list
          v-model="chosenContactId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"/>
      </van-popup>

      <!-- 联系人编辑 -->
      <van-popup v-model="showEdit" position="bottom">
        <van-contact-edit
          :contact-info="editingContact"
          :is-edit="isEdit"
          @save="onSave"
          @delete="onDelete"/>
      </van-popup>
    </div>
		<div>
			<div class="item" v-for="(shopping, index) in shoppingCartData" :key="index">
				<van-card
					:title="shopping.product.title"
					:desc="shopping.product.title"
					:num="shopping.number"
					:price="shopping.amount"
					currency="AU$"
					:thumb="shopping.product.cover" />
			</div>
		</div>

    <div class="express">
      <div class="title">配送方式</div>
      <div class="items">
        <span v-for="(express, index) in expresses" :key="index">
          <van-button v-if="index === currentExpressType" @click="choiceExpressType(index)" type="danger" plain size="small">{{express.name}}</van-button>
          <van-button v-else @click="choiceExpressType(index)" type="default" plain size="small">{{express.name}}</van-button>
        </span>
      </div>
      <div class="title">配送说明</div>
      <div class="items description">
        {{exportDesc}}
      </div>
    </div>
	</div>
</template>


<script>
import { Row, Col, Button, card, ContactCard, ContactList, ContactEdit, Popup } from 'vant';
import Vue from 'vue';
Vue.use(Row).use(Col).use(Button).use(card).use(ContactCard)
  .use(ContactList)
  .use(Popup)
  .use(ContactEdit);
export default {
	data() {
		return {
			nonOrders: false,
			currentExpressType: -1,
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
      defaultExpressDescription: '请选择合适的配送方式',
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      }],
      expresses: [],
		};
	},
	methods: {
		loadShoppingCarts(params) {
			this.$axios.get('/api/shopping/cart/', { params: params }).then((res) => {
				this.shoppingCarts = res.data;
			});
    },
    loadExpress(params) {
      this.$axios.get('/api/express/fee', { params: params }).then((res) => {
        this.expresses = res.data.expressFee;
      });
    },
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },
    onSelect() {
      this.showList = false;
    },
    choiceExpressType(index) {
      if (index === this.currentExpressType) {
        this.currentExpressType = -1;
      } else {
        this.currentExpressType = index;
      }
      console.log(this.currentExpressType);
    },
    onSave(info) {
      this.showEdit = false;
      this.showList = false;
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
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
      this.loadExpress({
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
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
    exportDesc() {
      if (this.currentExpressType >= 0) {
        return this.expresses[this.currentExpressType].description || '暂无';
      }
      return '暂无';
    }
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
.order-box {
  .item {
    border-bottom: 2px solid #ffffff;
  }
  .item:last-child {
    border: none;
  }
  .express {
    margin-top: 5px;
    background-color: #ffffff;
    .title,
    .items {
      padding: 5px 10px;
    }
    .title {
      font-size: 14px;
      border-bottom: 1px #eeeeee solid;
      padding: 10px;
      color: #666;
    }
    .items {
      span {
        button.van-button {
          display: inline-block;
          margin: 2px 4px 2px 0;
        }
      }
    }
    .description {
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
