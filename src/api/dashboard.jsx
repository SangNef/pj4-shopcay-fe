import {get} from './index';

export const getTotalOrders = async () => {
    return get('/dashboard/totalOrders');
}

export const getTotalRevenue = async () => {
    return get('/dashboard/totalRevenue');
}

export const getTotalBuy = async () => {
    return get('/dashboard/totalBuyOrders');
}

export const getTotalRent = async () => {
    return get('/dashboard/totalRentOrders');
}
