export const addNewAddress = (currentUser, address) => {
  let newAddresses = [];
  if (currentUser.addresses === undefined) {
    newAddresses = [address];
    return newAddresses;
  }
  newAddresses = [...currentUser.addresses, address];
  return newAddresses;
};

export const removeAddress = (currentUser, address) => {
  const newAddresses = currentUser.addresses.filter(
    currentAddress => currentAddress.addressName !== address.addressName
  );
  return newAddresses;
};

export const addNewOrder = (currentUser, { order, price }) => {
  let newOrders = {};
  if (currentUser.orders !== null) {
    newOrders = { ...currentUser.orders };
  }
  const newOrderDate = new Date();
  const newOrderKey = `${newOrderDate.getFullYear()}${newOrderDate.getMonth() +
    1}${newOrderDate.getDate()}${newOrderDate.getHours()}${newOrderDate.getMinutes()}${newOrderDate.getSeconds()}`;
  let orderMonth = "";
  switch (newOrderDate.getMonth()) {
    case 0:
      orderMonth = "January";
      break;
    case 1:
      orderMonth = "February";
      break;
    case 2:
      orderMonth = "March";
      break;
    case 3:
      orderMonth = "April";
      break;
    case 4:
      orderMonth = "May";
      break;
    case 5:
      orderMonth = "June";
      break;
    case 6:
      orderMonth = "July";
      break;
    case 7:
      orderMonth = "August";
      break;
    case 8:
      orderMonth = "September";
      break;
    case 9:
      orderMonth = "October";
      break;
    case 10:
      orderMonth = "November";
      break;
    case 11:
      orderMonth = "December";
      break;
    default:
      break;
  }
  newOrders[newOrderKey] = {
    date: {
      year: newOrderDate.getFullYear(),
      month: orderMonth,
      day: newOrderDate.getDate(),
      hour: newOrderDate.getHours(),
      minutes: newOrderDate.getMinutes()
    },
    items: order,
    total: price,
    address: currentUser.addresses[0]
  };
  return newOrders;
};

export const setDefaultAddress = (currentUser, addressIndex) => {
  let newAddresses = currentUser.addresses;
  const defaultAddress = newAddresses.splice(addressIndex, 1);
  newAddresses.unshift(...defaultAddress);
  return newAddresses;
};
