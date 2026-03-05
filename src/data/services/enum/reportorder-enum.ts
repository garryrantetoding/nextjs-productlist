export enum BuyerRoleEnum{
    Empty = '',
    CUSTOMER = 'CUSTOMER',
    RESELLER = 'RESELLER',
    DISTRIBUTOR = 'DISTRIBUTOR',
  }
  export enum CategoryEnum{
    Empty = '',
    A3 = 'A3',
    A4 = 'A4',
    MJ = 'MJ',
    ML = 'ML',
  }
  export  enum OrderStatusEnum{
    Empty = '',
    NEW = 'NEW',
    FINISH = 'FINISH',
    PROGRESS = 'PROGRESS',
    CANCEL = 'CANCEL',
  }
  export enum PaymentStatusEnum{
    Empty = '',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    SETTLEMENT = 'SETTLEMENT',
    CANCEL = 'CANCEL',
    REFUND = 'REFUND',
    REJECTED = 'REJECTED',
  }
  export enum TaskStatusEnum{
    Empty = '',
    WAITING = 'WAITING',
    APPROVED = 'APPROVED',
    COMPLETE = 'COMPLETE',
  }