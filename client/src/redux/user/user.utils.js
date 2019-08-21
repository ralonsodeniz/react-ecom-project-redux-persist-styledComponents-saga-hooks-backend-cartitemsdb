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

export const addNewOrder = (currentUser, order) => {
  let newOrders = {};
  if (currentUser.orders !== null) {
    newOrders = { ...currentUser.orders };
  }
  const newOrderDate = new Date();
  const newOrderKey = `${newOrderDate.getFullYear()}${newOrderDate.getMonth() +
    1}${newOrderDate.getDate()}${newOrderDate.getHours()}${newOrderDate.getMinutes()}${newOrderDate.getSeconds()}`;
  newOrders[newOrderKey] = {
    date: newOrderDate,
    items: order,
    address: currentUser.addresses[0]
  };
  return newOrders;
};
