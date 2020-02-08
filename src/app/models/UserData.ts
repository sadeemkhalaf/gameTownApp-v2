export interface UserData {
    email?: string;
    name?: string;
    uid?: string;
    role?: UserRole;
}

export enum UserRole {
    ADMIN = 'admin',
    REGULAR = 'regular'
}

export enum TimerType {
    UP = 'up',
    DOWN = 'down'
}
export interface ShopItem {
    itemId?: string;
    description?: string;
    price?: number;
    category?: string;
}

export interface OrderItem {
    itemId: string;
    description?: string;
    unitPrice: number;
    qty: number;
}

export enum CardState {
    NEW = 'new',
    EDIT = 'edit',
    VIEW = 'view',
    DELETED = 'deleted'
  }

export interface CurrentActivity {
    activityId?: string;
    deviceNo: string;
    pairsCount: number;
    startTime: number;
    endTime?: number;
    orders?: OrderItem[];
    timerType: string;
    hoursSet?: number;
    minutesSet?: number;
    secondsSet?: number;
    discount?: number;
    priceSum?: number;
}

export class ActivityLog {
    activityId: string;
    deviceNo: string;
    pairsCount: number;
    startTime: number;
    endTime?: number;
    ordersQty?: number;
    hours?: number;
    minutes?: number;
    playingTotalPrice?: number;
    sideOrdersTotalPrice?: number;
    discount?: number;
    pricePerHour?: number;
    logTime: number;

    constructor() {
        this.activityId = '';
        this.deviceNo = '';
        this.pairsCount = 0;
        this.startTime = 0;
        this.endTime = new Date().getTime();
        this.ordersQty = 0;
        this.hours = 0;
        this.minutes = 0;
        this.playingTotalPrice = 0;
        this.sideOrdersTotalPrice = 0;
        this.discount = 0;
        this.pricePerHour = 0;
        this.logTime = Date.now();
    }
}

export interface PriceCategory {
    id?: string;
    pairsCount?: number;
    pricePerHour?: number;
}
