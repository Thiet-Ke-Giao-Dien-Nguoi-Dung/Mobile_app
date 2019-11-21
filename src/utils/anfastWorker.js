import { Constants, log } from './Omni';

const ANFAST_DOMAIN = Constants.devDomain;
class AnFastWorker {
  init = ({ baseUrl, token }) => {
    this.baseUrl = baseUrl || ANFAST_DOMAIN;
    this.authzToken = token || '';
  };

  setToken(token) {
    if (token) this.authzToken = token;
  }

  setBaseUrl(url) {
    if (url) this.baseUrl = url;
  }

  clearToken() {
    this.authzToken = '';
  }

  loadOrders = async (page, pageSize, filters) => {
    if (this.authzToken) {
      const res = await this.get('/supplier/v1/admin/orders/search', {
        params: { page, pageSize, ...filters },
      });

      return res;
    }

    return undefined;
  };

  loadOrderDetail = async (orderNumber) => {
    if (this.authzToken) {
      const res = await this.get(`/supplier/v1/admin/orders/${orderNumber}`);

      return res;
    }

    return undefined;
  };

  loadSyntheticData = async (customerId, deliveryDate) => {
    if (this.authzToken) {
      const res = await this.get(`/v2/be/order/orders/${customerId}?requireTime=${deliveryDate}`); // set api to anfast already
      // log(res)
      return res;
    }

    return undefined;
  };

  login = async (username, password) => { // set api to anfast already
    const res = await this.post('/v1/laichau/access/login', {   // laichau
      params: { name: username, password }
    });

    return res;
  };

  loadUserProfile = async (userId) => {
    if (this.authzToken) {
      const res = await this.get(`/v1/laichau/user/${userId}`); // laichau

      return res;
    }

    return undefined;
  };

  changePassword = async (payload) => {
    if (this.authzToken) {
      const res = await this.put('/v1/laichau/user/password', { params: payload }); // laichau

      return res;
    }

    return undefined;
  };

  changeProfile = async (code,payload) => {
    if (this.authzToken) {
      const res = await this.put(`/v1/laichau/user/${code}`, { params: payload }); // laichau

      return res;
    }

    return undefined;
  };

  loadSchedule = async (scheduleCode) => {
    if(this.authzToken){
      const res = await this.get(`/v1/laichau/schedule/${scheduleCode}`); // laichau

      return res;
    }
    return undefined;
  }

  loadScheduleEmployee = async (scheduleCode,employeeCode) => {
    if(this.authzToken){
      const res = await this.get(`/v1/laichau/schedule/${scheduleCode}/${employeeCode}`); // laichau

      return res;
    }
    return undefined;
  }
  

  confirmOrderShipped = async (orderNumber) => {
    if (this.authzToken) {
      const res = await this.put(
        `/supplier/v1/admin/orders/state/next?orderNumbers=${orderNumber}`
      );

      return res.error ? res : res.Data;
    }

    return undefined;
  };

  confirmOrderCompleted = async (orderNumber) => {
    if (this.authzToken) {
      const res = await this.put(`/supplier/v1/admin/orders/${orderNumber}/complete`);

      return res.error ? res : res.Data;
    }

    return undefined;
  };

  confirmLineItemsShipped = async (payload) => {
    if (this.authzToken) {
      const res = await this.post('/supplier/v1/admin/orders/pos/shipped', {
        params: payload,
      });

      return res;
    }

    return undefined;
  };

  confirmLineItemReturned = async (orderNumber, productCode) => {
    if (this.authzToken) {
      const res = await this.put(`/supplier/v1/admin/orders/${orderNumber}/${productCode}/return`);

      return res.error ? res : res.Data;
    }

    return undefined;
  };

  updateLineItemWeight = async (orderNumber, payload) => {
    if (this.authzToken) {
      const res = await this.put(`/supplier/v1/admin/orders/${orderNumber}/weight`, {
        params: payload,
      });

      return res;
    }

    return undefined;
  };

  generateOrderPdfPromise = async (orderNumber) => {
    if (this.authzToken) {
      const orderNumberArr = Array.isArray(orderNumber) ? orderNumber : [orderNumber];
      return this.get('/supplier/v1/reports/printorders', {
        params: {
          DisableLogo: false,
          OrderNumnerCodes: orderNumberArr.join(','),
        },
      });
    }

    return Promise.resolve(false);
  };

  loadMessages = async (userId, payload) => {
    log("token" + this.authzToken)
    if (this.authzToken) {
      const params = payload;
      const res = await this.get(`/v1/laichau/notification/${userId}`, {   // laichau
        params,
      });

      return res;
    }

    return undefined;
  };

  setMessageRead = async (notiId, userId) => {
    if (this.authzToken) {
      const res = await this.put(`/v1/laichau/notification/${notiId}?userId=${userId}`);  //laichau

      return res;
    }

    return undefined;
  };

  loadRestEmployee = async (scheduleCode, employeeCode) => {
    if (this.authzToken) {
      const res = await this.get(`/v1/laichau/user/register/${employeeCode}/${scheduleCode}`);  //laichau

      return res;
    }

    return undefined;
  };

  registryRestEmployee = async (scheduleCode, employeeCode,payload) => {
    if (this.authzToken) {
      const res = await this.put(`/v1/laichau/user/register/${employeeCode}/${scheduleCode}`,{
        params: {
          accepted: payload.accepted,
          end1: payload.to1,
          end2: payload.to2,
          priority1: payload.priority1,
          priority2: payload.priority2,
          start1: payload.from1,
          start2: payload.from2
        }
      });  //laichau

      return res;
    }

    return undefined;
  };
  

  loadCustomersRoute = async (dateTime) => { // async
    if (this.authzToken) {
      
      const res = await this.get(`/v2/scheduling/get-schedule-driver?executionTime=${dateTime}`);
      return res;
    }

    return undefined;
  };

  loadCustomers = async (payload) => {
    if (this.authzToken) {
      const params = payload;
      const res = await this.get('/supplier/v1/customers/', {
        params,
      });

      return res;
    }

    return undefined;
  };

  registerFirebaseDevice = (registrationKey,userId) => {
    if (this.authzToken) {
      return this.post('/v1/laichau/userTokens', {      // lai chau
        params: { 
          role:"employee",
          token: registrationKey,
          userId:userId
        },
      })
        .then(res => res)
        .catch(() => {});
    }

    return Promise.resolve(undefined);
  };

  removeFirebaseDevice = (registrationKey, userId) => this.delete(`/v1/laichau/userTokens/${userId}?token=${registrationKey}`, {   // lai chau
    // params: { 
    //   token: registrationKey,
    // },
    // headers: { Authorization: `Bearer ${userToken}` },
  })
    .then(res => res)
    .catch(() => {});

  getImageConfirm = async (customerCode) => {
    if (this.authzToken) {
      const res = await this.get(`/supplier/v1/suppliers/${customerCode}`);

      return res;
    }

    return undefined;
  };

  

  loadAllCustomersRoute = async (dateTime, payload) => {
    if (this.authzToken) {
      // const res = await this.get(`/v2/scheduling/get-schedule-driver?executionTime=${dateTime}`);
      const res = {
        data: {
          items: [
            {
              customerId: '1',
              customerCode: 'KH1111',
              name: 'Trung văn',
              phone: '0987654321',
              address: '',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-2123', name: 'Giáo viên', isConfirm: true
                },
                {
                  cartId: 211, cartCode: 'CART-2222', name: 'Học sinh', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585, // / 21.045643, 105.782585 HQV
              weight: 12,
              driverConfirmId: 1,
              driverShippingId: 2,
              index: 1,
              isArrived: true,
            },
            {
              customerId: '2',
              customerCode: 'KH222',
              name: 'Tiểu học Nam Trung Yên',
              phone: '0987654321',
              address: 'Nam Trung Yên',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-222A', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'CART-222B', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'CART-222C', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 2,
              isArrived: true,
            },
            {
              customerId: '3',
              customerCode: 'KH112',
              name: 'Tiểu học Yên Hoà',
              phone: '0987654321',
              address: 'Yên Hoà',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 3,
              isArrived: false,
            },
            {
              customerId: '4',
              customerCode: 'KH113',
              name: 'Tiểu học Dịch vọng A',
              phone: '0987654321',
              address: 'Dịch vọng',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 2131, cartCode: 'KH01', name: 'Nhân viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: true
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.035635,
              longitude: 105.786369, // / 21.035635, 105.786369 home
              weight: 12,
              driverConfirmId: 2,
              driverShippingId: 1,
              index: 4,
              isArrived: false,
            },
            {
              customerId: '1',
              customerCode: 'KH1111',
              name: 'Trung văn',
              phone: '0987654321',
              address: '',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-2123', name: 'Giáo viên', isConfirm: true
                },
                {
                  cartId: 211, cartCode: 'CART-2222', name: 'Học sinh', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585, // / 21.045643, 105.782585 HQV
              weight: 12,
              driverConfirmId: 1,
              driverShippingId: 2,
              index: 1,
              isArrived: true,
            },
            {
              customerId: '2',
              customerCode: 'KH222',
              name: 'Tiểu học Nam Trung Yên',
              phone: '0987654321',
              address: 'Nam Trung Yên',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-222A', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'CART-222B', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'CART-222C', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 2,
              isArrived: true,
            },
            {
              customerId: '3',
              customerCode: 'KH112',
              name: 'Tiểu học Yên Hoà',
              phone: '0987654321',
              address: 'Yên Hoà',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 3,
              isArrived: false,
            },
            {
              customerId: '4',
              customerCode: 'KH113',
              name: 'Tiểu học Dịch vọng A',
              phone: '0987654321',
              address: 'Dịch vọng',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 2131, cartCode: 'KH01', name: 'Nhân viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: true
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.035635,
              longitude: 105.786369, // / 21.035635, 105.786369 home
              weight: 12,
              driverConfirmId: 2,
              driverShippingId: 1,
              index: 4,
              isArrived: false,
            },
            {
              customerId: '1',
              customerCode: 'KH1111',
              name: 'Trung văn',
              phone: '0987654321',
              address: '',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-2123', name: 'Giáo viên', isConfirm: true
                },
                {
                  cartId: 211, cartCode: 'CART-2222', name: 'Học sinh', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585, // / 21.045643, 105.782585 HQV
              weight: 12,
              driverConfirmId: 1,
              driverShippingId: 2,
              index: 1,
              isArrived: true,
            },
            {
              customerId: '2',
              customerCode: 'KH222',
              name: 'Tiểu học Nam Trung Yên',
              phone: '0987654321',
              address: 'Nam Trung Yên',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-222A', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'CART-222B', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'CART-222C', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 2,
              isArrived: true,
            },
            {
              customerId: '3',
              customerCode: 'KH112',
              name: 'Tiểu học Yên Hoà',
              phone: '0987654321',
              address: 'Yên Hoà',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 3,
              isArrived: false,
            },
            {
              customerId: '4',
              customerCode: 'KH113',
              name: 'Tiểu học Dịch vọng A',
              phone: '0987654321',
              address: 'Dịch vọng',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 2131, cartCode: 'KH01', name: 'Nhân viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: true
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.035635,
              longitude: 105.786369, // / 21.035635, 105.786369 home
              weight: 12,
              driverConfirmId: 2,
              driverShippingId: 1,
              index: 4,
              isArrived: false,
            },
            {
              customerId: '1',
              customerCode: 'KH1111',
              name: 'Trung văn',
              phone: '0987654321',
              address: '',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-2123', name: 'Giáo viên', isConfirm: true
                },
                {
                  cartId: 211, cartCode: 'CART-2222', name: 'Học sinh', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585, // / 21.045643, 105.782585 HQV
              weight: 12,
              driverConfirmId: 1,
              driverShippingId: 2,
              index: 1,
              isArrived: true,
            },
            {
              customerId: '2',
              customerCode: 'KH222',
              name: 'Tiểu học Nam Trung Yên',
              phone: '0987654321',
              address: 'Nam Trung Yên',
              cart: [
                {
                  cartId: 12761, cartCode: 'CART-222A', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'CART-222B', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'CART-222C', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 2,
              isArrived: true,
            },
            {
              customerId: '3',
              customerCode: 'KH112',
              name: 'Tiểu học Yên Hoà',
              phone: '0987654321',
              address: 'Yên Hoà',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: false
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.045643,
              longitude: 105.782585,
              weight: 12,
              driverConfirmId: 3,
              driverShippingId: 2,
              index: 3,
              isArrived: false,
            },
            {
              customerId: '4',
              customerCode: 'KH113',
              name: 'Tiểu học Dịch vọng A',
              phone: '0987654321',
              address: 'Dịch vọng',
              cart: [
                {
                  cartId: 12761, cartCode: 'KH113', name: 'Giáo viên', isConfirm: false
                },
                {
                  cartId: 2131, cartCode: 'KH01', name: 'Nhân viên', isConfirm: false
                },
                {
                  cartId: 211, cartCode: 'DH24', name: 'Học sinh', isConfirm: true
                },
                {
                  cartId: 21211, cartCode: 'KH112', name: 'Cán bộ', isConfirm: true
                }
              ],
              latitude: 21.035635,
              longitude: 105.786369, // / 21.035635, 105.786369 home
              weight: 12,
              driverConfirmId: 2,
              driverShippingId: 1,
              index: 4,
              isArrived: false,
            },
          ]
        },
        success: true,
        Meta: {
          Pagination: {
            Total: 12
          }
        }
      };
      return res;
    }

    return undefined;
  };

  saveImageMedia = async (image) => {
    if (this.authzToken) {
      const res = await this.post('/api/upload-media/v1/images/base64', {
        Content: image
      });

      return res;
    }

    return undefined;
  };

  saveProblemItem = async (orderCode, productCode, note) => {
    if (this.authzToken) {
      const res = await this.post(`/v2/scheduling/error-item-order`,{
        params:{
          note: note,
          orderCode: orderCode,
          productCode: productCode
        }
      });
      // const res = true
      // log(res);
      return res;
    }

    return undefined;
  };

  confirmArrived = async (customerCode) => {
    if (this.authzToken) {
      // log(customerCode)
      const res = await this.post(`/v2/scheduling/confirm-shipped`,{
        params:{
          nodeCode: customerCode
        }
      });
      // const res = await this.post(`/api/upload-media/v1/images/base64`,{
      // //   Note: note
      // // });
      // const res = true;

      return res;
    }

    return undefined;
  };

  confirmShipped = async (customerCode, cartCode) => {
    if (this.authzToken) {
      const res = await this.post(`/v2/scheduling/confirm-delivered`,{
        params:{
          nodeCode: customerCode,
          cartCode: cartCode,
        }
      });

      return res;
    }

    return undefined;
  };

  confirmSchedule = async (scheduleId) => {
    if (this.authzToken) {
      // const res = await this.get(`/supplier/v1/admin/orders/${orderId}`);
      // const res = await this.post(`/api/upload-media/v1/images/base64`,{
      // //   Note: note
      // // });
      const res = true;

      return res;
    }

    return undefined;
  }


  get = async function (endpoint, data) {
    return await this._request('GET', endpoint, data);
  };

  post = async function (endpoint, data) {
    return await this._request('POST', endpoint, data);
  };

  put = async function (endpoint, data) {
    return await this._request('PUT', endpoint, data);
  };

  patch = async function (endpoint, data) {
    return await this._request('PATCH', endpoint, data);
  };

  delete = async function (endpoint, data) {
    return await this._request('DELETE', endpoint, data);
  };

  _getUrl = function (endpoint) {
    return endpoint.startsWith('/') ? `${this.baseUrl}${endpoint}` : `${this.baseUrl}/${endpoint}`;
  };

  _join = function (obj, separator) {
    const arr = [];
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      if (val || val === false) {
        arr.push(`${key}=${val}`);
      }
    });

    return arr.join(separator);
  };

  _request = function (method, endpoint, newData) {
    const url = this._getUrl(endpoint);
    // const data = newData.params ? toPascalCase(newData.params) : false;
    const data = newData && newData.params ? newData.params : false;
    const headers = newData && newData.headers ? newData.headers : false;
    const defaultHeaders = {
      Authorization: this.authzToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const params = {
      url,
      method,
      headers: headers ? Object.assign(defaultHeaders, headers) : defaultHeaders,
      // encoding: this.encoding,
      // timeout: this.timeout,
    };

    if (method === 'GET') {
      params.headers['Cache-Control'] = 'no-cache';
      if (data) {
        params.url = `${params.url}?${this._join(data, '&')}`;
      }
    } else if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
      if (data) {
        // log(JSON.stringify(data));
        params.body = JSON.stringify(data);
      }
      //   params.headers = {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   };
      //   params.body = JSON.stringify(data);
    }

    // log(`Fetch ${params.url}`);
    return fetch(params.url, params)
      .then((res) => {
        // log(res)
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } if (res.status === 401) {
          res.error = {
            status: res.status,
            code: res.code,
            detail: res.detail,
          };
          res.data = {};

          return res;
        }

        return false;
      })
      .then((res) => {
        if (!res) {
          return {};
        } if (res.error) {
          return res;
        }

        return {
          ...res,
        };
      })
      .catch(e => Promise.reject(e));
  };
}

const anfastWorker = new AnFastWorker();
export default anfastWorker;
